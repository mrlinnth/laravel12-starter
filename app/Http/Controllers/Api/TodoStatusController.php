<?php

namespace App\Http\Controllers\Api;

use App\Enums\TodoStatusEnum;
use App\Http\Controllers\Controller;
use App\Models\Todo;
use Illuminate\Http\Request;

class TodoStatusController extends Controller
{
    public function index(Request $request)
    {
        return response()->json(
            [
                'data' => array_column(TodoStatusEnum::cases(), 'value'),
            ]
        );
    }

    public function update(Todo $todo, string $status, Request $request)
    {
        $todo->status = $status;
        $todo->save();

        return response()->json([]);
    }
}
