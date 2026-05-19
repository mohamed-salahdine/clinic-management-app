import React, { PropsWithChildren, useState } from "react"; // <-- Import useState
import { Head, Link, usePage } from "@inertiajs/react";

interface Props {
    title: string;
}

export default function PatientLayout({
    title,
    children,
}: PropsWithChildren<Props>) {
    const { auth } = usePage<any>().props;
    const notifications = auth.notifications || [];

    // Add state to toggle the dropdown
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Head title={`Patient Portal - ${title}`} />

            <header className="bg-indigo-600 text-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="text-xl font-bold">MyHealth Portal</div>
                        <nav className="flex items-center space-x-4">
                            <Link
                                href={route("patient.dashboard")}
                                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500"
                            >
                                Dashboard
                            </Link>
                            <Link
                                href={route("patient.records")}
                                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500"
                            >
                                Medical Records
                            </Link>

                            {/* Notification Bell Dropdown */}
                            <div className="relative ml-2 mr-2">
                                <button
                                    onClick={() =>
                                        setIsNotificationOpen(
                                            !isNotificationOpen,
                                        )
                                    }
                                    className="text-xl relative focus:outline-none hover:opacity-80 transition"
                                >
                                    🔔
                                    {notifications.length > 0 && (
                                        <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                                            {notifications.length}
                                        </span>
                                    )}
                                </button>

                                {/* Dropdown Menu */}
                                {isNotificationOpen && (
                                    <div className="absolute right-0 mt-3 w-80 bg-white rounded-md shadow-xl py-1 z-50 border border-gray-200">
                                        <div className="px-4 py-2 border-b border-gray-100 font-semibold text-gray-700 text-sm">
                                            Notifications
                                        </div>
                                        <div className="max-h-64 overflow-y-auto">
                                            {notifications.length === 0 ? (
                                                <div className="px-4 py-4 text-sm text-gray-500 text-center">
                                                    You have no new
                                                    notifications.
                                                </div>
                                            ) : (
                                                notifications.map(
                                                    (notif: any) => (
                                                        <Link
                                                            key={notif.id}
                                                            href={route(
                                                                "patient.notifications.read",
                                                                notif.id,
                                                            )}
                                                            method="post"
                                                            as="button"
                                                            onClick={() =>
                                                                setIsNotificationOpen(
                                                                    false,
                                                                )
                                                            }
                                                            className="block w-full text-left px-4 py-3 hover:bg-indigo-50 transition border-b border-gray-50 last:border-0"
                                                        >
                                                            <p className="text-sm font-semibold text-indigo-700">
                                                                New Invoice
                                                                Generated
                                                            </p>
                                                            <p className="text-sm text-gray-600 mt-1">
                                                                {
                                                                    notif.data
                                                                        .message
                                                                }
                                                            </p>
                                                            <p className="text-xs text-gray-400 mt-1">
                                                                {new Date(
                                                                    notif.created_at,
                                                                ).toLocaleString()}
                                                            </p>
                                                        </Link>
                                                    ),
                                                )
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <Link
                                href={route("logout")}
                                method="post"
                                as="button"
                                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500 border border-indigo-400 ml-4"
                            >
                                Log Out
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>

            <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        {title}
                    </h1>
                </div>
                {children}
            </main>
        </div>
    );
}
