<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Doctor;
use App\Models\Patient;
use App\Models\Appointment;
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Dashboard', [
            // By wrapping queries in a closure fn(), Laravel will ONLY execute 
            // them when strictly necessary, saving memory and CPU!
            'stats' => fn() => [
                'total_doctors' => Doctor::count(),
                'total_patients' => Patient::count(),
                'today_appointments' => Appointment::whereDate('appointment_date', Carbon::today())->count(),
            ]
        ]);
    }
}
