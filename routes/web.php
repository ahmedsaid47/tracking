<?php

use App\Http\Controllers\ExcelUploadController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\VehicleController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');



    Route::resource('vehicles', VehicleController::class);
    Route::get('/vehicles/create', [VehicleController::class, 'create'])->name('vehicles.create'); // Yeni araç ekleme formu
    Route::post('/vehicles', [VehicleController::class, 'store'])->name('vehicles.store'); // Aracı kaydetme

    Route::get('/upload', [ExcelUploadController::class, 'create'])->name('upload');
    Route::post('/upload', [ExcelUploadController::class, 'store'])->name('upload.store');





});




require __DIR__.'/auth.php';
