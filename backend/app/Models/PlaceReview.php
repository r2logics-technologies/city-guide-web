<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlaceReview extends Model
{
    protected $table = 'place_reviews';
    use HasFactory;
    protected $fillable = [
        'user_id',
        'place_id',
        'rating',
        'review',
        'status',
    ];

    public function get_customer()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }
}
