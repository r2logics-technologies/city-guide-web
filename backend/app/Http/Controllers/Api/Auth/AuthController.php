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
    public function register(Request $request) {
        $validator = Validator::make($request->all(),[
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

        $data = $request->all();
        $data['password'] = Hash::make($data['password']);
        $user = User::create($data);

        $token = $user->createToken('MyApp')->plainTextToken;
        if ($token) {
            return response([
                'status' => 'success',
                'token' => $token,
                'message' => 'User registered successfully',
            ]);
        }
    }

    public function login(Request $request) {
        $validator = Validator::make($request->all(),[
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
        }else {
            return response([
                'status' => 'error',
                'message' => 'something went wrong',
            ]);
        }

    }
}
