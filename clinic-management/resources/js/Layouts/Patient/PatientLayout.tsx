import React, { PropsWithChildren } from "react";
import { Head, Link, usePage } from "@inertiajs/react";

interface Props {
    title: string;
}

export default function PatientLayout({
    title,
    children,
}: PropsWithChildren<Props>) {
    // Pull the shared data from Inertia
    const { auth } = usePage<any>().props;
    const notifications = auth.notifications || [];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Head title={`Patient Portal - ${title}`} />

            {/* Top Navigation */}
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

                            {/* Notification Bell */}
                            <div className="relative ml-2 mr-2">
                                <span className="text-xl cursor-pointer">
                                    🔔
                                </span>
                                {notifications.length > 0 && (
                                    <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                                        {notifications.length}
                                    </span>
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

            {/* Main Content */}
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
