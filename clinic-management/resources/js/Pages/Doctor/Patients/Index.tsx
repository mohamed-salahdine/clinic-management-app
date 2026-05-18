import React from "react";
import DoctorLayout from "@/Layouts/Doctor/DoctorLayout";
import { Link } from "@inertiajs/react";

interface Props {
    patients: any[]; // Using any[] for brevity, normally we define strict types
}

export default function Index({ patients }: Props) {
    return (
        <DoctorLayout title="My Patients">
            <div className="bg-white rounded-lg shadow">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b">
                            <th className="p-4 font-medium">Name</th>
                            <th className="p-4 font-medium">Blood Group</th>
                            <th className="p-4 font-medium">Gender</th>
                            <th className="p-4 font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {patients.map((patient) => (
                            <tr key={patient.id} className="hover:bg-gray-50">
                                <td className="p-4">
                                    {patient.user.first_name}{" "}
                                    {patient.user.last_name}
                                </td>
                                <td className="p-4">
                                    {patient.blood_group || "N/A"}
                                </td>
                                <td className="p-4 capitalize">
                                    {patient.gender}
                                </td>
                                <td className="p-4">
                                    <Link
                                        href={route(
                                            "doctor.patients.show",
                                            patient.id,
                                        )}
                                        className="text-teal-600 hover:underline"
                                    >
                                        View File
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </DoctorLayout>
    );
}
