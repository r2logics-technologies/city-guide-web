<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Resources\Json\JsonResource;

class CurrencyResource extends JsonResource
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
            'country_id' => $this->country_id,
            'country_name' => $this->get_country->name,
            'title' => $this->title,
            'currency_icon' => $this->currency_icon,
            'price' => $this->price,
            'inr_price' => $this->inr_price,
            'status' => $this->status,
        ];
    }
}
