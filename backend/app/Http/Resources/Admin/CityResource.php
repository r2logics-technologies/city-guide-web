<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Resources\Json\JsonResource;

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
            'total_place' => $this->get_place_count,
            'places' => $this->get_place,
            'status' => $this->status,
        ];
    }
}
