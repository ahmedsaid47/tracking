import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Index({ vehicles }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Vehicles List
                </h2>
            }
        >
            <Head title="Vehicles List" />

            <div className="bg-gray-100 py-10">
                <div className="mx-auto max-w-7xl">
                    <div className="px-4 sm:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg relative">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th className="py-3.5 px-4 text-left text-sm font-semibold text-gray-900">ID</th>
                                    <th className="py-3.5 px-4 text-left text-sm font-semibold text-gray-900">License Plate</th>
                                    <th className="py-3.5 px-4 text-left text-sm font-semibold text-gray-900">Brand</th>
                                    <th className="py-3.5 px-4 text-left text-sm font-semibold text-gray-900">Model</th>
                                    <th className="py-3.5 px-4 text-left text-sm font-semibold text-gray-900">Institution</th>
                                    <th className="py-3.5 px-4 text-left text-sm font-semibold text-gray-900">Start Address</th>
                                    <th className="py-3.5 px-4 text-left text-sm font-semibold text-gray-900">End Address</th>
                                    <th className="py-3.5 px-4 text-left text-sm font-semibold text-gray-900">Start Geocode</th>
                                    <th className="py-3.5 px-4 text-left text-sm font-semibold text-gray-900">End Geocode</th>
                                    <th className="py-3.5 px-4 text-left text-sm font-semibold text-gray-900">Created At</th>
                                    <th className="py-3.5 px-4 text-left text-sm font-semibold text-gray-900">Updated At</th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                {vehicles.data.map((vehicle) => (
                                    <tr key={vehicle.id}>
                                        <td className="py-4 px-4 text-sm font-medium text-gray-900">{vehicle.id}</td>
                                        <td className="py-4 px-4 text-sm text-gray-500">{vehicle.license_plate}</td>
                                        <td className="py-4 px-4 text-sm text-gray-500">{vehicle.brand}</td>
                                        <td className="py-4 px-4 text-sm text-gray-500">{vehicle.model}</td>
                                        <td className="py-4 px-4 text-sm text-gray-500">
                                            {vehicle.institution.name}
                                        </td>
                                        <td className="py-4 px-4 text-sm text-gray-500">{vehicle.start_address}</td>
                                        <td className="py-4 px-4 text-sm text-gray-500">{vehicle.end_address}</td>
                                        <td className="py-4 px-4 text-sm text-gray-500">
                                            {vehicle.geocode ? (
                                                <>
                                                    Latitude: {vehicle.geocode.start_latitude} <br />
                                                    Longitude: {vehicle.geocode.start_longitude}
                                                </>
                                            ) : "N/A"}
                                        </td>
                                        <td className="py-4 px-4 text-sm text-gray-500">
                                            {vehicle.geocode ? (
                                                <>
                                                    Latitude: {vehicle.geocode.end_latitude} <br />
                                                    Longitude: {vehicle.geocode.end_longitude}
                                                </>
                                            ) : "N/A"}
                                        </td>
                                        <td className="py-4 px-4 text-sm text-gray-500">{vehicle.created_at}</td>
                                        <td className="py-4 px-4 text-sm text-gray-500">{vehicle.updated_at}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
