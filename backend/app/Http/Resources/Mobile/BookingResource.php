<?php

namespace App\Http\Resources\Mobile;

use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class BookingResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $carbonDate = Carbon::parse($this->date);
        $formattedDate = $carbonDate->format('F j, Y');

        return [
            'id' => $this->id,
            'numbber_of_adult' => $this->numbber_of_adult,
            'numbber_of_children' => $this->numbber_of_children,
            'booking_date' => $formattedDate,
            'country' => $this->get_place->get_country->name,
            'city' => $this->get_place->get_city->name,
            'thumb' => $this->get_place->thumb,
            'thumb' => $this->get_place->price_range,
            'total_reviews' => count($this->get_place->place_reviews),
            'avg_reviews' => round($this->get_place->place_reviews->avg('rating'), 1),
        ];
    }
}
