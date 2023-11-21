<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlaceAmenities extends Model
{
    protected $table = 'place_amenities';
    use HasFactory;
    protected $fillable = [
        'user_id',
        'place_id',
        'amenities_id',
        'status',
    ];

    public function get_amenities()
    {
        return $this->hasOne(Amenities::class, 'id', 'amenities_id');
    }
}
