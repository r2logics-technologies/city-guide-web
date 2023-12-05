<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LoginLog extends Model
{
    use HasFactory;
    protected $fillable = [
        'mobile',
        'device_id',
        'device_type',
        'remark',
        'status'
    ];
}
