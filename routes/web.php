<?php

use App\Http\Controllers\PlaygroundController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::group(['middleware' => ['role:god']], function () {
        Route::get('secret', function () {
            return Inertia::render('secret');
        })->name('secret');
    });

    Route::get('playground', PlaygroundController::class)->name('playground');

    Route::resource('users', App\Http\Controllers\UserController::class);

    Route::resource('roles', App\Http\Controllers\RoleController::class);

    Route::get('todos/export', [App\Http\Controllers\TodoController::class, 'export'])->name('todos.export');
    Route::resource('todos', App\Http\Controllers\TodoController::class);

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
