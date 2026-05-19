import React from "react";
import PatientLayout from "@/Layouts/Patient/PatientLayout";

export default function Dashboard({
    upcomingAppointments,
    unpaidInvoices,
}: {
    upcomingAppointments: any[];
    unpaidInvoices: any[];
}) {
    return (
        <PatientLayout title="Overview">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Upcoming Appointments */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h2 className="text-lg font-medium text-gray-900 border-b pb-2 mb-4">
                        Upcoming Appointments
                    </h2>
                    {upcomingAppointments.length === 0 ? (
                        <p className="text-gray-500 text-sm">
                            You have no upcoming appointments.
                        </p>
                    ) : (
                        <div className="space-y-3">
                            {upcomingAppointments.map((appt: any) => (
                                <div
                                    key={appt.id}
                                    className="p-3 bg-indigo-50 border border-indigo-100 rounded-md"
                                >
                                    <p className="font-semibold text-indigo-900">
                                        {new Date(
                                            appt.appointment_date,
                                        ).toLocaleString()}
                                    </p>
                                    <p className="text-sm text-indigo-700">
                                        Dr. {appt.doctor.user.first_name}{" "}
                                        {appt.doctor.user.last_name}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Unpaid Invoices */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h2 className="text-lg font-medium text-gray-900 border-b pb-2 mb-4">
                        Pending Bills
                    </h2>
                    {unpaidInvoices.length === 0 ? (
                        <p className="text-gray-500 text-sm">
                            You have no pending bills. Great!
                        </p>
                    ) : (
                        <div className="space-y-3">
                            {unpaidInvoices.map((invoice: any) => (
                                <div
                                    key={invoice.id}
                                    className="p-3 bg-red-50 border border-red-100 rounded-md flex justify-between items-center"
                                >
                                    <div>
                                        <p className="font-semibold text-red-900">
                                            INV-
                                            {String(invoice.id).padStart(
                                                4,
                                                "0",
                                            )}
                                        </p>
                                        <p className="text-sm text-red-700">
                                            Due:{" "}
                                            {new Date(
                                                invoice.due_date,
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="text-lg font-bold text-red-900">
                                        $
                                        {parseFloat(
                                            invoice.total_amount,
                                        ).toFixed(2)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </PatientLayout>
    );
}
