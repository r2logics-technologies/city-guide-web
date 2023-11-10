<?php

namespace App\Http\Controllers\Api\Website;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\Wishlist;
use App\Models\Booking;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function getProfile() {
        $auth = Auth::user();
        $wishlists = Wishlist::with('get_place')->where('user_id', $auth->id)->get();
        $bookings = Booking::with('get_place')->where('user_id', $auth->id)->get();
        if ($auth) {
            return response([
                'status' => 'success',
                'message' => '',
                'status_code' => 200,
                'user' => $auth,
                'wishlists' => $wishlists,
                'bookings' => $bookings,
            ]);
        } else {
            return response([
                'status' => 'warning',
                'status_code' => 500,
                'message' => 'No user found.',
                'user' => null,
                'wishlists' => null,
                'bookings' => null,
            ]);
        }

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
                'facebook' => $req->facebook !== null ? $req->facebook : $user->facebook,
                'instagram' => $req->instagram !== null ? $req->instagram : $user->instagram
            ]);

            if ($update_user) {
                return response([
                    'status' => 'success',
                    'message' => 'User profile update successfully',
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
        $user = User::find(Auth::user()->id);
        if ($user) {
            if(!Hash::check($req->old_password, auth()->user()->password)){
                return response([
                    'status' => 'warning',
                    'status_code' => 500,
                    'message' => 'Old password does not match!',
                ], 500);
            }else {
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
    }

    public function wishlistRemove($id) {
        $find_wishlist = Wishlist::find($id);
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
            'booking' => $find_booking,
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
