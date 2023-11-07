<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\PlaceTypeResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\PlaceType;

class PlaceTypeController extends Controller
{
    public function getData()
    {
        $placetypes = PlaceType::with('get_category')->allowed()->get();
        if ($placetypes && count($placetypes) > 0) {
            return response([
                'status' => 'success',
                'message' => '',
                'status_code' => 200,
                'placetypes' => PlaceTypeResource::collection($placetypes),
            ]);
        }
        return response([
            'status' => 'warning',
            'status_code' => 500,
            'message' => 'No place types found.',
            'placetypes' => null,
        ]);
    }

    public function submitData(Request $request)
    {
        if (!$request->edited && $request->edited == null) {
            $auth = Auth::user()->id;
            $request['user_id'] = $auth;
            $data = $request->all();

            $find_place = PlaceType::where('name', $request->name)->first();
            if ($find_place) {
                return response([
                    'status' => 'error',
                    'message' => 'This place type already exists',
                ]);
            }

            $create = PlaceType::create($data);
            return response(
                [
                    'status' => 'success',
                    'placetype' => new PlaceTypeResource($create),
                    'status_code' => 200,
                    'message' => 'Successfully added...'
                ],
                200
            );
        } else {
            $placetype = PlaceType::find($request->edited);
            $auth = Auth::user()->id;
            $request['user_id'] = $auth;
            $data = $request->all();

            $update = $placetype->update($data);
            if ($update) {
                $update = PlaceType::find($request->edited);
                return response(
                    [
                        'status' => 'success',
                        'placetype' => new PlaceTypeResource($update),
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
            'placetype' => null,
        ], 500);
    }

    public function changeStatusData(Request $request, PlaceType $placetype)
    {
        $message = "";
        if ($request->status == 'deleted') {
            $message = "Deleted";
        } else if ($request->status == 'activated') {
            $message = "Activated";
        } else {
            $message = "Deactivated";
        }
        $updated =  $placetype->update(['status' => $request->status]);

        if ($updated) {
            $placetype =  PlaceType::find($placetype->id);
            return response(['status' => 'success', 'message' => $message, 'placetype' => new PlaceTypeResource($placetype)], 200);
        }

        return response([
            'status' => 'warning',
            'status_code' => 500,
            'message' => 'something want wrong. unable to ' . $message,

        ]);
    }
}
