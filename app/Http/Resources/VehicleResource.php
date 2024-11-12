<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VehicleResource extends JsonResource
{

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'license_plate' => $this->license_plate,
            'brand' => $this->brand,
            'model' => $this->model,
            'start_address' => $this->start_address,
            'end_address' => $this->end_address,


            'institution' => $this->institution ? new InstitutionResource($this->institution) : null,

            'geocode' => $this->geocode ? new GeocodeResource($this->geocode) : null,


            'created_at' => $this->created_at ? $this->created_at->toDateTimeString() : null,
            'updated_at' => $this->updated_at ? $this->updated_at->toDateTimeString() : null,

        ];
    }
}
