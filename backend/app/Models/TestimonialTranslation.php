<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TestimonialTranslation extends Model
{
    protected $table = 'testimonial_translations';
    use HasFactory;
    protected $fillable = [
        'user_id',
        'testimonial_id',
        'name',
        'job_title',
        'content',
        'status',
    ];
}
