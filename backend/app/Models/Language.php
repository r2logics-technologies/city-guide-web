<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Language extends Model
{
    protected $table = 'languages';
    use HasFactory;
    protected $fillable = [
        'user_id',
        'name',
        'native_name',
        'code',
        'is_default',
        'is_active',
        'status',
    ];
}
