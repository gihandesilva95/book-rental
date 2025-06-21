<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBookRequest extends FormRequest
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
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */

    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'published_date' => 'required|date|before_or_equal:today',
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'Book title is required',
            'author.required' => 'Author name is required',
            'published_date.required' => 'Published date is required',
            'published_date.before_or_equal' => 'Published date cannot be in the future',
        ];
    }

}
