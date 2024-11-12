<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\VehicleResource;
use App\Models\Institution;
use App\Models\Vehicle;
use Inertia\Inertia;
use Illuminate\Http\Request;

class VehicleController extends Controller
{
    /**
     * Display a listing of the vehicles.
     *
     * @return \Inertia\Response
     */
    public function index(): \Inertia\Response
    {
        $vehicles = Vehicle::with(['institution:id,name'])->get();

        return Inertia::render('Vehicles/Index', [
            'vehicles' => VehicleResource::collection($vehicles),
        ]);
    }

    /**
     * Show the form for creating a new vehicle.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        // Tüm kurumları alırken gereksiz alanları yüklemiyoruz
        $institutions = Institution::select('id', 'name')->get();

        return Inertia::render('Vehicles/AddVehicle', [
            'institutions' => $institutions,
        ]);
    }

    /**
     * Store a newly created vehicle in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        // Doğrulama kuralları
        $request->validate([
            'license_plate' => 'required|string|max:255',
            'institution_id' => 'required|exists:institutions,id',
            'model' => 'required|string|max:255',
            'start_address' => 'required|string|max:255',
            'end_address' => 'required|string|max:255',
            'brand' => 'nullable|string|max:255',
        ]);

        try {
            // Araç kaydını oluştur
            Vehicle::create($request->only(
                'license_plate', 'institution_id', 'brand', 'model', 'start_address', 'end_address'
            ));

            return redirect()->route('vehicles.index')->with('success', 'Vehicle added successfully');
        } catch (\Exception $e) {
            // Hata durumunda ayrıntılı hata mesajıyla geri dön
            return back()->withErrors(['error' => 'Error adding vehicle: ' . $e->getMessage()]);
        }
    }
}
