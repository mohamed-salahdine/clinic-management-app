import React, { useEffect } from "react";
import AdminLayout from "@/Layouts/Admin/AdminLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({
    patients,
    appointments,
}: {
    patients: any[];
    appointments: any[];
}) {
    const { data, setData, post, processing, errors } = useForm({
        patient_id: "",
        appointment_id: "",
        total_amount: "",
        due_date: "",
    });

    // Auto-select patient when an appointment is chosen
    useEffect(() => {
        if (data.appointment_id) {
            const selectedAppt = appointments.find(
                (a) => a.id.toString() === data.appointment_id,
            );
            if (selectedAppt) {
                setData("patient_id", selectedAppt.patient_id.toString());
            }
        }
    }, [data.appointment_id]);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("admin.invoices.store"));
    };

    return (
        <AdminLayout title="Generate Invoice">
            <Head title="New Invoice" />

            <div className="max-w-2xl bg-white rounded-lg shadow border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-lg font-medium text-gray-900">
                        Create New Invoice
                    </h2>
                </div>

                <form onSubmit={submit} className="p-6 space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Link to Appointment (Optional)
                        </label>
                        <select
                            value={data.appointment_id}
                            onChange={(e) =>
                                setData("appointment_id", e.target.value)
                            }
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                        >
                            <option value="">-- Standalone Invoice --</option>
                            {appointments.map((appt) => (
                                <option key={appt.id} value={appt.id}>
                                    {new Date(
                                        appt.appointment_date,
                                    ).toLocaleDateString()}{" "}
                                    - {appt.patient.user.first_name}{" "}
                                    {appt.patient.user.last_name} (Dr.{" "}
                                    {appt.doctor.user.last_name})
                                </option>
                            ))}
                        </select>
                        {errors.appointment_id && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.appointment_id}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Patient *
                        </label>
                        <select
                            value={data.patient_id}
                            onChange={(e) =>
                                setData("patient_id", e.target.value)
                            }
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                            required
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

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Total Amount ($) *
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                value={data.total_amount}
                                onChange={(e) =>
                                    setData("total_amount", e.target.value)
                                }
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                                placeholder="0.00"
                                required
                            />
                            {errors.total_amount && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.total_amount}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Due Date *
                            </label>
                            <input
                                type="date"
                                value={data.due_date}
                                onChange={(e) =>
                                    setData("due_date", e.target.value)
                                }
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                                required
                            />
                            {errors.due_date && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.due_date}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 border-t pt-4">
                        <Link
                            href={route("admin.invoices.index")}
                            className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition disabled:opacity-50"
                        >
                            {processing ? "Saving..." : "Generate Invoice"}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
