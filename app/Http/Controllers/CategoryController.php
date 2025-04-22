<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Services\FileService;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Illuminate\Support\Str;
class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        Gate::authorize('viewAny', Category::class);

        return Inertia::render('panel/category/index', [
            'categories' => Category::with('parent')->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        Gate::authorize('create', Category::class);

        return Inertia::render('panel/category/create', [
            'categories' => Category::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoryRequest $request)
    {
        Category::create([
            ...$request->validated(),
            'image' => FileService::make($request->file('image'), 'categories', 'public'),
        ]);

        return redirect()->route('panel.category.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        Gate::authorize('view', $category);

        return Inertia::render('panel/category/show', [
            'category' => $category,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        Gate::authorize('update', $category);

        return Inertia::render('panel/category/edit', [
            'category' => $category,
            'categories' => Category::all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryRequest $request, Category $category)
    {
        $category->update([
            ...$request->validated(),
            'image' => FileService::replace($request->file('image'), 'categories', 'public', $category->image),
        ]);

        return redirect()->route('panel.category.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        Gate::authorize('delete', $category);

        $category->delete();

        FileService::delete($category->image, 'public');

        return redirect()->route('panel.category.index');
    }
}
