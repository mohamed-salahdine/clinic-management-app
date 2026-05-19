<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Doctor;
use App\Models\Patient;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class AppointmentBookingTest extends TestCase
{
    use RefreshDatabase; // This resets the database after the test!

    public function test_admin_can_book_an_appointment()
    {
        // 1. Setup Data (Arrange)
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();
        $adminRole = Role::create(['name' => 'admin']);

        /** @var \App\Models\User $admin */
        $admin = User::factory()->create();
        $admin->assignRole($adminRole);

        $doctorUser = User::factory()->create();
        $doctor = Doctor::create(['user_id' => $doctorUser->id, 'specialization' => 'Cardiology', 'license_number' => '123', 'phone' => '123', 'consultation_fee' => 100]);

        $patientUser = User::factory()->create();
        $patient = Patient::create(['user_id' => $patientUser->id, 'date_of_birth' => '1990-01-01', 'gender' => 'male', 'phone' => '123']);

        // 2. Perform Action (Act)
        $response = $this->actingAs($admin)->post('/admin/appointments', [
            'patient_id' => $patient->id,
            'doctor_id' => $doctor->id,
            'appointment_date' => now()->addDays(2)->format('Y-m-d\TH:i'), // Future date
            'reason_for_visit' => 'Routine checkup',
            'notes' => 'Patient has history of high blood pressure',
        ]);

        // 3. Verify Results (Assert)
        $response->assertRedirect(route('admin.appointments.index'));

        $this->assertDatabaseHas('appointments', [
            'patient_id' => $patient->id,
            'doctor_id' => $doctor->id,
            'reason_for_visit' => 'Routine checkup',
            'status' => 'scheduled'
        ]);
    }
}
