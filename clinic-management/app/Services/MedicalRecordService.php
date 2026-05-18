<?php

namespace App\Services;

use App\Models\MedicalRecord;
use Illuminate\Support\Facades\DB;

class MedicalRecordService
{
    public function createRecord(array $data, int $doctorId, int $patientId): MedicalRecord
    {
        return DB::transaction(function () use ($data, $doctorId, $patientId) {
            return MedicalRecord::create([
                'patient_id' => $patientId,
                'doctor_id' => $doctorId,
                'symptoms' => $data['symptoms'],
                'diagnosis' => $data['diagnosis'],
                'treatment' => $data['treatment'],
            ]);
        });
    }
}
