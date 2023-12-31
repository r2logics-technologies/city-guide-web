<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $table = 'bookings';
    use HasFactory;
    protected $fillable = [
        'user_id',
        'place_id',
        'numbber_of_adult',
        'numbber_of_children',
        'date',
        'time',
        'name',
        'email',
        'phone_number',
        'message',
        'type',
        'status',
    ];


    public function get_place()
    {
        return $this->hasOne(Place::class, 'id', 'place_id');
    }
    public function user()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }

}
