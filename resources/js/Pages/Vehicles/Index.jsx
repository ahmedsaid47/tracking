import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Index({ vehicles: initialVehicles }) {
    const [vehicles, setVehicles] = useState(initialVehicles.data);
    const [showMap, setShowMap] = useState(false);
    const [selectedRoute, setSelectedRoute] = useState(null);

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this vehicle?")) {
            return;
        }

        try {
            const response = await fetch(`/vehicles/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "X-Requested-With": "XMLHttpRequest",
                },
                redirect: "manual",
            });

            if (response.ok) {
                alert("Vehicle deleted successfully");
                window.location.href = "/vehicles";
            } else {
                alert("Error deleting vehicle.");
            }
        } catch (error) {
            alert("An error occurred: " + error.message);
        }
    };

    const openMap = (start, end) => {
        setSelectedRoute({ start, end });
        setShowMap(true);
    };

    const closeMap = () => {
        setShowMap(false);
        setSelectedRoute(null);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Vehicles List
                </h2>
            }
        >
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
                                    <th className="py-3.5 px-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                {vehicles.map((vehicle) => (
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
                                        <td className="py-4 px-4 text-sm text-gray-500">
                                            <button
                                                onClick={() => handleDelete(vehicle.id)}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                Delete
                                            </button>
                                            {vehicle.geocode && (
                                                <button
                                                    onClick={() =>
                                                        openMap(
                                                            [vehicle.geocode.start_latitude, vehicle.geocode.start_longitude],
                                                            [vehicle.geocode.end_latitude, vehicle.geocode.end_longitude]
                                                        )
                                                    }
                                                    className="text-blue-600 hover:text-blue-900 ml-4"
                                                >
                                                    View Route
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {showMap && selectedRoute && (
                <div className="fixed inset-0 z-10 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg shadow-lg p-4 w-3/4 h-3/4">
                        <button
                            onClick={closeMap}
                            className="absolute top-2 right-2 text-gray-700"
                        >
                            ✖
                        </button>
                        <h3 className="text-xl font-bold mb-4">Vehicle Route</h3>
                        <MapContainer
                            center={selectedRoute.start}
                            zoom={13}
                            style={{ height: "100%", width: "100%" }}
                        >
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={selectedRoute.start}></Marker>
                            <Marker position={selectedRoute.end}></Marker>
                            <Polyline
                                positions={[selectedRoute.start, selectedRoute.end]}
                                color="blue"
                            />
                        </MapContainer>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
