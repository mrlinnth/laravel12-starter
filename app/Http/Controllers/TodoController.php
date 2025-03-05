<?php

namespace App\Http\Controllers;

use App\Exports\TodosExport;
use App\Http\Requests\TodoStoreRequest;
use App\Http\Requests\TodoUpdateRequest;
use App\Models\Todo;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Maatwebsite\Excel\Facades\Excel;

class TodoController extends Controller
{
    public function index(Request $request): Response
    {
        $todos = Todo::all();

        return Inertia::render('todo/index', [
            'todos' => $todos,
        ]);
    }

    public function create(Request $request): Response
    {
        return Inertia::render('todo/create');
    }

    public function store(TodoStoreRequest $request): RedirectResponse
    {
        $data = array_merge(
            $request->safe()->toArray(),
            [
                'creator_id' => Auth::user()->id,
            ]
        );

        $todo = Todo::create($data);

        $request->session()->flash('todo.id', $todo->id);

        return redirect()->route('todos.index');
    }

    public function show(Request $request, Todo $todo): Response
    {
        return Inertia::render('todo/show', [
            'todo' => $todo,
        ]);
    }

    public function edit(Request $request, Todo $todo): Response
    {
        return Inertia::render('todo/edit', [
            'todo' => $todo,
        ]);
    }

    public function update(TodoUpdateRequest $request, Todo $todo): RedirectResponse
    {
        $todo->update($request->validated());

        $request->session()->flash('todo.id', $todo->id);

        return redirect()->route('todos.index');
    }

    public function destroy(Request $request, Todo $todo): RedirectResponse
    {
        $todo->delete();

        return redirect()->route('todos.index');
    }

    public function export()
    {
        return Excel::download(new TodosExport, 'todos.xlsx');
    }
}
