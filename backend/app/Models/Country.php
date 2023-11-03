<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    protected $table = 'countries';
    use HasFactory;
    protected $fillable = [
        'user_id',
        'name',
        'slug',
        'priority',
        'seo_title',
        'seo_description',
        'seo_cover_image',
        'status',
    ];


    public function deleteCoverImage()
    {
       Storage::delete($this->seo_cover_image);
    }
}
