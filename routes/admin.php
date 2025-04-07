<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::middleware(['auth', 'verified', 'is_admin'])->prefix('admin')->group(function () {
    Route::get('panel', function () {
        return Inertia::render('dashboard');
    })->name('admin.panel');
});