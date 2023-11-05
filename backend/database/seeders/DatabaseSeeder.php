<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\User::create([
            'avatar' => '',
            "name" => "Admin",
            "email" => "admin@admin.com",
            "password" => Hash::make("Admin@12345"),
            "user_type" => "admin",
            'mobile' => '9876543210',
        ]);
    }
}
