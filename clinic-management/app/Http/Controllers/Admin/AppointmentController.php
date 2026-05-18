<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreAppointmentRequest;
use App\Models\Appointment;
use App\Models\Doctor;
use App\Models\Patient;
use App\Services\AppointmentService;
use Inertia\Inertia;

class AppointmentController extends Controller
{
    public function index()
    {
        $appointments = Appointment::with(['doctor.user', 'patient.user'])
            ->orderBy('appointment_date', 'asc')
            ->get();

        return Inertia::render('Admin/Appointments/Index', [
            'appointments' => $appointments
        ]);
    }

    public function create()
    {
        // Fetch doctors and patients for the dropdowns
        $doctors = Doctor::with('user')->get();
        $patients = Patient::with('user')->get();

        return Inertia::render('Admin/Appointments/Create', [
            'doctors' => $doctors,
            'patients' => $patients,
        ]);
    }

    public function store(StoreAppointmentRequest $request, AppointmentService $service)
    {
        $service->createAppointment($request->validated());

        // Redirect back to index with a success message (we'll implement toast notifications later)
        return redirect()->route('admin.appointments.index');
    }
}
