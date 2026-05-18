import React from "react";
import AdminLayout from "@/Layouts/Admin/AdminLayout";
import { Head, Link } from "@inertiajs/react";

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

interface Appointment {
    id: number;
    appointment_date: string;
    status: string;
    reason_for_visit: string;
    doctor: Doctor;
    patient: Patient;
}

interface Props {
    appointments: Appointment[];
}

export default function Index({ appointments }: Props) {
    return (
        <AdminLayout title="Appointments">
            <Head title="Manage Appointments" />

            <div className="bg-white rounded-lg shadow border border-gray-200">
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-lg font-medium text-gray-900">
                        All Appointments
                    </h2>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition">
                        + New Appointment
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider border-b">
                                <th className="p-4 font-medium">Date & Time</th>
                                <th className="p-4 font-medium">Patient</th>
                                <th className="p-4 font-medium">Doctor</th>
                                <th className="p-4 font-medium">Status</th>
                                <th className="p-4 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {appointments.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="p-8 text-center text-gray-500"
                                    >
                                        No appointments found.
                                    </td>
                                </tr>
                            ) : (
                                appointments.map((appointment) => (
                                    <tr
                                        key={appointment.id}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="p-4 text-gray-800">
                                            {new Date(
                                                appointment.appointment_date,
                                            ).toLocaleString()}
                                        </td>
                                        <td className="p-4 text-gray-800">
                                            {
                                                appointment.patient.user
                                                    .first_name
                                            }{" "}
                                            {appointment.patient.user.last_name}
                                        </td>
                                        <td className="p-4 text-gray-800">
                                            Dr.{" "}
                                            {appointment.doctor.user.first_name}{" "}
                                            {appointment.doctor.user.last_name}
                                            <span className="block text-xs text-gray-500">
                                                {
                                                    appointment.doctor
                                                        .specialization
                                                }
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <span
                                                className={`px-2 py-1 text-xs font-semibold rounded-full 
                                                ${appointment.status === "scheduled" ? "bg-blue-100 text-blue-800" : ""}
                                                ${appointment.status === "completed" ? "bg-green-100 text-green-800" : ""}
                                                ${appointment.status === "cancelled" ? "bg-red-100 text-red-800" : ""}
                                            `}
                                            >
                                                {appointment.status.toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <button className="text-blue-600 hover:underline text-sm">
                                                Edit
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
