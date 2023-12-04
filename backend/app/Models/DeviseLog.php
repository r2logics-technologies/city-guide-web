<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DeviseLog extends Model
{
    protected $table = 'devise_logs';
    use HasFactory;
    protected $fillable = [
        'user_id',
        'device_type',
        'device_id',
        'fcm_token'
    ];
}
