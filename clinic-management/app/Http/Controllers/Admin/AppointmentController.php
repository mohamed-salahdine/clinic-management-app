<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\Doctor;
use App\Models\Patient;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AppointmentController extends Controller
{
    public function index()
    {
        // Fetch appointments with the related user data for doctors and patients
        $appointments = Appointment::with(['doctor.user', 'patient.user'])
            ->orderBy('appointment_date', 'asc')
            ->get();

        return Inertia::render('Admin/Appointments/Index', [
            'appointments' => $appointments
        ]);
    }
}
