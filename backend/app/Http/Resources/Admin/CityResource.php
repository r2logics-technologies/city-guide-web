<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Website\AllPlacesResource;

class CityResource extends JsonResource
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
            'id' => $this->id,
            'country_id' => $this->country->id,
            'country_name' => $this->country->name,
            'name' => $this->name,
            'thumb' => $this->thumb,
            'banner' => $this->banner,
            'description' => $this->description,
            'total_place' => $this->get_place_count,
            'places' => AllPlacesResource::collection($this->get_place),
            'status' => $this->status,
        ];
    }
}
