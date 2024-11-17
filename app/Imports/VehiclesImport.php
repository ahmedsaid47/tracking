<?php

namespace App\Imports;

use App\Models\Vehicle;
use App\Models\Institution;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class VehiclesImport implements ToModel, WithHeadingRow
{
    /**
     * @param array $row
     * @return Vehicle|null
     */
    public function model(array $row)
    {
        Log::info('Excel dosyasından okunan satır:', $row);

        $institution = Institution::firstOrCreate(
            ['name' => $row['institution']],
            ['name' => $row['institution'], 'parent_id' => $row['parent_institution_id'] ?? null]
        );

        Log::info('Kurum kontrol ediliyor.', ['institution' => $row['institution']]);

        if ($institution->wasRecentlyCreated) {
            Log::info('Yeni bir kurum oluşturuldu.', ['institution' => $row['institution']]);
        } else {
            Log::info('Var olan kurum bulundu.', ['institution' => $row['institution']]);
        }

        Log::info('Yeni araç kaydediliyor.', [
            'license_plate' => $row['license_plate'],
            'brand' => $row['brand'],
            'model' => $row['model'],
            'start_address' => $row['start_address'],
            'end_address' => $row['end_address']
        ]);

        return new Vehicle([
            'license_plate' => $row['license_plate'],
            'brand' => $row['brand'],
            'model' => $row['model'],
            'institution_id' => $institution->id,
            'start_address' => $row['start_address'],
            'end_address' => $row['end_address'],
        ]);
    }
}
