import React, { useState } from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm } from '@inertiajs/inertia-react';

export default function Upload() {
    const { data, setData, post, processing, errors, reset } = useForm({
        excel_file: null,
    });

    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        setData('excel_file', e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('upload.store'), {
            forceFormData: true,
            onSuccess: () => {
                alert("Excel verileri başarıyla yüklendi!");
                reset();
            },
            onError: () => {
                alert("Dosya yükleme sırasında bir hata oluştu. Hata mesajlarını kontrol edin.");
            },
        });
    };


    const handleGeocode = async () => {
        setLoading(true);
        try {
            const response = await fetch(route('upload.geocode'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({})
            });

            if (response.ok) {
                const data = await response.json();
                alert(data.message || "Geocoding işlemi başarıyla tamamlandı!");
            } else {
                let errorMessage = "Geocoding işlemi sırasında bir hata oluştu.";
                try {
                    const errorData = await response.json();
                    errorMessage += " Hata: " + (errorData.message || "Belirtilmemiş bir hata oluştu.");
                } catch (jsonError) {
                    console.error("Hata yanıtı JSON formatında değil:", jsonError);
                    errorMessage += " Hata yanıtı JSON formatında değil.";
                }
                alert(errorMessage);
            }
        } catch (error) {
            console.error("Geocoding işlemi sırasında beklenmeyen bir hata oluştu:", error);
            alert("Geocoding işlemi sırasında beklenmeyen bir hata oluştu. Hata: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGpt = async () => {
        setLoading(true);
        try {
            const response = await fetch(route('upload.chatgpt'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({})
            });

            if (response.ok) {
                const data = await response.json();
                alert(data.message || "Gpt işlemi başarıyla tamamlandı!");
            } else {
                let errorMessage = "Gpt işlemi sırasında bir hata oluştu.";
                try {
                    const errorData = await response.json();
                    errorMessage += " Hata: " + (errorData.message || "Belirtilmemiş bir hata oluştu.");
                } catch (jsonError) {
                    console.error("Hata yanıtı JSON formatında değil:", jsonError);
                    errorMessage += " Hata yanıtı JSON formatında değil.";
                }
                alert(errorMessage);
            }
        } catch (error) {
            console.error("Gpt işlemi sırasında beklenmeyen bir hata oluştu:", error);
            alert("Gpt işlemi sırasında beklenmeyen bir hata oluştu. Hata: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Excel Dosyası Yükle
                </h2>
            }
        >
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

                            {/* Geocode işlemi için ayrı alan */}
                            <div className="mt-12">
                                <h3 className="font-semibold text-lg text-gray-800">Geocoding İşlemi</h3>
                                <p className="text-sm text-gray-600">Yüklenen araçlar için geocode işlemini başlatmak için aşağıdaki butona tıklayın.</p>

                                <button
                                    onClick={handleGeocode}
                                    className={`px-4 py-2 mt-4 ${loading ? 'bg-gray-400' : 'bg-green-500'} text-white rounded-md flex items-center`}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            İşlem Yapılıyor...
                                        </>
                                    ) : 'Geocoding İşlemini Başlat'}
                                </button>

                                <button
                                    onClick={handleGpt}
                                    className={`px-4 py-2 mt-4 ${loading ? 'bg-gray-400' : 'bg-green-500'} text-white rounded-md flex items-center`}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            İşlem Yapılıyor...
                                        </>
                                    ) : 'Gpt İşlemini Başlat'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
