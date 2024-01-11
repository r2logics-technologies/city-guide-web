<?php

namespace App\Http\Controllers\Api\Mobile;

use App\Http\Controllers\Controller;
use App\Http\Resources\Mobile\CityResource;
use App\Http\Resources\Mobile\BlogsResources;
use App\Http\Resources\Mobile\PlaceResource;
use App\Http\Resources\Mobile\SearchResource;
use App\Http\Resources\Mobile\PageResource;
use Illuminate\Http\Request;
use App\Models\City;
use App\Models\Post;
use App\Models\Page;
use App\Models\Place;
use App\Models\Category;
use App\Models\Amenities;
use App\Models\PlaceType;
use DB;

class HomePageController extends Controller
{
    public function getData(Request $req)  {
        $cities = City::withCount('get_place')->allowed()->get();
        $blogs = Post::with('category')->allowed()->latest()->take(3)->get();
        if ($cities && count($cities) > 0 || $blogs && count($blogs) > 0) {
            return response([
                'status' => 'success',
                'message' => '',
                'status_code' => 200,
                'cities' => CityResource::collection($cities),
                'blogs' => BlogsResources::collection($blogs),
            ]);
        }
        return response([
            'status' => 'warning',
            'status_code' => 500,
            'message' => 'No data found.',
            'cities' => null,
            'blogs' => null,
        ]);
    }

    public function cityDetails($id)
    {
        $city = City::with('get_place.get_category')->withCount('get_place')->find($id);
        $placetypes = PlaceType::with(['all_places' => function ($query) use ($id) {
            $query->whereIn('city_id', (array)$id);
        }])->get();
        $allPlacesCount = $placetypes->pluck('all_places')->flatten()->count();

        if ($allPlacesCount === 0) {
            $placetypes = null;
        }else{
            $placetypes = PlaceTypeResource::collection($placetypes);
        }

        if ($city) {
            return response([
                'status' => 'success',
                'message' => '',
                'status_code' => 200,
                'city' => new CityResource($city),
                'placetypes' => $placetypes,
            ]);
        }
        return response([
            'status' => 'warning',
            'status_code' => 500,
            'message' => 'No city found.',
            'city' => null,
            'placetypes' => null,
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

    public function allPlaces(Request $req)  {
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
            'message' => 'No data found.',
            'cities' => null,
        ]);
    }

    public function searchData(Request $req){
        // $categories = Category::allowed()->get();
        // $placetypes = PlaceType::with('get_category')->allowed()->get();
        // $amenities = Amenities::allowed()->get();
        $places = DB::table('places')
        ->join('countries', 'places.country_id', '=', 'countries.id')
        ->where('places.name', 'like', '%'.$req->search.'%')
        ->select('places.name as place_name', 'places.id as place_id', 'countries.name as country_name');

        $cities = DB::table('cities')
            ->join('countries', 'cities.country_id', '=', 'countries.id')
            ->where('cities.name', 'like', '%'.$req->search.'%')
            ->select('cities.name as place_name', 'cities.id as place_id', 'countries.name as country_name');

        $countries = DB::table('countries')
            ->where('countries.name', 'like', '%'.$req->search.'%')
            ->select('countries.name as place_name', 'countries.id as place_id', 'countries.name as country_name');

        $searches = $places->union($cities)->union($countries)->get();

        if ($searches && count($searches) > 0) {
            return response([
                'status' => 'success',
                'total_place' => count($searches),
                'message' => '',
                'status_code' => 200,
                // 'categories' => $categories,
                // 'placetypes' => $placetypes,
                // 'amenities' => $amenities,
                'searches' => SearchResource::collection($searches),
            ]);
        }
        return response([
            'status' => 'warning',
            'status_code' => 500,
            'message' => 'No searches found.',
            // 'categories' => null,
            // 'placetypes' => null,
            // 'amenities' => null,
            'searches' => null,
        ]);

    }

    public function pageData() {
        $pages = Page::allowed()->get();
        if ($pages && count($pages) > 0) {
            return response([
                'status' => 'success',
                'message' => '',
                'status_code' => 200,
                'pages' => PageResource::collection($pages),
            ]);
        }
        return response([
            'status' => 'warning',
            'status_code' => 500,
            'message' => 'No data found.',
            'pages' => null,
        ]);
    }
}
