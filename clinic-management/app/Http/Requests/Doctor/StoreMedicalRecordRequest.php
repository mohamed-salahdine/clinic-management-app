<?php

namespace App\Http\Requests\Doctor;

use Illuminate\Foundation\Http\FormRequest;

class StoreMedicalRecordRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'symptoms' => ['required', 'string'],
            'diagnosis' => ['required', 'string'],
            'treatment' => ['required', 'string'],
        ];
    }
}
