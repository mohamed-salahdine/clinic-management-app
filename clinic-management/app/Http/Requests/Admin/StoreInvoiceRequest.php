<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class StoreInvoiceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'patient_id' => ['required', 'exists:patients,id'],
            'appointment_id' => ['nullable', 'exists:appointments,id', 'unique:invoices,appointment_id'], // Ensure 1 invoice per appointment
            'total_amount' => ['required', 'numeric', 'min:0'],
            'due_date' => ['required', 'date', 'after_or_equal:today'],
        ];
    }

    public function messages()
    {
        return [
            'appointment_id.unique' => 'An invoice already exists for this appointment.',
        ];
    }
}
