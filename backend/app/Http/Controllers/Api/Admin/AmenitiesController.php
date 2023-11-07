<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\AmenitiesResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Amenities;

class AmenitiesController extends Controller
{
    public function getData()
    {
        $amenities = Amenities::allowed()->get();
        if ($amenities && count($amenities) > 0) {
            return response([
                'status' => 'success',
                'message' => '',
                'status_code' => 200,
                'amenities' => AmenitiesResource::collection($amenities),
            ]);
        }
        return response([
            'status' => 'warning',
            'status_code' => 500,
            'message' => 'No amenities found.',
            'amenities' => null,
        ]);
    }

    public function submitData(Request $request)
    {
        if (!$request->edited && $request->edited == null) {
            $auth = Auth::user()->id;
            $request['user_id'] = $auth;
            $data = $request->all();

            $find_amenities = Amenities::where('name', $request->name)->first();
            if ($find_amenities) {
                return response([
                    'status' => 'error',
                    'message' => 'This amenities already exists',
                ]);
            }

            if ($request->hasFile('icon')) {
                $image = $request->icon->store('images/amenities/icon');
                $data['icon'] = $image;
            }

            $create = Amenities::create($data);
            return response(
                [
                    'status' => 'success',
                    'amenities' => new AmenitiesResource($create),
                    'status_code' => 200,
                    'message' => 'Successfully added...'
                ],
                200
            );
        } else {
            $amenities = Amenities::find($request->edited);
            $auth = Auth::user()->id;
            $request['user_id'] = $auth;
            $data = $request->all();

            if ($request->hasFile('icon')) {
                $image = $request->icon->store('images/amenities/icon');
                $data['icon'] = $image;
                if ($amenities->icon) {
                    $amenities->deleteIcon();
                }
            } else {
                $data['icon'] = $amenities->icon;
            }

            $update = $amenities->update($data);
            if ($update) {
                $update = Amenities::find($request->edited);
                return response(
                    [
                        'status' => 'success',
                        'amenities' => new AmenitiesResource($update),
                        'status_code' => 200,
                        'message' => 'Successfully updated...'
                    ],
                    200
                );
            }
        }

        return response([
            'status' => 'warning',
            'status_code' => 500,
            'message' => 'something went wrong...',
            'amenities' => null,
        ], 500);
    }

    public function changeStatusData(Request $request, Amenities $amenities)
    {
        $message = "";
        if ($request->status == 'deleted') {
            $message = "Deleted";
        } else if ($request->status == 'activated') {
            $message = "Activated";
        } else {
            $message = "Deactivated";
        }
        $updated =  $amenities->update(['status' => $request->status]);

        if ($updated) {
            $amenities =  Amenities::find($amenities->id);
            return response(['status' => 'success', 'message' => $message, 'amenities' => new AmenitiesResource($amenities)], 200);
        }

        return response([
            'status' => 'warning',
            'status_code' => 500,
            'message' => 'something want wrong. unable to ' . $message,

        ]);
    }
}
