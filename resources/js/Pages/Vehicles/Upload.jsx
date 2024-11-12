import React from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";

export default function Upload() {
    const { data, setData, post, processing, errors, reset } = useForm({
        excel_file: null,
    });

    const handleFileChange = (e) => {
        setData('excel_file', e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('upload.store'), {
            forceFormData: true,
            onSuccess: () => {
                alert("Excel verileri başarıyla yüklendi!");
                reset(); // Formu sıfırla
            },
            onError: () => {
                alert("Dosya yükleme sırasında bir hata oluştu. Hata mesajlarını kontrol edin.");
            },
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Excel Dosyası Yükle
                </h2>
            }
        >
            <Head title="Excel Upload" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <form onSubmit={handleSubmit} encType="multipart/form-data">
                                <div>
                                    <label className="block font-medium text-sm text-gray-700">
                                        Excel Dosyası
                                    </label>
                                    <input
                                        type="file"
                                        accept=".xlsx,.xls,.csv"
                                        onChange={handleFileChange}
                                        className="form-input rounded-md shadow-sm mt-1 block w-full"
                                    />
                                    {errors.excel_file && (
                                        <span className="text-red-600">{errors.excel_file}</span>
                                    )}
                                </div>

                                <div className="mt-6">
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-500 text-white rounded-md"
                                        disabled={processing}
                                    >
                                        {processing ? 'Yükleniyor...' : 'Yükle'}
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
