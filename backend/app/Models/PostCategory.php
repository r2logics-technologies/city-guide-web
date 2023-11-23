<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PostCategory extends Model
{
    use HasFactory;
    protected $fillable = [
        'name', 'status', 'details'
    ];
    public function scopeAllowed($query)
    {
        return $query->where('status', '!=', 'deleted');
    }



}
