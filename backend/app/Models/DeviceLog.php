<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DeviceLog extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'device_id',
        'device_type',
        'fcm_token',
        'status'
    ];
}
