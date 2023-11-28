<?php

namespace App\Http\Controllers\Api\Website;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\CityResource;
use App\Http\Resources\Website\PlaceResource;
use App\Http\Resources\Website\AllPlacesResource;
use App\Http\Resources\Website\SearchResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\City;
use App\Models\Place;
use App\Models\Wishlist;
use App\Models\Booking;
use App\Models\PlaceReview;
use App\Models\Category;
use App\Models\PlaceType;
use App\Models\Contact;
use App\Models\Amenities;
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
        $categories = Category::allowed()->get();
        $placetypes = PlaceType::with('get_category')->allowed()->get();
        $amenities = Amenities::allowed()->get();
        $searches = DB::table('countries')
        ->join('cities', 'cities.country_id', '=', 'countries.id')
        ->join('places', 'places.country_id', '=', 'countries.id')
        ->where('countries.name', 'like', '%'.$req->search.'%')
        ->orWhere('cities.name', 'like', '%'.$req->search.'%')
        ->orWhere('places.name', 'like', '%'.$req->search.'%')
        ->select('places.name as place_name','places.id as place_id','countries.name as country_name')
        ->get();

        if ($searches && count($searches) > 0) {
            return response([
                'status' => 'success',
                'total_place' => count($searches),
                'message' => '',
                'status_code' => 200,
                'categories' => $categories,
                'placetypes' => $placetypes,
                'amenities' => $amenities,
                'searches' => SearchResource::collection($searches),
            ]);
        }
        return response([
            'status' => 'warning',
            'status_code' => 500,
            'message' => 'No searches found.',
            'categories' => null,
            'placetypes' => null,
            'amenities' => null,
            'searches' => null,
        ]);

    }

    public function cityDetails($id)
    {
        $city = City::with('get_place.get_category')->find($id);

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
        $place = Place::with(['get_category','get_country','get_city','get_type','place_amenities','place_open','place_social'])->find($id);

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

    public function allPlaces()
    {
        $categories = Category::allowed()->get();
        $placetypes = PlaceType::with('get_category')->allowed()->get();
        $amenities = Amenities::allowed()->get();
        $places = Place::with(['get_category','get_country','get_city','get_type'])->withCount('place_reviews')->get();

        if ($places) {
            return response([
                'status' => 'success',
                'message' => '',
                'status_code' => 200,
                'total_place' => count($places),
                'categories' => $categories,
                'placetypes' => $placetypes,
                'amenities' => $amenities,
                'places' => AllPlacesResource::collection($places),
            ]);
        }
        return response([
            'status' => 'warning',
            'status_code' => 500,
            'message' => 'No place found.',
            'categories' => null,
            'placetypes' => null,
            'amenities' => null,
            'place' => null,
        ]);
    }

    public function placeDetails($id)
    {
        $place = Place::with(['get_category','get_country','get_city','get_type','place_amenities.get_amenities','place_open','place_social','place_reviews.get_customer'])->withCount('place_reviews')->find($id);

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
                'numbber_of_adult' => $req->total_adults,
                'numbber_of_children' => $req->total_childs,
                'date' => $req->booking_date,
                'time' => $req->booking_time,
                'message' => $req->message
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

    public function placeReview(Request $req, $id)
    {
        $auth = Auth::user()->id;
        $place = Place::find($id);

        $find_place = PlaceReview::where('place_id', $place->id)->where('user_id', $auth)->first();
        if ($find_place) {
            return response([
                'status' => 'warning',
                'status_code' => 500,
                'message' => 'This place already reviewed',
            ]);
        }

        if ($place) {

            $booking = PlaceReview::create([
                'user_id' => $auth,
                'place_id' => $place->id,
                'rating' => $req->rating,
                'review' => $req->review
            ]);
            if ($booking) {
                return response([
                    'status' => 'success',
                    'message' => 'Place review send successfully',
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

    public function Contact(Request $req){
        $data = $req->all();
        $contact = Contact::create($data);
        if ($contact) {
            return response([
                'status' => 'success',
                'message' => 'Message send successfully',
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
}
