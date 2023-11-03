<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
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
}
