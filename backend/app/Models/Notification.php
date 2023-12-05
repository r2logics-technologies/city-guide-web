<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'description',
        'user_ids',
        'read_by',
        'status'
    ];

    public function scopeActive($query)
    {
        return $query->where('status', 'activated');
    }
    public function scopeAllowed($query)
    {
        return $query->where('status', '!=', 'deleted');
    }
}
