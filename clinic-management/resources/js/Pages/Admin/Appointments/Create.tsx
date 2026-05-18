import React from "react";
import AdminLayout from "@/Layouts/Admin/AdminLayout";
import { Head, Link, useForm } from "@inertiajs/react";

interface User {
    first_name: string;
    last_name: string;
}

interface Doctor {
    id: number;
    user: User;
    specialization: string;
}

interface Patient {
    id: number;
    user: User;
}

interface Props {
    doctors: Doctor[];
    patients: Patient[];
}

export default function Create({ doctors, patients }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        patient_id: "",
        doctor_id: "",
        appointment_date: "",
        reason_for_visit: "",
        notes: "",
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("admin.appointments.store"));
    };

    return (
        <AdminLayout title="Book Appointment">
            <Head title="New Appointment" />

            <div className="max-w-2xl bg-white rounded-lg shadow border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-lg font-medium text-gray-900">
                        Schedule New Appointment
                    </h2>
                </div>

                <form onSubmit={submit} className="p-6 space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Patient
                        </label>
                        <select
                            value={data.patient_id}
                            onChange={(e) =>
                                setData("patient_id", e.target.value)
                            }
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                        >
                            <option value="">Select a patient</option>
                            {patients.map((patient) => (
                                <option key={patient.id} value={patient.id}>
                                    {patient.user.first_name}{" "}
                                    {patient.user.last_name}
                                </option>
                            ))}
                        </select>
                        {errors.patient_id && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.patient_id}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Doctor
                        </label>
                        <select
                            value={data.doctor_id}
                            onChange={(e) =>
                                setData("doctor_id", e.target.value)
                            }
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                        >
                            <option value="">Select a doctor</option>
                            {doctors.map((doctor) => (
                                <option key={doctor.id} value={doctor.id}>
                                    Dr. {doctor.user.first_name}{" "}
                                    {doctor.user.last_name} (
                                    {doctor.specialization})
                                </option>
                            ))}
                        </select>
                        {errors.doctor_id && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.doctor_id}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Date & Time
                        </label>
                        <input
                            type="datetime-local"
                            value={data.appointment_date}
                            onChange={(e) =>
                                setData("appointment_date", e.target.value)
                            }
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                        />
                        {errors.appointment_date && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.appointment_date}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Reason for Visit
                        </label>
                        <textarea
                            value={data.reason_for_visit}
                            onChange={(e) =>
                                setData("reason_for_visit", e.target.value)
                            }
                            rows={3}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                            placeholder="Briefly describe the symptoms or reason..."
                        ></textarea>
                        {errors.reason_for_visit && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.reason_for_visit}
                            </p>
                        )}
                    </div>

                    <div className="flex justify-end gap-4 border-t pt-4">
                        <Link
                            href={route("admin.appointments.index")}
                            className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition disabled:opacity-50"
                        >
                            {processing ? "Saving..." : "Save Appointment"}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
