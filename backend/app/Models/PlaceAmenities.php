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
}
