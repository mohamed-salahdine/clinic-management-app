<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Doctor;
use App\Models\Patient;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class DemoDataSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Create a Doctor
        $doctorUser = User::firstOrCreate(
            ['email' => 'doctor@clinic.com'],
            [
                'first_name' => 'John',
                'last_name' => 'Doe',
                'password' => Hash::make('password'),
                'is_active' => true,
            ]
        );
        $doctorUser->assignRole('doctor');

        Doctor::firstOrCreate(
            ['user_id' => $doctorUser->id],
            [
                'specialization' => 'Cardiology',
                'license_number' => 'MED123456',
                'phone' => '+1234567890',
                'consultation_fee' => 150.00,
                'bio' => 'Experienced Cardiologist.',
            ]
        );

        // 2. Create a Patient
        $patientUser = User::firstOrCreate(
            ['email' => 'patient@clinic.com'],
            [
                'first_name' => 'Jane',
                'last_name' => 'Smith',
                'password' => Hash::make('password'),
                'is_active' => true,
            ]
        );
        $patientUser->assignRole('patient');

        Patient::firstOrCreate(
            ['user_id' => $patientUser->id],
            [
                'date_of_birth' => Carbon::parse('1990-05-15'),
                'gender' => 'female',
                'blood_group' => 'O+',
                'phone' => '+0987654321',
                'address' => '123 Main St, Cityville',
            ]
        );
    }
}
