<?php

namespace App\Http\Controllers\Doctor;

use App\Http\Controllers\Controller;
use App\Models\Patient;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PatientController extends Controller
{
    public function index(Request $request)
    {
        $doctorId = $request->user()->doctor->id;

        // Get patients who have an appointment with this specific doctor
        $patients = Patient::whereHas('appointments', function ($query) use ($doctorId) {
            $query->where('doctor_id', $doctorId);
        })->with('user')->get();

        return Inertia::render('Doctor/Patients/Index', [
            'patients' => $patients
        ]);
    }

    public function show(Request $request, Patient $patient)
    {
        $doctorId = $request->user()->doctor->id;

        // Load medical records, past prescriptions, and ONLY appointments with THIS doctor
        $patient->load([
            'user',
            'medicalRecords.doctor.user',
            'prescriptions.items',
            'prescriptions.doctor.user',
            'appointments' => function ($query) use ($doctorId) {
                $query->where('doctor_id', $doctorId)->orderBy('appointment_date', 'desc');
            }
        ]);

        return Inertia::render('Doctor/Patients/Show', [
            'patient' => $patient
        ]);
    }
}
