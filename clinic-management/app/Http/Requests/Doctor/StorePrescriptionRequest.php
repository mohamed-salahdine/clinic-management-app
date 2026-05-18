<?php

namespace App\Http\Requests\Doctor;

use Illuminate\Foundation\Http\FormRequest;

class StorePrescriptionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'appointment_id' => ['required', 'exists:appointments,id'],
            'general_instructions' => ['nullable', 'string'],
            'items' => ['required', 'array', 'min:1'],
            'items.*.drug_name' => ['required', 'string'],
            'items.*.dosage' => ['required', 'string'],
            'items.*.frequency' => ['required', 'string'],
            'items.*.duration' => ['required', 'string'],
        ];
    }
}
