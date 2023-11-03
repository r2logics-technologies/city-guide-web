<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlaceType extends Model
{
    protected $table = 'place_types';
    use HasFactory;
    protected $fillable = [
        'user_id',
        'category_id',
        'name',
        'status',
    ];
}
