<?php

namespace App\Http\Controllers;

use App\Http\Requests\RoleFormRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    public function index(Request $request): Response
    {
        $roles = Role::all();

        return Inertia::render('role/index', [
            'roles' => $roles,
        ]);
    }

    public function create(Request $request): Response
    {
        return Inertia::render('role/create');
    }

    public function store(RoleFormRequest $request): RedirectResponse
    {
        $role = Role::create($request->validated());

        $request->session()->flash('role.id', $role->id);

        return redirect()->route('roles.index');
    }

    public function show(Request $request, Role $role): Response
    {
        return Inertia::render('role/show', [
            'role' => $role,
        ]);
    }

    public function edit(Request $request, Role $role): Response
    {
        return Inertia::render('role/edit', [
            'role' => $role,
        ]);
    }

    public function update(RoleFormRequest $request, Role $role): RedirectResponse
    {
        $role->update($request->validated());

        $request->session()->flash('role.id', $role->id);

        return redirect()->route('roles.index');
    }

    public function destroy(Request $request, Role $role): RedirectResponse
    {
        $role->delete();

        return redirect()->route('roles.index');
    }
}
