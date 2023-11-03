<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $table = 'categories';
    use HasFactory;
    protected $fillable = [
        'user_id',
        'name',
        'slug',
        'priority',
        'is_feature',
        'feature_title',
        'icon_map_marker',
        'type',
        'status',
    ];
}
