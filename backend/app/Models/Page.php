<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Page extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'thumb',
        'content',
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
