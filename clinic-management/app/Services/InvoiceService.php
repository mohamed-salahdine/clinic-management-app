<?php

namespace App\Services;

use App\Models\Invoice;
use App\Models\Patient;
use App\Notifications\NewInvoiceNotification;
use Illuminate\Support\Facades\DB;

class InvoiceService
{
    public function createInvoice(array $data): Invoice
    {
        return DB::transaction(function () use ($data) {
            $invoice = Invoice::create([
                'patient_id' => $data['patient_id'],
                'appointment_id' => $data['appointment_id'],
                'total_amount' => $data['total_amount'],
                'due_date' => $data['due_date'],
                'status' => 'unpaid',
            ]);

            // Fetch the patient and their associated user account, then send the notification
            $patient = Patient::with('user')->find($data['patient_id']);
            if ($patient && $patient->user) {
                $patient->user->notify(new NewInvoiceNotification($invoice));
            }

            return $invoice;
        });
    }
}
