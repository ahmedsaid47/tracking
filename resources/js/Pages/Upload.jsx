import React, { useState } from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Upload() {
    const [excelFile, setExcelFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [geocodingProcessing, setGeocodingProcessing] = useState(false);

    // CSRF token'i kontrol et ve al
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

    if (!csrfToken) {
        console.error("CSRF token bulunamadı. Meta etiketi HTML dosyanızda eksik.");
    }

    const handleFileChange = (e) => {
        setExcelFile(e.target.files[0]);
    };

    // Excel dosyasını yükleyen fonksiyon
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!excelFile) {
            alert("Lütfen bir dosya seçin.");
            return;
        }

        const formData = new FormData();
        formData.append('excel_file', excelFile);

        setUploading(true);

        try {
            const response = await fetch('/upload/store', {
                method: 'POST',
                body: formData,
                headers: {
                    'X-CSRF-TOKEN': csrfToken || ''  // CSRF token yoksa boş geçer
                },
            });

            if (response.ok) {
                alert("Excel verileri başarıyla yüklendi!");
                setExcelFile(null);
            } else {
                const errorData = await response.json();
                alert(`Dosya yükleme hatası: ${errorData.message || 'Bilinmeyen bir hata oluştu.'}`);
            }
        } catch (error) {
            alert(`İstek hatası: ${error.message}`);
        } finally {
            setUploading(false);
        }
    };

    // Geocoding işlemini başlatan fonksiyon
    const handleGeocode = async () => {
        setGeocodingProcessing(true);

        try {
            const response = await fetch('/upload/geocode', {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': csrfToken || ''  // CSRF token yoksa boş geçer
                },
            });

            if (response.ok) {
                alert("Geocoding işlemi başarıyla tamamlandı!");
            } else {
                const errorData = await response.json();
                alert(`Geocoding hatası: ${errorData.message || 'Bilinmeyen bir hata oluştu.'}`);
            }
        } catch (error) {
            alert(`İstek hatası: ${error.message}`);
        } finally {
            setGeocodingProcessing(false);
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Excel Dosyası Yükle ve Geocoding İşlemleri
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
                                        disabled={uploading}
                                    >
                                        {uploading ? 'Yükleniyor...' : 'Excel Yükle'}
                                    </button>
                                </div>
                            </form>

                            <div className="mt-6">
                                <button
                                    onClick={handleGeocode}
                                    className="px-4 py-2 bg-green-500 text-white rounded-md"
                                    disabled={geocodingProcessing}
                                >
                                    {geocodingProcessing ? 'Geocoding İşleniyor...' : 'Geocoding İşlemi Başlat'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
