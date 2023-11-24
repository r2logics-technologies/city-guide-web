<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Setting extends Model
{
    protected $table = 'settings';
    use HasFactory;
    protected $fillable = [
        'version',
        'name',
        'logo',
        'status',
        'details',
    ];
    public function deleteLogo()
    {
       Storage::delete($this->logo);
    }
}
