<?php

namespace App\Http\Resources\Website;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\Place;

class SearchResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $place = Place::with(['get_category','get_country', 'get_city', 'get_type'])->withCount('place_reviews')->find($this->place_id);
        return [
            'place_id' => $place->id,
            'place_name' => $place->name,
            'place_image' => $place->thumb,
            'place_price' => $place->price_range,
            'category_id' => $place->get_category->id,
            'category' => $place->get_category->name,
            'type_id' => $place->get_type->id,
            'type' => $place->get_type->name,
            'total_review' => $place->place_reviews_count,
            'avg_reviews' => $place->place_reviews->avg('rating'),
            'country' => $place->get_country->name,
            'city_id' => $place->get_city->id,
            'city' => $place->get_city->name,
            'address' => $place->address,
        ];
    }
}
