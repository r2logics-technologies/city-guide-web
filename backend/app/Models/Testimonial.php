<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    protected $table = 'testimonials';
    use HasFactory;
    protected $fillable = [
        'user_id',
        'name',
        'job_title',
        'avatar',
        'content',
        'status',
    ];
}
