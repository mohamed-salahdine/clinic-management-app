<?php

namespace App\Services;

use App\Models\Invoice;
use Illuminate\Support\Facades\DB;

class InvoiceService
{
    public function createInvoice(array $data): Invoice
    {
        return DB::transaction(function () use ($data) {
            return Invoice::create([
                'patient_id' => $data['patient_id'],
                'appointment_id' => $data['appointment_id'],
                'total_amount' => $data['total_amount'],
                'due_date' => $data['due_date'],
                'status' => 'unpaid',
            ]);
        });
    }
}
