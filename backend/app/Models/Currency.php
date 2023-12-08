<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Currency extends Model
{
    protected $table = 'currencies';
    use HasFactory;
    protected $fillable = [
        'user_id',
        'country_id',
        'title',
        'currency_icon',
        'price',
        'inr_price',
        'status',
    ];

    public function scopeAllowed($query)
    {
        return $query->where('status', '!=', 'deleted');
    }

    public function get_country()
    {
        return $this->hasOne(Country::class, 'id', 'country_id');
    }
}
