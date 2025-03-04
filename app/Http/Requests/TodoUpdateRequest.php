<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TodoUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:400'],
            'content' => ['required', 'string'],
            'creator_id' => ['required', 'integer', 'exists:users,id'],
            'status' => ['required', 'in:pending,wip,completed'],
            'completed_at' => ['nullable'],
        ];
    }
}
