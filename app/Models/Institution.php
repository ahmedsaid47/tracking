<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Institution extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'parent_id'];

    /**
     * Alt kurumlar ile ilişki.
     */
    public function children()
    {
        return $this->hasMany(Institution::class, 'parent_id');
    }

    /**
     * Üst kurum ile ilişki.
     */
    public function parent()
    {
        return $this->belongsTo(Institution::class, 'parent_id');
    }

    /**
     * Kuruma bağlı araçlar ile ilişki.
     */
    public function vehicles()
    {
        return $this->hasMany(Vehicle::class);
    }
}
