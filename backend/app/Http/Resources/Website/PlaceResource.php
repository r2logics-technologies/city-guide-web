<?php

namespace App\Http\Resources\Website;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\Wishlist;
// use App\Http\Resources\Website\AmenitiesResource;

class PlaceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $auth = request()->user('api');
        if ($auth) {
            $in_wishlist = Wishlist::where('user_id', $auth->id)->where('place_id', $this->id)->where('status', 'activated')->first();
        } else {
            $in_wishlist = null;
        }

        return [
            'id' => $this->id,
            'country' => $this->get_country->name,
            'city' => $this->get_city->name,
            'category' => $this->get_category->name,
            'place_type' => $this->get_type->name,
            'name' => $this->name,
            'thumb' => $this->thumb,
            'video' => $this->video,
            'slug' => $this->slug,
            'description' => $this->description,
            'price_range' => $this->price_range,
            'address' => $this->address,
            'lat' => $this->lat,
            'lng' => $this->lng,
            'email' => $this->email,
            'phone_number' => $this->phone_number,
            'website' => $this->website,
            'amenities' => AmenitiesResource::collection($this->place_amenities),
            'placeopens' => $this->place_open,
            'placesocials' => $this->place_social,
            'total_reviews' => $this->place_reviews_count,
            'avg_reviews' => round($this->place_reviews->avg('rating'), 1),
            'reviews' => ReviewResource::collection($this->place_reviews),
            'in_wishlist' => $in_wishlist !== null ? true : false,
            'status' => $this->status,
        ];
    }
}
