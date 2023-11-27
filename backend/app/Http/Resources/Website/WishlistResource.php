<?php

namespace App\Http\Resources\Website;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\Booking;

class WishlistResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $booking = Booking::where('place_id', $this->id)->where('status', 'activated')->first();
        if ($booking) {
            $is_booking = true;
        } else {
            $is_booking = false;
        }

        return [
            'id' => $this->id,
            'is_booking' => $is_booking,
            'country' => $this->get_place->get_country->name,
            'city' => $this->get_place->get_city->name,
            'category' => $this->get_place->get_category->name,
            'place_id' => $this->get_place->get_type->id,
            'place_type' => $this->get_place->get_type->name,
            'name' => $this->get_place->name,
            'thumb' => $this->get_place->thumb,
            'description' => $this->get_place->description,
            'price_range' => $this->get_place->price_range,
            'address' => $this->get_place->address,
            'total_reviews' => count($this->get_place->place_reviews),
            'avg_reviews' => $this->get_place->place_reviews->avg('rating'),
            'status' => $this->get_place->status,
        ];
    }
}
