<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AmenitiesTranslation extends Model
{
    protected $table = 'amenities';
    use HasFactory;
    protected $fillable = [
        'user_id',
        'amenities_id',
        'name',
        'status',
    ];
}
