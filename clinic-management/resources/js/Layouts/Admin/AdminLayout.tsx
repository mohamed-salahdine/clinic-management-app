import React, { PropsWithChildren } from "react";
import { Head, Link } from "@inertiajs/react";

interface Props {
    title: string;
}

export default function AdminLayout({
    title,
    children,
}: PropsWithChildren<Props>) {
    return (
        <div className="min-h-screen bg-gray-100 flex">
            <Head title={`Admin - ${title}`} />

            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white flex flex-col">
                <div className="p-4 text-2xl font-bold border-b border-slate-800">
                    Clinic Admin
                </div>
                <nav className="flex-1 p-4 flex flex-col space-y-2">
                    <Link
                        href={route("admin.dashboard")}
                        className="block px-4 py-2 rounded bg-slate-800 hover:bg-slate-700"
                    >
                        Dashboard
                    </Link>
                    <Link
                        href="#"
                        className="block px-4 py-2 rounded hover:bg-slate-700"
                    >
                        Doctors
                    </Link>
                    <Link
                        href="#"
                        className="block px-4 py-2 rounded hover:bg-slate-700"
                    >
                        Patients
                    </Link>
                    <Link
                        href={route("admin.appointments.index")}
                        className="block px-4 py-2 rounded hover:bg-slate-700"
                    >
                        Appointments
                    </Link>
                    <Link
                        href={route("admin.invoices.index")}
                        className="block px-4 py-2 rounded hover:bg-slate-700"
                    >
                        Invoices
                    </Link>

                    {/* Spacer to push logout to the bottom if needed, or just keep it below */}
                    <div className="flex-1"></div>

                    <Link
                        href={route("logout")}
                        method="post"
                        as="button"
                        className="block w-full text-left px-4 py-2 rounded text-red-400 hover:bg-slate-800 hover:text-red-300"
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
