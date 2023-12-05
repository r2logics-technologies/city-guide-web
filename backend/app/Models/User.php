<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'avatar',
        'name',
        'password',
        'email',
        'email_verified_at',
        'country_code',
        'mobile',
        'facebook',
        'instagram',
        'address',
        'user_type',
        'fcm_topics',
        'status',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
    public function scopeAllowed($query)
    {
        return $query->where('status', '!=', 'deleted');
    }
    public function deleteImage()
    {
       Storage::delete($this->avatar);
    }

    public function get_bookings()
    {
        return $this->hasMany(Booking::class, 'user_id', 'id')->where('status', '!=', 'deleted');
    }

    public function get_wishlists()
    {
        return $this->hasMany(Wishlist::class, 'user_id', 'id')->where('status', '!=', 'deleted');
    }

    public function scopeInactive($query)
    {
        return $query->where('status', '!=', 'activated');
    }

    public function scopeRole($query, $type)
    {
        return $query->where('user_type', $type);
    }

    public function deviceLogs()
    {
        return $this->hasMany(DeviceLog::class);
    }
    public function scopeCustomers($query)
    {
        return $query->where('user_type', '=', 'customer');
    }



    public function scopeActive($query)
    {
        return $query->where('status', 'activated');
    }

}
