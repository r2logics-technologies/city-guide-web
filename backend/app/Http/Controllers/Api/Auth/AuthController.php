<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\Website\AuthCustomerResource;
use App\Http\Resources\Website\BookingResource;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Wishlist;
use App\Models\Booking;
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
            if ($user->status == 'deactivated' || $user->status == 'deleted') {
                return response([
                    'status' => 'error',
                    'message' => 'Sorry this credential deactivated or deleted.',
                ]);
            }
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

    public function getProfile()
    {
        $auth = Auth::user();

        $user = User::with(['get_bookings','get_wishlists.get_place'])->withCount(['get_bookings', 'get_wishlists'])->find($auth->id);
        if ($user) {
            return response([
                'status' => 'success',
                'message' => '',
                'status_code' => 200,
                'profile' => new AuthCustomerResource($user),
                'bookings_count' => $user->get_bookings_count,
                'wishlists_count' => $user->get_wishlists_count,
            ]);
        }
        return response([
            'status' => 'warning',
            'status_code' => 500,
            'message' => 'No customer found.',
            'bookings_count' => null,
            'wishlists_count' => null,
        ]);
    }

    public function updateProfile(Request $req) {
        $user = User::find(Auth::user()->id);
        if ($user) {

            if ($req->hasFile('avatar')) {
                $avatar  = '/storage/' . $req->avatar->store('images/user');
                if ($user->avatar) {
                    $user->deleteImage();
                }
            } else {
                $avatar = $user->avatar;
            }
            $update_user = $user->update([
                'name' => $req->name !== null ? $req->name : $user->name,
                'avatar' => $avatar,
                'email' => $req->email !== null ? $req->email : $user->email,
                'mobile' => $req->mobile !== null ? $req->mobile : $user->mobile,
                'address' => $req->address !== null ? $req->address : $user->address,
                'facebook' => $req->facebook !== null ? $req->facebook : $user->facebook,
                'instagram' => $req->instagram !== null ? $req->instagram : $user->instagram
            ]);

            if ($update_user) {
                return response([
                    'status' => 'success',
                    'message' => 'Profile update successfully',
                    'status_code' => 200,
                ]);
            } else {
                return response([
                    'status' => 'warning',
                    'status_code' => 500,
                    'message' => 'something went wrong...',
                ], 500);
            }

        }
    }

    public function changePassword(Request $req) {
        if(!Hash::check($req->old_password, auth()->user()->password)){
            return response([
                'status' => 'error',
                'status_code' => 201,
                'message' => 'Old password does not match!',
            ], 201);
        }
        $user = User::find(Auth::user()->id);
        if ($user) {
            $change_password = User::whereId(auth()->user()->id)->update([
                'password' => Hash::make($req->new_password)
            ]);
            if ($change_password) {
                return response([
                    'status' => 'success',
                    'message' => 'Password change successfully',
                    'status_code' => 200,
                ]);
            } else {
                return response([
                    'status' => 'warning',
                    'status_code' => 500,
                    'message' => 'something went wrong...',
                ], 500);
            }
        }
    }

    public function wishlistRemove($id) {
        $find_wishlist = Wishlist::where('place_id', $id)->first();
        if (!$find_wishlist) {
            return response([
                'status' => 'warning',
                'status_code' => 500,
                'message' => 'No place found in wishlist.',
            ]);
        }
        $updated = $find_wishlist->update(['status' => 'deleted']);
        if ($updated) {
            return response([
                'status' => 'success',
                'message' => 'Remove place by wishlist successfully',
                'status_code' => 200,
            ]);
        } else {
            return response([
                'status' => 'warning',
                'status_code' => 500,
                'message' => 'No wishlist found.',
            ]);
        }
    }

    public function bookingDetails($id) {
        $find_booking = Booking::find($id);
        if (!$find_booking) {
            return response([
                'status' => 'warning',
                'status_code' => 500,
                'message' => 'No place found in booking.',
            ]);
        }
        return response([
            'status' => 'success',
            'booking' => new BookingResource($find_booking),
            'status_code' => 200,
        ]);
    }

    public function changeBookingStatus($id) {
        $find_booking = Booking::find($id);
        if (!$find_booking) {
            return response([
                'status' => 'warning',
                'status_code' => 500,
                'message' => 'No place found in booking.',
            ]);
        }
        $booking = $find_booking->update([
            'status' => 'deactivated'
        ]);
        if ($booking) {
            return response([
                'status' => 'success',
                'message' => 'Booking canceled successfully',
                'status_code' => 200,
            ]);
        } else {
            return response([
                'status' => 'warning',
                'status_code' => 500,
                'message' => 'No booking found.',
            ]);
        }
    }

    public function bookingRemove($id) {
        $find_booking = Booking::find($id);
        if (!$find_booking) {
            return response([
                'status' => 'warning',
                'status_code' => 500,
                'message' => 'No place found in booking.',
            ]);
        }
        $updated = $find_booking->update(['status' => 'deleted']);
        if ($updated) {
            return response([
                'status' => 'success',
                'message' => 'Remove place by booking successfully',
                'status_code' => 200,
            ]);
        } else {
            return response([
                'status' => 'warning',
                'status_code' => 500,
                'message' => 'No booking found.',
            ]);
        }
    }
}
