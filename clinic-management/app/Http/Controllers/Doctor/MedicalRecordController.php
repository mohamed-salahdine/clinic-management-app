<?php

namespace App\Http\Controllers\Doctor;

use App\Http\Controllers\Controller;
use App\Http\Requests\Doctor\StoreMedicalRecordRequest;
use App\Models\Patient;
use App\Services\MedicalRecordService;
use Illuminate\Http\Request;

class MedicalRecordController extends Controller
{
    public function store(StoreMedicalRecordRequest $request, Patient $patient, MedicalRecordService $service)
    {
        $doctorId = $request->user()->doctor->id;

        $service->createRecord($request->validated(), $doctorId, $patient->id);

        return redirect()->route('doctor.patients.show', $patient->id);
    }
}
