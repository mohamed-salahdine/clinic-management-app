import React from "react";
import DoctorLayout from "@/Layouts/Doctor/DoctorLayout";
import { useForm } from "@inertiajs/react";

export default function Show({ patient }: { patient: any }) {
    // Medical Record Form
    const medicalForm = useForm({
        symptoms: "",
        diagnosis: "",
        treatment: "",
    });

    // Prescription Form with dynamic items
    const rxForm = useForm({
        appointment_id: patient.appointments[0]?.id || "", // Default to latest appointment
        general_instructions: "",
        items: [{ drug_name: "", dosage: "", frequency: "", duration: "" }],
    });

    const submitMedical = (e: React.FormEvent) => {
        e.preventDefault();
        medicalForm.post(route("doctor.medical-records.store", patient.id), {
            onSuccess: () => medicalForm.reset(),
        });
    };

    const submitPrescription = (e: React.FormEvent) => {
        e.preventDefault();
        rxForm.post(route("doctor.prescriptions.store", patient.id), {
            onSuccess: () => rxForm.reset("general_instructions", "items"),
        });
    };

    const addDrug = () => {
        rxForm.setData("items", [
            ...rxForm.data.items,
            { drug_name: "", dosage: "", frequency: "", duration: "" },
        ]);
    };

    const updateDrug = (index: number, field: string, value: string) => {
        const newItems = [...rxForm.data.items];
        newItems[index] = { ...newItems[index], [field]: value };
        rxForm.setData("items", newItems);
    };

    const removeDrug = (index: number) => {
        const newItems = rxForm.data.items.filter((_, i) => i !== index);
        rxForm.setData("items", newItems);
    };

    return (
        <DoctorLayout
            title={`Patient File: ${patient.user.first_name} ${patient.user.last_name}`}
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* LEFT COLUMN: History */}
                <div className="space-y-6">
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-lg font-semibold border-b pb-2 mb-4">
                            Medical History
                        </h2>
                        {patient.medical_records.length === 0 ? (
                            <p className="text-gray-500 text-sm">
                                No medical records found.
                            </p>
                        ) : (
                            <div className="space-y-4">
                                {patient.medical_records.map((record: any) => (
                                    <div
                                        key={record.id}
                                        className="border rounded p-4 bg-gray-50 text-sm"
                                    >
                                        <p className="text-xs text-gray-500 mb-2">
                                            {new Date(
                                                record.created_at,
                                            ).toLocaleDateString()}
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

                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-lg font-semibold border-b pb-2 mb-4">
                            Past Prescriptions
                        </h2>
                        {patient.prescriptions.length === 0 ? (
                            <p className="text-gray-500 text-sm">
                                No prescriptions found.
                            </p>
                        ) : (
                            <div className="space-y-4">
                                {patient.prescriptions.map((rx: any) => (
                                    <div
                                        key={rx.id}
                                        className="border rounded p-4 bg-gray-50 text-sm"
                                    >
                                        <p className="text-xs text-gray-500 mb-2">
                                            {new Date(
                                                rx.created_at,
                                            ).toLocaleDateString()}
                                        </p>
                                        <ul className="list-disc pl-5">
                                            {rx.items.map((item: any) => (
                                                <li key={item.id}>
                                                    {item.drug_name} -{" "}
                                                    {item.dosage} (
                                                    {item.frequency} for{" "}
                                                    {item.duration})
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* RIGHT COLUMN: Forms */}
                <div className="space-y-6">
                    {/* Write Prescription Form */}
                    <div className="bg-white rounded-lg shadow p-6 border-t-4 border-blue-500">
                        <h2 className="text-lg font-semibold border-b pb-2 mb-4">
                            Write Prescription
                        </h2>
                        <form
                            onSubmit={submitPrescription}
                            className="space-y-4"
                        >
                            <div>
                                <label className="block text-sm font-medium">
                                    Select Appointment
                                </label>
                                <select
                                    value={rxForm.data.appointment_id}
                                    onChange={(e) =>
                                        rxForm.setData(
                                            "appointment_id",
                                            e.target.value,
                                        )
                                    }
                                    className="w-full border rounded p-2 mt-1 text-sm"
                                >
                                    <option value="">
                                        -- Choose Appointment --
                                    </option>
                                    {patient.appointments.map((appt: any) => (
                                        <option key={appt.id} value={appt.id}>
                                            {new Date(
                                                appt.appointment_date,
                                            ).toLocaleString()}
                                        </option>
                                    ))}
                                </select>
                                {rxForm.errors.appointment_id && (
                                    <p className="text-red-500 text-xs">
                                        {rxForm.errors.appointment_id}
                                    </p>
                                )}
                            </div>

                            {/* Dynamic Drugs List */}
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <label className="block text-sm font-medium">
                                        Medications
                                    </label>
                                    <button
                                        type="button"
                                        onClick={addDrug}
                                        className="text-xs bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded"
                                    >
                                        + Add Drug
                                    </button>
                                </div>

                                {rxForm.data.items.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex gap-2 items-center bg-gray-50 p-2 border rounded"
                                    >
                                        <input
                                            type="text"
                                            placeholder="Drug (e.g. Amoxicillin)"
                                            value={item.drug_name}
                                            onChange={(e) =>
                                                updateDrug(
                                                    index,
                                                    "drug_name",
                                                    e.target.value,
                                                )
                                            }
                                            className="w-1/3 border rounded p-1 text-sm"
                                            required
                                        />
                                        <input
                                            type="text"
                                            placeholder="Dosage (500mg)"
                                            value={item.dosage}
                                            onChange={(e) =>
                                                updateDrug(
                                                    index,
                                                    "dosage",
                                                    e.target.value,
                                                )
                                            }
                                            className="w-1/4 border rounded p-1 text-sm"
                                            required
                                        />
                                        <input
                                            type="text"
                                            placeholder="Freq (2x/day)"
                                            value={item.frequency}
                                            onChange={(e) =>
                                                updateDrug(
                                                    index,
                                                    "frequency",
                                                    e.target.value,
                                                )
                                            }
                                            className="w-1/4 border rounded p-1 text-sm"
                                            required
                                        />
                                        <input
                                            type="text"
                                            placeholder="Dur (7 days)"
                                            value={item.duration}
                                            onChange={(e) =>
                                                updateDrug(
                                                    index,
                                                    "duration",
                                                    e.target.value,
                                                )
                                            }
                                            className="w-1/4 border rounded p-1 text-sm"
                                            required
                                        />
                                        {rxForm.data.items.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeDrug(index)
                                                }
                                                className="text-red-500 hover:text-red-700 font-bold px-2"
                                            >
                                                ✕
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <button
                                type="submit"
                                disabled={rxForm.processing}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded p-2 font-medium text-sm"
                            >
                                {rxForm.processing
                                    ? "Saving..."
                                    : "Save Prescription"}
                            </button>
                        </form>
                    </div>

                    {/* Medical Record Form (from earlier) */}
                    <div className="bg-white rounded-lg shadow p-6 border-t-4 border-teal-500">
                        <h2 className="text-lg font-semibold border-b pb-2 mb-4">
                            Add Medical Note
                        </h2>
                        <form onSubmit={submitMedical} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium">
                                    Symptoms
                                </label>
                                <textarea
                                    value={medicalForm.data.symptoms}
                                    onChange={(e) =>
                                        medicalForm.setData(
                                            "symptoms",
                                            e.target.value,
                                        )
                                    }
                                    rows={2}
                                    className="w-full border rounded p-2 mt-1 text-sm"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">
                                    Diagnosis
                                </label>
                                <textarea
                                    value={medicalForm.data.diagnosis}
                                    onChange={(e) =>
                                        medicalForm.setData(
                                            "diagnosis",
                                            e.target.value,
                                        )
                                    }
                                    rows={2}
                                    className="w-full border rounded p-2 mt-1 text-sm"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">
                                    Treatment Plan
                                </label>
                                <textarea
                                    value={medicalForm.data.treatment}
                                    onChange={(e) =>
                                        medicalForm.setData(
                                            "treatment",
                                            e.target.value,
                                        )
                                    }
                                    rows={2}
                                    className="w-full border rounded p-2 mt-1 text-sm"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={medicalForm.processing}
                                className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded p-2 font-medium text-sm"
                            >
                                {medicalForm.processing
                                    ? "Saving..."
                                    : "Save Medical Note"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </DoctorLayout>
    );
}
