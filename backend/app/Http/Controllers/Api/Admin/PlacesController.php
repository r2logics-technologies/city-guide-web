<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\PlaceResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Place;
use App\Models\PlaceAmenities;
use App\Models\PlaceOpen;
use App\Models\PlaceSocial;

class PlacesController extends Controller
{
    public function getData()
    {
        $places = Place::allowed()->get();
        if ($places && count($places) > 0) {
            return response([
                'status' => 'success',
                'message' => '',
                'status_code' => 200,
                'places' => PlaceResource::collection($places),
            ]);
        }
        return response([
            'status' => 'warning',
            'status_code' => 500,
            'message' => 'No places found.',
            'places' => null,
        ]);
    }
    public function getSpecificData($id)
    {
        $place = Place::find($id);
        if ($place) {
            return response([
                'status' => 'success',
                'message' => '',
                'status_code' => 200,
                'place' => new PlaceResource($place),
            ]);
        }

        return response([
            'status' => 'warning',
            'status_code' => 500,
            'message' => 'No place found.',
            'amenities' => null,
        ]);
    }

    public function submitData(Request $request)
    {
        if (!$request->edited && $request->edited == null) {
            $auth = Auth::user()->id;
            $request['user_id'] = $auth;
            $request['slug'] = Str::slug($request->name);
            $data = $request->all();

            $find_place = Place::where('name', $request->name)->first();
            if ($find_place) {
                return response([
                    'status' => 'error',
                    'message' => 'This place already exists',
                ]);
            }

            if ($request->hasFile('thumb')) {
                $data['thumb']  = '/storage/' . $request->thumb->store('images/place/thumb');
            }

            $create = Place::create($data);
            if ($create) {
                if (is_string($request->amenities)) {
                    $amenitiesArray = json_decode($request->amenities, true);
                    if (is_array($amenitiesArray)) {
                        foreach ($amenitiesArray as $key => $value) {
                            if ($value != null) {
                                PlaceAmenities::create([
                                    'user_id' => $auth,
                                    'place_id' => $create->id,
                                    'amenities_id' => $value['id'],
                                ]);
                            }
                        }
                    }
                } else {
                    foreach ($request->amenities as $key => $value) {
                        if ($value != null) {
                            PlaceAmenities::create([
                                'user_id' => $auth,
                                'place_id' => $create->id,
                                'amenities_id' => $value['id'],
                            ]);
                        }
                    }
                }
                if (is_string($request->placeopen)) {
                    $placeopenArray = json_decode($request->placeopen, true);
                    if (is_array($placeopenArray)) {
                        foreach ($placeopenArray as $key => $open_value) {
                            if ($open_value != null) {
                                PlaceOpen::create([
                                    'user_id' => $auth,
                                    'place_id' => $create->id,
                                    'day' => $open_value['day'],
                                    'time' => $open_value['time'],
                                ]);
                            }
                        }
                    }
                } else {
                    foreach ($request->placeopen as $key => $open_value) {
                        if ($open_value != null) {
                            PlaceOpen::create([
                                'user_id' => $auth,
                                'place_id' => $create->id,
                                'day' => $open_value['day'],
                                'time' => $open_value['time'],
                            ]);
                        }
                    }
                }
                if (is_string($request->placesocial)) {
                    $placesocialArray = json_decode($request->placesocial, true);
                    if (is_array($placesocialArray)) {
                        foreach ($placesocialArray as $key => $place_value) {
                            if ($place_value != null) {
                                PlaceSocial::create([
                                    'user_id' => $auth,
                                    'place_id' => $create->id,
                                    'social_type' => $place_value['social_type'],
                                    'social_url' => $place_value['social_url'],
                                ]);
                            }
                        }
                    }
                } else {
                    foreach ($request->placesocial as $key => $place_value) {
                        if ($place_value != null) {
                            PlaceSocial::create([
                                'user_id' => $auth,
                                'place_id' => $create->id,
                                'social_type' => $place_value['social_type'],
                                'social_url' => $place_value['social_url'],
                            ]);
                        }
                    }
                }
                return response(
                    [
                        'status' => 'success',
                        'place' => new PlaceResource($create),
                        'status_code' => 200,
                        'message' => 'Successfully added...'
                    ],
                    200
                );
            }
        } else {
            $place = Place::find($request->edited);
            PlaceAmenities::where('place_id', $place->id)->delete();
            PlaceOpen::where('place_id', $place->id)->delete();
            PlaceSocial::where('place_id', $place->id)->delete();
            $auth = Auth::user()->id;
            $request['user_id'] = $auth;
            $request['slug'] = Str::slug($request->name);
            $data = $request->all();
            $find_place = Place::where('name', $request->name)->where('id', '!=', $place->id)->first();
            if ($find_place) {
                return response([
                    'status' => 'error',
                    'message' => 'This place already exists',
                ]);
            }
            if ($request->hasFile('thumb')) {
                $data['thumb']  = '/storage/' . $request->thumb->store('images/place/thumb');

                if ($place->thumb) {
                    $place->deleteThumb();
                }
            } else {
                $data['thumb'] = $place->thumb;
            }

            $update = $place->update($data);
            if ($update) {
                $update = Place::find($request->edited);
                if (is_string($request->amenities)) {
                    $amenitiesArray = json_decode($request->amenities, true);
                    if (is_array($amenitiesArray)) {
                        foreach ($amenitiesArray as $key => $value) {
                            if ($value != null) {
                                PlaceAmenities::create([
                                    'user_id' => $auth,
                                    'place_id' => $place->id,
                                    'amenities_id' => $value['id'],
                                ]);
                            }
                        }
                    }
                } else {
                    foreach (json_decode($request->amenities, true) as $key => $value) {
                        if ($value != null) {
                            PlaceAmenities::create([
                                'user_id' => $auth,
                                'place_id' => $place->id,
                                'amenities_id' => $value['id'],
                            ]);
                        }
                    }
                }
                if (is_string($request->placeopen)) {
                    $placeopenArray = json_decode($request->placeopen, true);
                    if (is_array($placeopenArray)) {
                        foreach ($placeopenArray as $key => $open_value) {
                            if ($open_value != null) {
                                PlaceOpen::create([
                                    'user_id' => $auth,
                                    'place_id' => $place->id,
                                    'day' => $open_value['day'],
                                    'time' => $open_value['time'],
                                ]);
                            }
                        }
                    }
                } else {
                    foreach ($request->placeopen as $key => $open_value) {
                        if ($open_value != null) {
                            PlaceOpen::create([
                                'user_id' => $auth,
                                'place_id' => $place->id,
                                'day' => $open_value['day'],
                                'time' => $open_value['time'],
                            ]);
                        }
                    }
                }
                if (is_string($request->placesocial)) {
                    $placesocialArray = json_decode($request->placesocial, true);
                    if (is_array($placesocialArray)) {
                        foreach ($placesocialArray as $key => $place_value) {
                            if ($place_value != null) {
                                PlaceSocial::create([
                                    'user_id' => $auth,
                                    'place_id' => $place->id,
                                    'social_type' => $place_value['social_type'],
                                    'social_url' => $place_value['social_url'],
                                ]);
                            }
                        }
                    }
                } else {
                    foreach ($request->placesocial as $key => $place_value) {
                        if ($place_value != null) {
                            PlaceSocial::create([
                                'user_id' => $auth,
                                'place_id' => $place->id,
                                'social_type' => $place_value['social_type'],
                                'social_url' => $place_value['social_url'],
                            ]);
                        }
                    }
                }
                return response(
                    [
                        'status' => 'success',
                        'place' => new PlaceResource($update),
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

    public function changeStatusData(Request $request, Place $place)
    {
        $message = "";
        if ($request->status == 'deleted') {
            $message = "Deleted";
        } else if ($request->status == 'activated') {
            $message = "Activated";
        } else {
            $message = "Deactivated";
        }
        $updated =  $place->update(['status' => $request->status]);

        if ($updated) {
            $place =  Place::find($place->id);
            return response(['status' => 'success', 'message' => $message, 'place' => new PlaceResource($place)], 200);
        }

        return response([
            'status' => 'warning',
            'status_code' => 500,
            'message' => 'something want wrong. unable to ' . $message,

        ]);
    }
}
