<?php

namespace App\Http\Controllers\Api\Website;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\CityResource;
use App\Http\Resources\Admin\PlaceResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\City;
use App\Models\Place;
use App\Models\Wishlist;
use App\Models\Booking;
use DB;

class HomeController extends Controller
{
    public function getData()
    {
        $cities = City::withCount('get_place')->allowed()->get();
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

    public function searchData(Request $req){
        $searches = DB::table('countries')
        ->join('cities', 'cities.country_id', '=', 'countries.id')
        ->join('places', 'places.country_id', '=', 'countries.id')
        ->where('countries.name', 'like', '%'.$req->search.'%')
        ->orWhere('cities.name', 'like', '%'.$req->search.'%')
        ->orWhere('places.name', 'like', '%'.$req->search.'%')
        ->select('places.name as place_name','countries.name as country_name')
        ->get();

        if ($searches && count($searches) > 0) {
            return response([
                'status' => 'success',
                'message' => '',
                'status_code' => 200,
                'searches' => $searches,
            ]);
        }
        return response([
            'status' => 'warning',
            'status_code' => 500,
            'message' => 'No searches found.',
            'searches' => null,
        ]);

    }

    public function cityDetails($id)
    {
        $city = City::with('get_place')->find($id);

        if ($city) {
            return response([
                'status' => 'success',
                'message' => '',
                'status_code' => 200,
                'city' => new CityResource($city),
            ]);
        }
        return response([
            'status' => 'warning',
            'status_code' => 500,
            'message' => 'No city found.',
            'city' => null,
        ]);
    }

    public function wishlist($id)
    {
        $auth = Auth::user()->id;
        $place = Place::find($id);

        $find_wishlist = Wishlist::where('place_id', $place->id)->where('user_id', $auth)->first();
        if ($find_wishlist) {
            return response([
                'status' => 'warning',
                'status_code' => 500,
                'message' => 'This place already wishlisted',
                'place' => null,
            ]);
        }
        if ($place) {
            $wishlist = Wishlist::create([
                'user_id' => $auth,
                'place_id' => $place->id
            ]);
            if ($wishlist) {
                return response([
                    'status' => 'success',
                    'message' => 'wishlist added successfully',
                    'status_code' => 200,
                    'place' => new PlaceResource($place),
                ]);
            }else{
                return response([
                    'status' => 'warning',
                    'status_code' => 500,
                    'message' => 'something went wrong...',
                    'place' => null,
                ], 500);
            }
        }
        return response([
            'status' => 'warning',
            'status_code' => 500,
            'message' => 'No place found.',
            'place' => null,
        ]);
    }

    public function placeDetails($id)
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
            'place' => null,
        ]);
    }

    public function placeBook(Request $req, $id)
    {
        $auth = Auth::user()->id;
        $place = Place::find($id);

        $find_booking = Booking::where('place_id', $place->id)->where('user_id', $auth)->first();
        if ($find_booking) {
            return response([
                'status' => 'warning',
                'status_code' => 500,
                'message' => 'This place already booked',
            ]);
        }

        if ($place) {

            $booking = Booking::create([
                'user_id' => $auth,
                'place_id' => $place->id,
                'numbber_of_adult' => $req->numbber_of_adult,
                'numbber_of_children' => $req->numbber_of_children,
                'date' => $req->date,
                'time' => $req->time
            ]);
            if ($booking) {
                return response([
                    'status' => 'success',
                    'message' => 'Place booked successfully',
                    'status_code' => 200,
                ]);
            }else{
                return response([
                    'status' => 'warning',
                    'status_code' => 500,
                    'message' => 'something went wrong...',
                ]);
            }
        }
        return response([
            'status' => 'warning',
            'status_code' => 500,
            'message' => 'Not found any place',
        ]);
    }
}
