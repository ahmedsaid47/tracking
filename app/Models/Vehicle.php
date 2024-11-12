<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    use HasFactory;

    protected $fillable = [
        'license_plate',
        'institution_id',
        'brand',
        'model',
        'start_address',
        'end_address',
    ];

    // Institution ilişkisi
    public function institution()
    {
        return $this->belongsTo(Institution::class);
    }

    // Geocode ilişkisi
    public function geocode()
    {
        return $this->hasOne(Geocode::class);
    }
}
