<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;
use App\Models\Brand;
use App\Models\Category;
use App\Services\FileService;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        Gate::authorize('viewAny', Product::class);

        return Inertia::render('panel/product/index', [
            'products' => Product::with(['brand', 'category'])->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        Gate::authorize('create', Product::class);

        return Inertia::render('panel/product/create', [
            'brands' => Brand::all(),
            'categories' => Category::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        Product::create([
            ...$request->validated(),
            'image' => FileService::make($request->file('image'), 'products', 'public'),
        ]);

        return to_route('panel.product.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        Gate::authorize('view', $product);

        return Inertia::render('panel/product/show', [
            'product' => $product->load(['brand', 'category']),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        Gate::authorize('update', $product);

        return Inertia::render('panel/product/edit', [
            'product' => $product->load(['brand', 'category']),
            'brands' => Brand::all(),
            'categories' => Category::all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        $product->update([
            ...$request->validated(),
            'image' => FileService::replace($request->file('image'), 'products', 'public', $product->image),
        ]);

        return to_route('panel.product.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        Gate::authorize('delete', $product);

        $product->delete();

        FileService::delete($product->image, 'public');

        return to_route('panel.product.index');
    }
}
