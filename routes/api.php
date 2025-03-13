<?php

use App\Http\Controllers\Api\TodoStatusController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;
use Orion\Facades\Orion;

Route::group(['as' => 'api.'], function () {
    Orion::resource('users', UserController::class);

    Route::get('todos/statuses', [TodoStatusController::class, 'index'])->name('todos.statuses.index');
    Route::post('todos/{todo}/statuses/{status}', [TodoStatusController::class, 'update'])->name('todos.statuses.update');
});
