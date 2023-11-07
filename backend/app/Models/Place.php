<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\Model;

class Place extends Model
{
    protected $table = 'places';
    use HasFactory;
    protected $fillable = [
        'user_id',
        'country_id',
        'city_id',
        'category',
        'place_type',
        'name',
        'slug',
        'description',
        'price_range',
        'address',
        'lat',
        'lng',
        'email',
        'phone_number',
        'website',
        'thumb',
        'gallery',
        'video',
        'booking_type',
        'link_bookingcom',
        'status',
    ];

    public function scopeAllowed($query)
    {
        return $query->where('status', '!=', 'deleted');
    }

    public function deleteThumb()
    {
       Storage::delete($this->thumb);
    }
}
