<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlaceOpen extends Model
{
    protected $table = 'place_opens';
    use HasFactory;
    protected $fillable = [
        'user_id',
        'place_id',
        'day',
        'time',
        'status',
    ];
}
