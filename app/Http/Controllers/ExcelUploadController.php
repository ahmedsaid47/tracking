<?php

namespace App\Http\Controllers;

use App\Models\Vehicle;
use App\Models\Institution;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\VehiclesImport;

class ExcelUploadController extends Controller
{
    /**
     * Show the form for uploading an Excel file.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        return Inertia::render('Vehicles/Upload');
    }

    /**
     * Handle the uploaded Excel file and store data in the database.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        log::info('fonksiyon başladı.');
        $request->validate([
            'excel_file' => 'required|file|mimes:xlsx,xls,csv|max:2048',
        ]);

        try {
            Log::info('Excel dosyası yüklendi ve işleme alınıyor.', ['file_name' => $request->file('excel_file')->getClientOriginalName()]);

            // Excel dosyasını işle ve veritabanına kaydet
            Excel::import(new VehiclesImport, $request->file('excel_file'));

            return redirect()->route('vehicles.index')->with('success', 'Excel data imported successfully');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Error importing Excel data: ' . $e->getMessage()]);
        }
    }
}
