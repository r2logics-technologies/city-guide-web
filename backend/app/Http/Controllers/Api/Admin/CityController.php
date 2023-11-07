<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\CityResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\City;


class CityController extends Controller
{
    public function getData()
    {
        $cities = City::allowed()->get();
        if ($cities && count($cities) > 0) {
            return response([
                'status' => 'success',
                'message' => '',
                'status_code' => 200,
                'cities' => CityResource::collection($cities),
            ]);
        }
        return response([
            'status' => 'warning',
            'status_code' => 500,
            'message' => 'No cities found.',
            'cities' => null,
        ]);
    }

    public function submitData(Request $request)
    {
        if (!$request->edited && $request->edited == null) {
            $auth = Auth::user()->id;
            $request['user_id'] = $auth;
            $request['slug'] = Str::slug($request->name);
            $data = $request->all();

            $find_city = City::where('name', $request->name)->first();
            if ($find_city) {
                return response([
                    'status' => 'error',
                    'message' => 'This city already exists',
                ]);
            }

            if ($request->hasFile('thumb')) {
                $image = $request->thumb->store('images/city/thumb');
                $data['thumb'] = $image;
            }

            if ($request->hasFile('banner')) {
                $image = $request->banner->store('images/city/banner');
                $data['banner'] = $image;
            }

            $create = City::create($data);
            return response(
                [
                    'status' => 'success',
                    'city' => new CityResource($create),
                    'status_code' => 200,
                    'message' => 'Successfully added...'
                ],
                200
            );
        } else {
            $city = City::find($request->edited);
            $auth = Auth::user()->id;
            $request['user_id'] = $auth;
            $request['slug'] = Str::slug($request->name);
            $data = $request->all();

            $find_city = City::where('name', $request->name)->first();
            if ($find_city) {
                return response([
                    'status' => 'error',
                    'message' => 'This city already exists',
                ]);
            }

            if ($request->hasFile('thumb')) {
                $image = $request->thumb->store('images/city/thumb');
                $data['thumb'] = $image;
                if ($city->thumb) {
                    $city->deleteThumb();
                }
            } else {
                $data['thumb'] = $city->thumb;
            }

            if ($request->hasFile('banner')) {
                $image = $request->banner->store('images/city/banner');
                $data['banner'] = $image;
                if ($city->banner) {
                    $city->deleteBanner();
                }
            } else {
                $data['banner'] = $city->banner;
            }

            $update = $city->update($data);
            if ($update) {
                $update = City::find($request->edited);
                return response(
                    [
                        'status' => 'success',
                        'city' => new CityResource($update),
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
            'city' => null,
        ], 500);
    }

    public function changeStatusData(Request $request, City $city)
    {
        $message = "";
        if ($request->status == 'deleted') {
            $message = "Deleted";
        } else if ($request->status == 'activated') {
            $message = "Activated";
        } else {
            $message = "Deactivated";
        }
        $updated =  $city->update(['status' => $request->status]);

        if ($updated) {
            $city =  City::find($city->id);
            return response(['status' => 'success', 'message' => $message, 'city' => new CityResource($city)], 200);
        }

        return response([
            'status' => 'warning',
            'status_code' => 500,
            'message' => 'something want wrong. unable to ' . $message,

        ]);
    }
}
