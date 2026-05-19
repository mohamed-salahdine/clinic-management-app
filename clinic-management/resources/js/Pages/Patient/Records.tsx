import React from "react";
import PatientLayout from "@/Layouts/Patient/PatientLayout";

export default function Records({
    medicalRecords,
    prescriptions,
}: {
    medicalRecords: any[];
    prescriptions: any[];
}) {
    return (
        <PatientLayout title="My Medical Records">
            <div className="space-y-8">
                {/* Prescriptions */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-medium text-gray-900">
                            My Prescriptions
                        </h2>
                    </div>
                    <div className="p-6">
                        {prescriptions.length === 0 ? (
                            <p className="text-gray-500 text-sm">
                                No prescriptions found.
                            </p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {prescriptions.map((rx: any) => (
                                    <div
                                        key={rx.id}
                                        className="border border-gray-200 rounded-lg p-4"
                                    >
                                        <p className="text-xs text-gray-500 mb-2">
                                            Prescribed on{" "}
                                            {new Date(
                                                rx.created_at,
                                            ).toLocaleDateString()}{" "}
                                            by Dr. {rx.doctor.user.last_name}
                                        </p>
                                        <ul className="list-disc pl-5 space-y-1">
                                            {rx.items.map((item: any) => (
                                                <li
                                                    key={item.id}
                                                    className="text-sm"
                                                >
                                                    <span className="font-semibold">
                                                        {item.drug_name}
                                                    </span>{" "}
                                                    - {item.dosage} (
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

                {/* Medical Notes */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-medium text-gray-900">
                            Consultation Notes
                        </h2>
                    </div>
                    <div className="p-6">
                        {medicalRecords.length === 0 ? (
                            <p className="text-gray-500 text-sm">
                                No records found.
                            </p>
                        ) : (
                            <div className="space-y-4">
                                {medicalRecords.map((record: any) => (
                                    <div
                                        key={record.id}
                                        className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                                    >
                                        <p className="text-xs text-gray-500 mb-3">
                                            {new Date(
                                                record.created_at,
                                            ).toLocaleDateString()}{" "}
                                            - Dr. {record.doctor.user.last_name}
                                        </p>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <span className="font-semibold text-gray-700 block">
                                                    Diagnosis
                                                </span>
                                                <p className="text-gray-600 mt-1">
                                                    {record.diagnosis}
                                                </p>
                                            </div>
                                            <div>
                                                <span className="font-semibold text-gray-700 block">
                                                    Treatment
                                                </span>
                                                <p className="text-gray-600 mt-1">
                                                    {record.treatment}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </PatientLayout>
    );
}
