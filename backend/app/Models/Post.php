<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $table = 'posts';
    use HasFactory;
    protected $fillable = [
        'user_id',
        'category',
        'title',
        'slug',
        'content',
        'thumb',
        'type',
        'status',
    ];
}
