<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreInvoiceRequest;
use App\Models\Appointment;
use App\Models\Invoice;
use App\Models\Patient;
use App\Services\InvoiceService;
use Inertia\Inertia;

class InvoiceController extends Controller
{
    public function index()
    {
        $invoices = Invoice::with(['patient.user', 'appointment.doctor.user'])
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Admin/Invoices/Index', [
            'invoices' => $invoices
        ]);
    }

    public function create()
    {
        // Fetch patients, and appointments that do NOT have an invoice yet
        $patients = Patient::with('user')->get();
        $appointments = Appointment::doesntHave('invoice')
            ->with(['doctor.user', 'patient.user'])
            ->orderBy('appointment_date', 'desc')
            ->get();

        return Inertia::render('Admin/Invoices/Create', [
            'patients' => $patients,
            'appointments' => $appointments,
        ]);
    }

    public function store(StoreInvoiceRequest $request, InvoiceService $service)
    {
        $service->createInvoice($request->validated());

        return redirect()->route('admin.invoices.index');
    }
}
