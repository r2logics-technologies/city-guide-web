<?php

namespace App\Http\Controllers\Api\Mobile;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\DeviseLog;
use App\Models\User;

class AuthUserController extends Controller
{
    //register
    public function register(Request $request)
    {

        $user = User::create([
            'name' => $request->name,
            'password' => Hash::make($request->password),
            'email' => $request->email,
            'country_code' => $request->country_code,
            'mobile' => $request->mobile
        ]);

        // Create a token with a 24-hour expiration
        $token = $user->createToken('myapptoken', ['expires' => now()->addHours(24)])->plainTextToken;
        if ($token) {
            return response([
                'status' => 'success',
                'token' => $token,
                'user' => $user,
                'message' => 'User registered successfully',
            ]);
        }
    }
}
