<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Country;

class CountryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $countries = Country::where('status', 1)->get();
        if (count($countries)>0) {
            return response([
                'status' => 'success',
                'message' => 'countries data is',
                'countries' => $countries,
            ]);
        } else {
            return response([
                'status' => 'success',
                'message' => 'countries not found',
                'countries' => null,
            ]);
        }

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
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

        if ($request->hasFile('seo_cover_image')) {
            $image = $request->seo_cover_image->store('images/seo_cover_image');
            $data['seo_cover_image'] = $image;
        }

        $country = Country::create($data);

        if ($country) {
            return response([
                'status' => 'success',
                'message' => 'Country Created successfully',
            ]);
        }else {
            return response([
                'status' => 'error',
                'message' => 'something went wrong',
            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $country = Country::find($id);
        if ($country != null) {
            return response([
                'status' => 'success',
                'message' => 'country data is',
                'country' => $country,
            ]);
        } else {
            return response([
                'status' => 'success',
                'message' => 'country not found',
                'country' => null,
            ]);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $country = Country::find($id);
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

        if ($request->hasFile('seo_cover_image')) {
            $image = $request->seo_cover_image->store('images/seo_cover_image');
            $data['seo_cover_image'] = $image;
            if ($country->seo_cover_image) {
                $country->deleteCoverImage();
            }
        }else{
            $data['seo_cover_image'] = $country->seo_cover_image;
        }

        $country_update = $country->update($data);

        if ($country_update) {
            return response([
                'status' => 'success',
                'message' => 'Country updated successfully',
            ]);
        }else {
            return response([
                'status' => 'error',
                'message' => 'something went wrong',
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
       $delete_country = Country::find($id)->delete();
        if ($delete_country) {
            return response([
                'status' => 'success',
                'message' => 'Country deleted successfully',
            ]);
        }else {
            return response([
                'status' => 'error',
                'message' => 'something went wrong',
            ]);
        }
    }
}
