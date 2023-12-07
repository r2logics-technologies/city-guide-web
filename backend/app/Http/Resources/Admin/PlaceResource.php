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
            'city_name' => $this->get_city->name,
            'category' => intval($this->category),
            'category_name' => $this->get_category->name,
            'place_type' => intval($this->place_type),
            'name' => $this->name,
            'slug' => $this->slug,
            'description' => $this->description,
            'price_range' => $this->price_range,
            'address' => $this->address,
            'details' => $this->details,
            'lat' => $this->lat,
            'lng' => $this->lng,
            'email' => $this->email,
            'phone_number' => $this->phone_number,
            'website' => $this->website,
            'booking_type' => $this->booking_type,
            'link_bookingcom' => $this->link_bookingcom,
            'amenities' => $amenities,
            'placeopens' => PlaceOpenResource::collection($placeopens),
            'placesocials' => PlaceSocialResource::collection($placesocials),
            'video' => $this->video,
            'thumb' => $this->thumb,
            'status' => $this->status,
        ];
    }
}
