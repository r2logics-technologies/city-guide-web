<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\User;
use Validator;

class AuthController extends Controller
{
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

        $token = $user->createToken('MyApp')->plainTextToken;
        if ($token) {
            return response([
                'status' => 'success',
                'token' => $token,
                'user' => $user,
                'message' => 'User registered successfully',
            ]);
        }
    }

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
            $token = $user->createToken('MyApp')->plainTextToken;
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
                'message' => 'something went wrong',
            ]);
        }
    }
}
