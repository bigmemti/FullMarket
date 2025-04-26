<?php

use App\Http\Controllers\BrandController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', function () { return Inertia::render('welcome'); })->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::prefix('dashboard')->group(function () {
        Route::get('/', function () { return Inertia::render('dashboard'); })->name('dashboard');
        
        Route::name('dashboard.')->group(function () {});
    });
    
    Route::middleware(['can:isAdmin'])->prefix('panel')->group(function () {
        Route::get('/', function () { return Inertia::render('dashboard'); })->name('panel');

        Route::name('panel.')->group(function(){
            Route::resources([
                'brand' => BrandController::class,
                'category' => CategoryController::class,
                'product' => ProductController::class,
                'order' => OrderController::class,
            ]);
        });
    });
});


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';