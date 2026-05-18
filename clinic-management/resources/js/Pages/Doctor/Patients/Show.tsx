import React from "react";
import DoctorLayout from "@/Layouts/Doctor/DoctorLayout";
import { useForm } from "@inertiajs/react";

export default function Show({ patient }: { patient: any }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        symptoms: "",
        diagnosis: "",
        treatment: "",
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("doctor.medical-records.store", patient.id), {
            onSuccess: () => reset(),
        });
    };

    return (
        <DoctorLayout
            title={`Patient File: ${patient.user.first_name} ${patient.user.last_name}`}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Past Medical Records */}
                <div className="bg-white rounded-lg shadow p-6 h-fit">
                    <h2 className="text-lg font-semibold border-b pb-2 mb-4">
                        Medical History
                    </h2>
                    {patient.medical_records.length === 0 ? (
                        <p className="text-gray-500">
                            No medical records found.
                        </p>
                    ) : (
                        <div className="space-y-4">
                            {patient.medical_records.map((record: any) => (
                                <div
                                    key={record.id}
                                    className="border border-gray-200 rounded p-4 bg-gray-50"
                                >
                                    <p className="text-xs text-gray-500 mb-2">
                                        {new Date(
                                            record.created_at,
                                        ).toLocaleDateString()}{" "}
                                        - By Dr. {record.doctor.user.last_name}
                                    </p>
                                    <p>
                                        <strong>Symptoms:</strong>{" "}
                                        {record.symptoms}
                                    </p>
                                    <p>
                                        <strong>Diagnosis:</strong>{" "}
                                        {record.diagnosis}
                                    </p>
                                    <p>
                                        <strong>Treatment:</strong>{" "}
                                        {record.treatment}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Add New Record Form */}
                <div className="bg-white rounded-lg shadow p-6 h-fit">
                    <h2 className="text-lg font-semibold border-b pb-2 mb-4">
                        Add New Record
                    </h2>
                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium">
                                Symptoms
                            </label>
                            <textarea
                                value={data.symptoms}
                                onChange={(e) =>
                                    setData("symptoms", e.target.value)
                                }
                                rows={2}
                                className="w-full border rounded p-2 mt-1"
                            />
                            {errors.symptoms && (
                                <p className="text-red-500 text-xs">
                                    {errors.symptoms}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium">
                                Diagnosis
                            </label>
                            <textarea
                                value={data.diagnosis}
                                onChange={(e) =>
                                    setData("diagnosis", e.target.value)
                                }
                                rows={2}
                                className="w-full border rounded p-2 mt-1"
                            />
                            {errors.diagnosis && (
                                <p className="text-red-500 text-xs">
                                    {errors.diagnosis}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium">
                                Treatment Plan
                            </label>
                            <textarea
                                value={data.treatment}
                                onChange={(e) =>
                                    setData("treatment", e.target.value)
                                }
                                rows={2}
                                className="w-full border rounded p-2 mt-1"
                            />
                            {errors.treatment && (
                                <p className="text-red-500 text-xs">
                                    {errors.treatment}
                                </p>
                            )}
                        </div>
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded p-2 font-medium"
                        >
                            {processing ? "Saving..." : "Save Record"}
                        </button>
                    </form>
                </div>
            </div>
        </DoctorLayout>
    );
}
