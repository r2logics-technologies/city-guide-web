<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    //register
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => ['required'],
            'email' => ['required', 'email', 'unique:users'],
            'password' => ['required'],
        ]);

        if ($validator->fails()) {
            return response([
                'status' => 'error',
                'validator' => $validator->errors(),
            ]);
        }

        $user = User::create([
            'name' => $request->name,
            'password' => Hash::make($request->password),
            'email' => $request->email,
            'country_code' => $request->country_code,
            'mobile' => $request->mobile,
            'facebook' => $request->facebook,
            'instagram' => $request->instagram,
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
    //Login
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if ($validator->fails()) {
            return response([
                'status' => 'error',
                'validator' => $validator->errors(),
            ]);
        }

        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $user = Auth::user();
            // Create a token with a 24 hour expiration
            $token = $user->createToken('myapptoken', ['expires' => now()->addHours(24)])->plainTextToken;
            if ($token) {
                return response([
                    'status' => 'success',
                    'token' => $token,
                    'user' => $user,
                    'message' => 'User login successfully',
                ]);
            }
        } else {
            return response([
                'status' => 'error',
                'message' => 'User Not Found! Please Check Credential.',
            ]);
        }
    }
    //Login check
    public function loginCheck()
    {
        $auth = Auth::user();
        if (!$auth) return response([
            'status' => 'unauthorized',
            'message' => 'user not available',
        ]);
        return response([
            'status' => 'success',
            'message' => 'User login successfully',
        ]);
    }
}
