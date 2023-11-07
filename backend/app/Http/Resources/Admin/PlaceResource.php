<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\PlaceAmenities;
use App\Models\PlaceOpen;
use App\Models\PlaceSocial;

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
        $amenities = PlaceAmenities::where('place_id', $this->id)->get();
        $placeopens = PlaceOpen::where('place_id', $this->id)->get();
        $placesocials = PlaceSocial::where('place_id', $this->id)->get();

        return [
            'id' => $this->id,
            'country_id' => $this->country_id,
            'city_id' => $this->city_id,
            'category' => $this->category,
            'place_type' => $this->place_type,
            'name' => $this->name,
            'slug' => $this->slug,
            'description' => $this->description,
            'price_range' => $this->price_range,
            'address' => $this->address,
            'lat' => $this->lat,
            'lng' => $this->lng,
            'email' => $this->email,
            'phone_number' => $this->phone_number,
            'website' => $this->website,
            'amenities' => $amenities,
            'placeopens' => $placeopens,
            'placesocials' => $placesocials,
            'status' => $this->status,
        ];
    }
}
