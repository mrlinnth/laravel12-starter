<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;

class PlaygroundController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request): Response
    {
        $roles = Role::whereNot('name', config('project.super_admin'))->pluck('name');

        if ($request->user()->hasRole(config('project.super_admin'))) {
            $roles = Role::get()->pluck('name');
        }

        return Inertia::render('playground', [
            'users' => User::get(),
            'roles' => $roles,
        ]);
    }
}
