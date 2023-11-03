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
}
