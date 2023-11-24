<?php

namespace App\Http\Resources\Website;

use Illuminate\Http\Resources\Json\JsonResource;

class AuthCustomerResource extends JsonResource
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
            'name' => $this->resource->name,
            'avatar' => $this->resource->avatar,
            'email' => $this->resource->email,
            'country_code' => $this->resource->country_code,
            'mobile' => $this->resource->mobile,
            'facebook' => $this->resource->facebook,
            'instagram' => $this->resource->instagram,
            'address' => $this->resource->address,
            'bookings' => WishlistResource::collection($this->resource->get_bookings),
            'wishlists' => WishlistResource::collection($this->resource->get_wishlists)
        ];
    }
}
