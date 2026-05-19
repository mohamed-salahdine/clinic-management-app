import React, { PropsWithChildren } from "react";
import { Head, Link } from "@inertiajs/react";

interface Props {
    title: string;
}

export default function DoctorLayout({
    title,
    children,
}: PropsWithChildren<Props>) {
    return (
        <div className="min-h-screen bg-gray-100 flex">
            <Head title={`Doctor - ${title}`} />

            {/* Sidebar */}
            <aside className="w-64 bg-teal-900 text-white flex flex-col">
                <div className="p-4 text-2xl font-bold border-b border-teal-800">
                    Doctor Portal
                </div>
                <nav className="flex-1 p-4 flex flex-col space-y-2">
                    <Link
                        href={route("doctor.dashboard")}
                        className="block px-4 py-2 rounded hover:bg-teal-800"
                    >
                        Dashboard
                    </Link>
                    <Link
                        href={route("doctor.patients.index")}
                        className="block px-4 py-2 rounded hover:bg-teal-800"
                    >
                        My Patients
                    </Link>

                    <div className="flex-1"></div>

                    <Link
                        href={route("logout")}
                        method="post"
                        as="button"
                        className="block w-full text-left px-4 py-2 rounded text-red-200 hover:bg-teal-800 hover:text-red-100"
                    >
                        Log Out
                    </Link>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col">
                <header className="bg-white shadow h-16 flex items-center px-6">
                    <h1 className="text-xl font-semibold text-gray-800">
                        {title}
                    </h1>
                </header>
                <div className="p-6 flex-1 overflow-auto">{children}</div>
            </main>
        </div>
    );
}
