<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CategoryTranslation extends Model
{
    protected $table = 'category_translations';
    use HasFactory;
    protected $fillable = [
        'user_id',
        'category_id',
        'locale',
        'name',
        'status',
    ];
}
