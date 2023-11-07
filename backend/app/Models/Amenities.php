<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\Model;

class Amenities extends Model
{
    protected $table = 'amenities';
    use HasFactory;
    protected $fillable = [
        'user_id',
        'name',
        'icon',
        'status',
    ];

    public function scopeAllowed($query)
    {
        return $query->where('status', '!=', 'deleted');
    }

    public function deleteIcon()
    {
       Storage::delete($this->icon);
    }
}
