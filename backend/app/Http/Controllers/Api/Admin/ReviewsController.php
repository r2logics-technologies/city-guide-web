<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\ReviewResource;
use App\Models\PlaceReview;
use Illuminate\Http\Request;

class ReviewsController extends Controller
{
    public function getData()
    {
        $reviews = PlaceReview::allowed()->get();
        if ($reviews && count($reviews) > 0) {
            return response([
                'status' => 'success',
                'message' => '',
                'status_code' => 200,
                'reviews' => ReviewResource::collection($reviews),
            ]);
        }
        return response([
            'status' => 'warning',
            'status_code' => 500,
            'message' => 'No reviews found.',
            'reviews' => null,
        ]);
    }


    public function changeStatusData(Request $request, PlaceReview $review)
    {
        $message = "";
        if ($request->status == 'deleted') {
            $message = "Deleted";
        } else if ($request->status == 'activated') {
            $message = "Activated";
        } else {
            $message = "Deactivated";
        }
        $updated =  $review->update(['status' => $request->status]);

        if ($updated) {
            $review =  PlaceReview::find($review->id);
            return response(['status' => 'success', 'message' => $message, 'review' => new ReviewResource($review)], 200);
        }

        return response([
            'status' => 'warning',
            'status_code' => 500,
            'message' => 'something want wrong. unable to ' . $message,
        ]);
    }
}
