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
        'details',
        'status',
    ];

    public function scopeAllowed($query)
    {
        return $query->where('status', '!=', 'deleted');
    }

    /**
     * Get the user associated with the Place
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function get_category()
    {
        return $this->hasOne(Category::class, 'id', 'category');
    }

    public function get_country()
    {
        return $this->hasOne(Country::class, 'id', 'country_id');
    }

    public function get_city()
    {
        return $this->hasOne(City::class, 'id', 'city_id');
    }

    public function get_type()
    {
        return $this->hasOne(PlaceType::class, 'id', 'place_type');
    }

    /**
     * Get all of the comments for the Place
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function place_amenities()
    {
        return $this->hasMany(PlaceAmenities::class, 'place_id', 'id');
    }

    public function place_open()
    {
        return $this->hasMany(PlaceOpen::class, 'place_id', 'id');
    }

    public function place_social()
    {
        return $this->hasMany(PlaceSocial::class, 'place_id', 'id');
    }

    public function place_reviews()
    {
        return $this->hasMany(PlaceReview::class, 'place_id', 'id')->where('status', 'activated');
    }

    public function deleteThumb()
    {
       Storage::delete($this->thumb);
    }
}
