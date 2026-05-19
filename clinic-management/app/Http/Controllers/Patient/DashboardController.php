<?php

namespace App\Http\Controllers\Patient;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $patient = $request->user()->patient;

        // Fetch upcoming appointments
        $upcomingAppointments = $patient->appointments()
            ->with('doctor.user')
            ->where('appointment_date', '>=', now())
            ->orderBy('appointment_date', 'asc')
            ->get();

        // Fetch unpaid invoices
        $unpaidInvoices = $patient->invoices()
            ->where('status', 'unpaid')
            ->get();

        return Inertia::render('Patient/Dashboard', [
            'upcomingAppointments' => $upcomingAppointments,
            'unpaidInvoices' => $unpaidInvoices,
        ]);
    }
}
