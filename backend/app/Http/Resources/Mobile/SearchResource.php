<?php

namespace App\Http\Resources\Mobile;

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
            'id' => $place->id,
            'name' => $place->name,
        ];
    }
}
