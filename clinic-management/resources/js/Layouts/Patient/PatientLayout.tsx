import React, { PropsWithChildren } from "react";
import { Head, Link } from "@inertiajs/react";

interface Props {
    title: string;
}

export default function PatientLayout({
    title,
    children,
}: PropsWithChildren<Props>) {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Head title={`Patient Portal - ${title}`} />

            {/* Top Navigation */}
            <header className="bg-indigo-600 text-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="text-xl font-bold">MyHealth Portal</div>
                        <nav className="flex space-x-4">
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
                            <Link
                                href={route("logout")}
                                method="post"
                                as="button"
                                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500"
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
