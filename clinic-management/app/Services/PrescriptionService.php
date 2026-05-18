<?php

namespace App\Services;

use App\Models\Prescription;
use Illuminate\Support\Facades\DB;

class PrescriptionService
{
    public function createPrescription(array $data, int $doctorId, int $patientId): Prescription
    {
        return DB::transaction(function () use ($data, $doctorId, $patientId) {

            // 1. Create the main prescription record
            $prescription = Prescription::create([
                'appointment_id' => $data['appointment_id'],
                'doctor_id' => $doctorId,
                'patient_id' => $patientId,
                'general_instructions' => $data['general_instructions'] ?? null,
            ]);

            // 2. Loop through and create the prescription items
            foreach ($data['items'] as $item) {
                $prescription->items()->create([
                    'drug_name' => $item['drug_name'],
                    'dosage' => $item['dosage'],
                    'frequency' => $item['frequency'],
                    'duration' => $item['duration'],
                    'instructions' => $item['instructions'] ?? null,
                ]);
            }

            return $prescription;
        });
    }
}
