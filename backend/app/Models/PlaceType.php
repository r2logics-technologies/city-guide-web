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

    public function scopeAllowed($query)
    {
        return $query->where('status', '!=', 'deleted');
    }

    public function get_category()
    {
        return $this->hasOne(Category::class, 'id', 'category_id');
    }
}
