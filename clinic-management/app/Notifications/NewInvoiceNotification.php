<?php

namespace App\Notifications;

use App\Models\Invoice;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class NewInvoiceNotification extends Notification
{
    use Queueable;

    public $invoice;

    public function __construct(Invoice $invoice)
    {
        $this->invoice = $invoice;
    }

    public function via(object $notifiable): array
    {
        // For now, we are just using the database. Later you can add 'mail' here!
        return ['database'];
    }

    public function toArray(object $notifiable): array
    {
        return [
            'invoice_id' => $this->invoice->id,
            'amount' => $this->invoice->total_amount,
            'message' => 'A new invoice for $' . $this->invoice->total_amount . ' has been generated on your account.',
            'url' => route('patient.dashboard'), // Where they should click to see it
        ];
    }
}
