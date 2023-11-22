<?php

namespace App\Http\Resources\Website;

use Illuminate\Http\Resources\Json\JsonResource;

class AllPlacesResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'place_id' => $this->id,
            'place_name' => $this->name,
            'place_image' => $this->thumb,
            'place_price' => $this->price_range,
            'category' => $this->get_category->name,
            'type' => $this->get_type->name,
            'total_review' => $this->place_reviews_count,
            'avg_reviews' => $this->place_reviews->avg('rating'),
            'country' => $this->get_country->name,
            'city_id' => $this->get_city->id,
            'city' => $this->get_city->name,
            'address' => $this->address,
        ];
    }
}
