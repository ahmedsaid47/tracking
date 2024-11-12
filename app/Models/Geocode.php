<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Geocode extends Model
{
    use HasFactory;

    protected $fillable = [
        'vehicle_id',
        'start_latitude',
        'start_longitude',
        'end_latitude',
        'end_longitude',
    ];

    // Vehicle ilişkisi
    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class);
    }
}
