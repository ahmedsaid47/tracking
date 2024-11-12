import React from "react";

export default function Pagination({ meta, updatedPageNumber }) {
    if (!meta || meta.total <= meta.per_page) {
        return null; // Eğer sayfalama gerekmezse bileşen gösterilmez.
    }

    const handlePageClick = (link) => {
        if (link.url) {
            updatedPageNumber(link); // Üst bileşende sayfa numarasını güncelle.
        }
    };

    return (
        <nav className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6">
            <div className="hidden sm:block">
                <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{meta.from}</span> to{" "}
                    <span className="font-medium">{meta.to}</span> of{" "}
                    <span className="font-medium">{meta.total}</span> results
                </p>
            </div>
            <div className="flex-1 flex justify-between sm:justify-end">
                {meta.links.map((link, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageClick(link)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            link.active
                                ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
                                : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                        }`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                ))}
            </div>
        </nav>
    );
}
