<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Doctor\DashboardController as DoctorDashboardController;
use App\Http\Controllers\Patient\DashboardController as PatientDashboardController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // ADMIN PORTAL
    Route::middleware(['role:admin'])->prefix('admin')->name('admin.')->group(function () {
        Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');

        Route::get('/appointments', [\App\Http\Controllers\Admin\AppointmentController::class, 'index'])->name('appointments.index');
        Route::get('/appointments/create', [\App\Http\Controllers\Admin\AppointmentController::class, 'create'])->name('appointments.create');
        Route::post('/appointments', [\App\Http\Controllers\Admin\AppointmentController::class, 'store'])->name('appointments.store');
        Route::get('/invoices', [\App\Http\Controllers\Admin\InvoiceController::class, 'index'])->name('invoices.index');
        Route::get('/invoices/create', [\App\Http\Controllers\Admin\InvoiceController::class, 'create'])->name('invoices.create');
        Route::post('/invoices', [\App\Http\Controllers\Admin\InvoiceController::class, 'store'])->name('invoices.store');
    });

    // DOCTOR PORTAL
    Route::middleware(['role:doctor'])->prefix('doctor')->name('doctor.')->group(function () {
        Route::get('/dashboard', [\App\Http\Controllers\Doctor\DashboardController::class, 'index'])->name('dashboard');

        // Patient Management
        Route::get('/patients', [\App\Http\Controllers\Doctor\PatientController::class, 'index'])->name('patients.index');
        Route::get('/patients/{patient}', [\App\Http\Controllers\Doctor\PatientController::class, 'show'])->name('patients.show');

        // Medical Records
        Route::post('/patients/{patient}/medical-records', [\App\Http\Controllers\Doctor\MedicalRecordController::class, 'store'])->name('medical-records.store');
        Route::post('/patients/{patient}/prescriptions', [\App\Http\Controllers\Doctor\PrescriptionController::class, 'store'])->name('prescriptions.store');
    });


    // PATIENT PORTAL
    Route::middleware(['role:patient'])->prefix('patient')->name('patient.')->group(function () {
        Route::get('/dashboard', [PatientDashboardController::class, 'index'])->name('dashboard');
    });
});

require __DIR__ . '/auth.php';
