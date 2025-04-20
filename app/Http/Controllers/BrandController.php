<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Brand;
use Illuminate\Support\Facades\Gate;
use App\Http\Requests\StoreBrandRequest;
use App\Http\Requests\UpdateBrandRequest;
use App\Services\FileService;

class BrandController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        Gate::authorize('viewAny', Brand::class);

        return Inertia::render('panel/brand/index', [
            'brands' => Brand::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        Gate::authorize('create', Brand::class);

        return Inertia::render('panel/brand/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBrandRequest $request)
    {        
        Brand::create([
            ...$request->validated(), 
            'image' => FileService::make($request->file('image'), 'brand', 'public')
        ]);

        return to_route('panel.brand.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Brand $brand)
    {
        Gate::authorize('view', $brand);

        return Inertia::render('panel/brand/show', [
            'brand' => $brand,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Brand $brand)
    {
        Gate::authorize('update', $brand);
        
        return Inertia::render('panel/brand/edit', [
            'brand' => $brand,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBrandRequest $request, Brand $brand)
    {
        $brand->update([
            ...$request->validated(),
            'image' => FileService::replace($request->file('image'), 'brand', 'public', $brand->image)
        ]);

        return to_route('panel.brand.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Brand $brand)
    {
        Gate::authorize('delete', $brand);

        $brand->delete();
        FileService::delete($brand->image, 'public');

        return to_route('panel.brand.index');
    }
}
