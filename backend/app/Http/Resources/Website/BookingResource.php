<?php

namespace App\Http\Resources\Website;

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
        $formattedDate = $carbonDate->format('j F Y');
        return [
            'booking_date' => $formattedDate,
            'booking_time' => $this->time,
            'total_adults' => $this->numbber_of_adult,
            'total_childs' => $this->numbber_of_children,
            'message' => $this->message,
        ];
    }
}
