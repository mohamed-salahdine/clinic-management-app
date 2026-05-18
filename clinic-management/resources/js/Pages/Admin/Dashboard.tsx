import React from "react";
import AdminLayout from "@/Layouts/Admin/AdminLayout";

export default function Dashboard() {
    return (
        <AdminLayout title="Dashboard">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                    <h3 className="text-gray-500 text-sm font-medium">
                        Total Doctors
                    </h3>
                    <p className="text-3xl font-bold text-gray-800 mt-2">0</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                    <h3 className="text-gray-500 text-sm font-medium">
                        Total Patients
                    </h3>
                    <p className="text-3xl font-bold text-gray-800 mt-2">0</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                    <h3 className="text-gray-500 text-sm font-medium">
                        Today's Appointments
                    </h3>
                    <p className="text-3xl font-bold text-gray-800 mt-2">0</p>
                </div>
            </div>
        </AdminLayout>
    );
}
