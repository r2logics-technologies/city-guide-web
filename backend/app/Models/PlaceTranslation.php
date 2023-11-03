<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlaceTranslation extends Model
{
    protected $table = 'place_translations';
    use HasFactory;
    protected $fillable = [
        'user_id',
        'place_id',
        'locale',
        'name',
        'description',
        'status',
    ];
}
