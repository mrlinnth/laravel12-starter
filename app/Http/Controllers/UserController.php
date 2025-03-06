<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserFormRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

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
        return Inertia::render('user/create');
    }

    public function store(UserFormRequest $request): RedirectResponse
    {
        $user = User::create($request->validated());

        $request->session()->flash('user.id', $user->id);

        return redirect()->route('users.index');
    }

    public function show(Request $request, User $user): Response
    {
        return Inertia::render('user/show', [
            'user' => $user->load('roles'),
            'roles' => implode(',', $user->getRoleNames()->toArray()),
        ]);
    }

    public function edit(Request $request, User $user): Response
    {
        return Inertia::render('user/edit', [
            'user' => $user,
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
