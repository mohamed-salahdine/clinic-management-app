import React from "react";
import AdminLayout from "@/Layouts/Admin/AdminLayout";
import { Head, Link } from "@inertiajs/react";

export default function Index({ invoices }: { invoices: any[] }) {
    return (
        <AdminLayout title="Billing & Invoices">
            <Head title="Invoices" />

            <div className="bg-white rounded-lg shadow border border-gray-200">
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-lg font-medium text-gray-900">
                        All Invoices
                    </h2>
                    <Link
                        href={route("admin.invoices.create")}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition"
                    >
                        + Generate Invoice
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider border-b">
                                <th className="p-4 font-medium">Invoice #</th>
                                <th className="p-4 font-medium">Patient</th>
                                <th className="p-4 font-medium">Amount</th>
                                <th className="p-4 font-medium">Status</th>
                                <th className="p-4 font-medium">Due Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {invoices.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="p-8 text-center text-gray-500"
                                    >
                                        No invoices found.
                                    </td>
                                </tr>
                            ) : (
                                invoices.map((invoice) => (
                                    <tr
                                        key={invoice.id}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="p-4 font-medium text-gray-900">
                                            INV-
                                            {String(invoice.id).padStart(
                                                4,
                                                "0",
                                            )}
                                        </td>
                                        <td className="p-4 text-gray-800">
                                            {invoice.patient.user.first_name}{" "}
                                            {invoice.patient.user.last_name}
                                        </td>
                                        <td className="p-4 font-semibold text-gray-800">
                                            $
                                            {parseFloat(
                                                invoice.total_amount,
                                            ).toFixed(2)}
                                        </td>
                                        <td className="p-4">
                                            <span
                                                className={`px-2 py-1 text-xs font-semibold rounded-full 
                                                ${invoice.status === "unpaid" ? "bg-red-100 text-red-800" : ""}
                                                ${invoice.status === "paid" ? "bg-green-100 text-green-800" : ""}
                                                ${invoice.status === "partially_paid" ? "bg-yellow-100 text-yellow-800" : ""}
                                            `}
                                            >
                                                {invoice.status.toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="p-4 text-gray-600">
                                            {new Date(
                                                invoice.due_date,
                                            ).toLocaleDateString()}
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
