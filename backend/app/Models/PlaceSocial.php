<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlaceSocial extends Model
{
    protected $table = 'place_socials';
    use HasFactory;
    protected $fillable = [
        'user_id',
        'place_id',
        'social_type',
        'social_url',
        'status',
    ];
}
