<?php

namespace App\Http\Controllers\Api\Mobile;

use App\Http\Controllers\Controller;
use App\Http\Resources\Mobile\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class CustomerController extends Controller
{

    public function profileUpdate(Request $request)
    {
        Log::info('Registration  Log:::' . json_encode($request->all()));
        $auth = Auth::user();
        if (!$auth) return response([
            'status' => 'unauthorized',
            'message' => 'user not available',
        ]);

        $user = User::where('id', $auth->id)->first();
        $avatar = $user->avatar;
        // Avatar Update
        if ($request->has('avatar') && $request->avatar != null && $request->avatar != "") {
            if ($user->avatar != null && $user->avatar != "") {
                Storage::delete($user->avatar);
            }
            $avatar = '/storage/' . $request->avatar->store('users/avatar');
        }

        $updated = $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'avatar' => $avatar,
            'facebook' => $request->facebook,
            'instagram' => $request->instagram,
        ]);


        $authUser = User::find($auth->id);
        if ($updated) {
            return response([
                'status' => 'success',
                'message' => 'success',
                'user' => new UserResource($authUser),
            ]);
        }

        return response([
            'status' => 'error',
            'message' => 'error',
            'user' => null,
        ]);
    }
}
