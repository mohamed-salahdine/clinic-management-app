<?php

namespace App\Http\Controllers\Patient;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RecordController extends Controller
{
    public function index(Request $request)
    {
        $patient = $request->user()->patient;

        // Load all medical history and prescriptions
        $patient->load([
            'medicalRecords.doctor.user',
            'prescriptions.doctor.user',
            'prescriptions.items'
        ]);

        return Inertia::render('Patient/Records', [
            'medicalRecords' => $patient->medicalRecords,
            'prescriptions' => $patient->prescriptions,
        ]);
    }
}
