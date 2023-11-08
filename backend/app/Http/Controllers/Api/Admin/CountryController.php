<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\CountryResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Country;

class CountryController extends Controller
{
    public function getData()
    {
        $countries = Country::allowed()->get();
        if ($countries && count($countries) > 0) {
            return response([
                'status' => 'success',
                'message' => '',
                'status_code' => 200,
                'countries' => CountryResource::collection($countries),
            ]);
        }
        return response([
            'status' => 'warning',
            'status_code' => 500,
            'message' => 'No countries found.',
            'countries' => null,
        ]);
    }

    public function submitData(Request $request)
    {
        if (!$request->edited && $request->edited == null) {
            $auth = Auth::user()->id;
            $request['user_id'] = $auth;
            $request['slug'] = Str::slug($request->name);
            $data = $request->all();
            $find_country = Country::where('name', $request->name)->first();
            if ($find_country) {
                return response([
                    'status' => 'error',
                    'message' => 'This country already exists',
                ]);
            }

            if ($request->hasFile('seo_cover_image') && $request->seo_cover_image != null && $request->seo_cover_image != "") {
                $data['seo_cover_image'] = '/storage/' . $request->seo_cover_image->store('images/seo_cover_image');
            }
            $create = Country::create($data);
            return response(
                [
                    'status' => 'success',
                    'country' => new CountryResource($create),
                    'status_code' => 200,
                    'message' => 'Successfully added...'
                ],
                200
            );
        } else {
            $country = Country::find($request->edited);
            $auth = Auth::user()->id;
            $request['user_id'] = $auth;
            $request['slug'] = Str::slug($request->name);
            $data = $request->all();

            $find_country = Country::where('name', $request->name)
                ->where('id', '!=', $country->id)
                ->first();
            if ($find_country) {
                return response([
                    'status' => 'error',
                    'message' => 'This country already exists',
                ]);
            }

            if ($request->hasFile('seo_cover_image')) {
                if ($request->hasFile('seo_cover_image') && $request->seo_cover_image != null && $request->seo_cover_image != "") {
                    $data['seo_cover_image'] = '/storage/' . $request->seo_cover_image->store('images/seo_cover_image');
                }
                if ($country->seo_cover_image) {
                    $country->deleteCoverImage();
                }
            } else {
                $data['seo_cover_image'] = $country->seo_cover_image;
            }

            $update = $country->update($data);
            if ($update) {
                $update = Country::find($request->edited);
                return response(
                    [
                        'status' => 'success',
                        'country' => new CountryResource($update),
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
            'country' => null,
        ], 500);
    }

    public function changeStatusData(Request $request, Country $country)
    {
        $message = "";
        if ($request->status == 'deleted') {
            $message = "Deleted";
        } else if ($request->status == 'activated') {
            $message = "Activated";
        } else {
            $message = "Deactivated";
        }
        $updated =  $country->update(['status' => $request->status]);

        if ($updated) {
            $country =  Country::find($country->id);
            return response(['status' => 'success', 'message' => $message, 'country' => new CountryResource($country)], 200);
        }

        return response([
            'status' => 'warning',
            'status_code' => 500,
            'message' => 'something want wrong. unable to ' . $message,

        ]);
    }
}
