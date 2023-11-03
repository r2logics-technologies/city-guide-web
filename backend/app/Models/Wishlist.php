<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Wishlist extends Model
{
    protected $table = 'wishlists';
    use HasFactory;
    protected $fillable = [
        'user_id',
        'place_id',
        'status',
    ];
}
