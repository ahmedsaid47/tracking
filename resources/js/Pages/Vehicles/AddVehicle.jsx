import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";

export default function AddVehicle() {
    const { institutions } = usePage().props;

    const { data, setData, post, errors, processing, reset } = useForm({
        license_plate: "",
        institution_id: "",
        brand: "",
        model: "",
        start_address: "",
        end_address: "",
        start_latitude: "",
        start_longitude: "",
        end_latitude: "",
        end_longitude: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("vehicles.store"), {
            onSuccess: () => {
                alert("Vehicle added successfully!");
                reset();
            },
            onError: () => {
                alert("There was an error adding the vehicle. Please check the error messages.");
            },
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Add New Vehicle
                </h2>
            }
        >
            <Head title="Add Vehicle" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <form onSubmit={handleSubmit}>
                                {/* License Plate */}
                                <div>
                                    <label className="block font-medium text-sm text-gray-700">License Plate</label>
                                    <input
                                        type="text"
                                        value={data.license_plate}
                                        onChange={(e) => setData("license_plate", e.target.value)}
                                        className="form-input rounded-md shadow-sm mt-1 block w-full"
                                        placeholder="34XYZ123"
                                    />
                                    <small className="text-gray-500">Example: 34XYZ123</small>
                                    {errors.license_plate && (
                                        <span className="text-red-600">{errors.license_plate}</span>
                                    )}
                                </div>

                                {/* Institution */}
                                <div className="mt-4">
                                    <label className="block font-medium text-sm text-gray-700">Institution</label>
                                    <select
                                        value={data.institution_id}
                                        onChange={(e) => setData("institution_id", e.target.value)}
                                        className="form-select rounded-md shadow-sm mt-1 block w-full"
                                    >
                                        <option value="">Select an Institution</option>
                                        {institutions.map((institution) => (
                                            <option key={institution.id} value={institution.id}>
                                                {institution.name}
                                            </option>
                                        ))}
                                    </select>
                                    <small className="text-gray-500">Example: Institution Name</small>
                                    {errors.institution_id && (
                                        <span className="text-red-600">{errors.institution_id}</span>
                                    )}
                                </div>

                                {/* Brand */}
                                <div className="mt-4">
                                    <label className="block font-medium text-sm text-gray-700">Brand</label>
                                    <input
                                        type="text"
                                        value={data.brand}
                                        onChange={(e) => setData("brand", e.target.value)}
                                        className="form-input rounded-md shadow-sm mt-1 block w-full"
                                        placeholder="Toyota"
                                    />
                                    <small className="text-gray-500">Example: Toyota</small>
                                    {errors.brand && <span className="text-red-600">{errors.brand}</span>}
                                </div>

                                {/* Model */}
                                <div className="mt-4">
                                    <label className="block font-medium text-sm text-gray-700">Model</label>
                                    <input
                                        type="text"
                                        value={data.model}
                                        onChange={(e) => setData("model", e.target.value)}
                                        className="form-input rounded-md shadow-sm mt-1 block w-full"
                                        placeholder="Corolla"
                                    />
                                    <small className="text-gray-500">Example: Corolla</small>
                                    {errors.model && <span className="text-red-600">{errors.model}</span>}
                                </div>

                                {/* Start Address */}
                                <div className="mt-4">
                                    <label className="block font-medium text-sm text-gray-700">Start Address</label>
                                    <input
                                        type="text"
                                        value={data.start_address}
                                        onChange={(e) => setData("start_address", e.target.value)}
                                        className="form-input rounded-md shadow-sm mt-1 block w-full"
                                        placeholder="123 Main St, Istanbul"
                                    />
                                    <small className="text-gray-500">Example: 123 Main St, Istanbul</small>
                                    {errors.start_address && <span className="text-red-600">{errors.start_address}</span>}
                                </div>

                                {/* End Address */}
                                <div className="mt-4">
                                    <label className="block font-medium text-sm text-gray-700">End Address</label>
                                    <input
                                        type="text"
                                        value={data.end_address}
                                        onChange={(e) => setData("end_address", e.target.value)}
                                        className="form-input rounded-md shadow-sm mt-1 block w-full"
                                        placeholder="456 Elm St, Ankara"
                                    />
                                    <small className="text-gray-500">Example: 456 Elm St, Ankara</small>
                                    {errors.end_address && <span className="text-red-600">{errors.end_address}</span>}
                                </div>

                                {/* Start Geocode */}
                                <div className="mt-4">
                                    <label className="block font-medium text-sm text-gray-700">Start Latitude</label>
                                    <input
                                        type="text"
                                        value={data.start_latitude}
                                        onChange={(e) => setData("start_latitude", e.target.value)}
                                        className="form-input rounded-md shadow-sm mt-1 block w-full"
                                        placeholder="41.015137"
                                    />
                                    <small className="text-gray-500">Example: 41.015137</small>
                                    {errors.start_latitude && <span className="text-red-600">{errors.start_latitude}</span>}
                                </div>
                                <div className="mt-4">
                                    <label className="block font-medium text-sm text-gray-700">Start Longitude</label>
                                    <input
                                        type="text"
                                        value={data.start_longitude}
                                        onChange={(e) => setData("start_longitude", e.target.value)}
                                        className="form-input rounded-md shadow-sm mt-1 block w-full"
                                        placeholder="28.979530"
                                    />
                                    <small className="text-gray-500">Example: 28.979530</small>
                                    {errors.start_longitude && <span className="text-red-600">{errors.start_longitude}</span>}
                                </div>

                                {/* End Geocode */}
                                <div className="mt-4">
                                    <label className="block font-medium text-sm text-gray-700">End Latitude</label>
                                    <input
                                        type="text"
                                        value={data.end_latitude}
                                        onChange={(e) => setData("end_latitude", e.target.value)}
                                        className="form-input rounded-md shadow-sm mt-1 block w-full"
                                        placeholder="39.933365"
                                    />
                                    <small className="text-gray-500">Example: 39.933365</small>
                                    {errors.end_latitude && <span className="text-red-600">{errors.end_latitude}</span>}
                                </div>
                                <div className="mt-4">
                                    <label className="block font-medium text-sm text-gray-700">End Longitude</label>
                                    <input
                                        type="text"
                                        value={data.end_longitude}
                                        onChange={(e) => setData("end_longitude", e.target.value)}
                                        className="form-input rounded-md shadow-sm mt-1 block w-full"
                                        placeholder="32.859741"
                                    />
                                    <small className="text-gray-500">Example: 32.859741</small>
                                    {errors.end_longitude && <span className="text-red-600">{errors.end_longitude}</span>}
                                </div>

                                <div className="mt-6">
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-500 text-white rounded-md"
                                        disabled={processing}
                                    >
                                        {processing ? "Saving..." : "Add Vehicle"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
