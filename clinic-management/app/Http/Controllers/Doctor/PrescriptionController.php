<?php

namespace App\Http\Controllers\Doctor;

use App\Http\Controllers\Controller;
use App\Http\Requests\Doctor\StorePrescriptionRequest;
use App\Models\Patient;
use App\Services\PrescriptionService;

class PrescriptionController extends Controller
{
    public function store(StorePrescriptionRequest $request, Patient $patient, PrescriptionService $service)
    {
        $doctorId = $request->user()->doctor->id;

        $service->createPrescription($request->validated(), $doctorId, $patient->id);

        return redirect()->back(); // Stay on the patient file page
    }
}
