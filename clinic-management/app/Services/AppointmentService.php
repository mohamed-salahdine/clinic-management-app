<?php

namespace App\Services;

use App\Models\Appointment;
use Illuminate\Support\Facades\DB;

class AppointmentService
{
    public function createAppointment(array $data): Appointment
    {
        return DB::transaction(function () use ($data) {
            // Here we can easily add more business logic later, 
            // like checking if the doctor is already booked at this time!

            $appointment = Appointment::create([
                'patient_id' => $data['patient_id'],
                'doctor_id' => $data['doctor_id'],
                'appointment_date' => $data['appointment_date'],
                'reason_for_visit' => $data['reason_for_visit'],
                'notes' => $data['notes'] ?? null,
                'status' => 'scheduled',
            ]);

            return $appointment;
        });
    }
}
