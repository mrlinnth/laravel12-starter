<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserFormRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function index(Request $request): Response
    {
        $users = User::all();

        return Inertia::render('user/index', [
            'users' => $users,
        ]);
    }

    public function create(Request $request): Response
    {
        $roles = Role::whereNot('name', config('project.super_admin'))->pluck('name');

        if ($request->user()->is_super_admin) {
            $roles = Role::get()->pluck('name');
        }

        return Inertia::render('user/create', ['roles' => $roles]);
    }

    public function store(UserFormRequest $request): RedirectResponse
    {
        $user = User::create($request->safe()->except(['role']));

        $user->assignRole($request->input('role'));

        $request->session()->flash('user.id', $user->id);

        return redirect()->route('users.index');
    }

    public function show(Request $request, User $user): Response
    {
        return Inertia::render('user/show', [
            'user' => $user,
        ]);
    }

    public function edit(Request $request, User $user): Response
    {
        $roles = Role::whereNot('name', config('project.super_admin'))->pluck('name');

        if ($request->user()->is_super_admin) {
            $roles = Role::get()->pluck('name');
        }

        return Inertia::render('user/edit', [
            'user' => $user,
            'roles' => $roles,
        ]);
    }

    public function update(UserFormRequest $request, User $user): RedirectResponse
    {
        $user->update($request->validated());

        $request->session()->flash('user.id', $user->id);

        return redirect()->route('users.index');
    }

    public function destroy(Request $request, User $user): RedirectResponse
    {
        $user->delete();

        return redirect()->route('users.index');
    }
}
