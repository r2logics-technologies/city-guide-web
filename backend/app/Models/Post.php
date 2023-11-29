<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Post extends Model
{
    protected $table = 'posts';
    use HasFactory;
    protected $fillable = [
        'user_id',
        'post_category_id',
        'title',
        'slug',
        'content',
        'thumb',
        'type',
        'status',
    ];
    public function scopeAllowed($query)
    {
        return $query->where('status', '!=', 'deleted');
    }

    public function category()
    {
        return $this->hasOne(PostCategory::class, 'id', 'post_category_id');
    }

    public function deleteThumb()
    {
       Storage::delete($this->thumb);
    }
}
