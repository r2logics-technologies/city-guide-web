<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\BookingResource;
use App\Models\Booking;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    public function getData()
    {
        $bookings = Booking::get();
        if ($bookings && count($bookings) > 0) {
            return response([
                'status' => 'success',
                'message' => '',
                'status_code' => 200,
                'bookings' => BookingResource::collection($bookings),
            ]);
        }
        return response([
            'status' => 'warning',
            'status_code' => 500,
            'message' => 'No bookings found.',
            'bookings' => null,
        ]);
    }


    public function changeStatusData(Request $request, Booking $booking)
    {
        $message = "";
        if ($request->status == 'deleted') {
            $message = "Deleted";
        } else if ($request->status == 'activated') {
            $message = "Activated";
        } else {
            $message = "Deactivated";
        }
        $updated =  $booking->update(['status' => $request->status]);

        if ($updated) {
            $booking =  Booking::find($booking->id);
            return response(['status' => 'success', 'message' => $message, 'booking' => new BookingResource($booking)], 200);
        }

        return response([
            'status' => 'warning',
            'status_code' => 500,
            'message' => 'something want wrong. unable to ' . $message,
        ]);
    }
}
