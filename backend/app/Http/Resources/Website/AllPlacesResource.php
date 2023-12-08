<?php

namespace App\Http\Resources\Website;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\Wishlist;

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
        $auth = request()->user('api');
        if ($auth) {
            $in_wishlist = Wishlist::where('user_id', $auth->id)->where('place_id', $this->id)->where('status', 'activated')->first();
        } else {
            $in_wishlist = null;
        }

        return [
            'place_id' => $this->id,
            'place_name' => $this->name,
            'place_image' => $this->thumb,
            'currency_type' => $this->get_currency->title,
            'currency_icon' => $this->get_currency->currency_icon,
            'place_price' => $this->price_range,
            'category_id' => $this->get_category->id,
            'category' => $this->get_category->name,
            'type_id' => $this->get_type->id,
            'type' => $this->get_type->name,
            'total_review' => $this->place_reviews_count,
            'avg_reviews' => round($this->place_reviews->avg('rating'), 1),
            'country' => $this->get_country->name,
            'city_id' => $this->get_city->id,
            'city' => $this->get_city->name,
            'address' => $this->address,
            'auth' => $auth,
            'in_wishlist' => $in_wishlist !== null ? true : false,
        ];
    }
}
