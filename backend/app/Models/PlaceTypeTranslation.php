<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlaceTypeTranslation extends Model
{
    protected $table = 'place_type_translations';
    use HasFactory;
    protected $fillable = [
        'user_id',
        'place_type_id',
        'locale',
        'name',
        'status',
    ];
}
