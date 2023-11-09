<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    protected $table = 'cities';
    use HasFactory;
    protected $fillable = [
        'user_id',
        'country_id',
        'name',
        'slug',
        'intro',
        'description',
        'thumb',
        'banner',
        'best_time_to_visit',
        'currency',
        'language',
        'lat',
        'lng',
        'priority',
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

    public function deleteBanner()
    {
        Storage::delete($this->banner);
    }

    public function country()
    {
        return $this->belongsTo(Country::class);
    }

    public function get_place()
    {
        return $this->hasMany(Place::class, 'city_id', 'id');
    }
}
