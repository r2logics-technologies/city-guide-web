<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    public function getData()
    {
        $users = User::allowed()->get();
        if ($users && count($users) > 0) {
            return response([
                'status' => 'success',
                'message' => '',
                'status_code' => 200,
                'users' => UserResource::collection($users),
            ]);
        }
        return response([
            'status' => 'warning',
            'status_code' => 500,
            'message' => 'No users found.',
            'users' => null,
        ]);
    }


    public function changeStatusData(Request $request, User $user)
    {
        $message = "";
        if ($request->status == 'deleted') {
            $message = "Deleted";
        } else if ($request->status == 'activated') {
            $message = "Activated";
        } else {
            $message = "Deactivated";
        }
        $updated =  $user->update(['status' => $request->status]);

        if ($updated) {
            $user =  User::find($user->id);
            return response(['status' => 'success', 'message' => $message, 'user' => new UserResource($user)], 200);
        }

        return response([
            'status' => 'warning',
            'status_code' => 500,
            'message' => 'something want wrong. unable to ' . $message,
        ]);
    }
    public function changeUserType(Request $request, User $user)
    {

        $message = 'User change to '. $request->user_type;

        $updated =  $user->update(['user_type' => $request->user_type]);

        if ($updated) {
            $user =  User::find($user->id);
            return response(['status' => 'success', 'message' => $message, 'user' => new UserResource($user)], 200);
        }

        return response([
            'status' => 'warning',
            'status_code' => 500,
            'message' => 'something want wrong. unable to ' . $message,
        ]);
    }
}
