import React from "react";
import DoctorLayout from "@/Layouts/Doctor/DoctorLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard() {
    return (
        <DoctorLayout title="Doctor Dashboard">
            <Head title="Doctor Dashboard" />

            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <h2 className="text-xl font-medium text-gray-900">
                    Welcome, Doctor!
                </h2>
                <p className="mt-2 text-gray-600">
                    Use the sidebar to view your assigned patients, manage
                    medical files, and add new consultation records.
                </p>
            </div>
        </DoctorLayout>
    );
}
