<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CityTranslation extends Model
{
    protected $table = 'city_translations';
    use HasFactory;
    protected $fillable = [
        'user_id',
        'city_id',
        'locale',
        'name',
        'intro',
        'description',
        'status',
    ];
}
