<?php

namespace App\Http\Resources\Admin;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

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
        return [
            'id' => $this->id,
            'place' => $this->get_place->name,
            'adults' => $this->numbber_of_adult,
            'childs' => $this->numbber_of_children,
            'name' => $this->user->name,
            'email' => $this->user->email,
            'mobile' => $this->user->mobile,
            'message' => $this->message,
            'booking_date' => Carbon::parse($this->date)->format('d/m/Y'),
            'booking_time' => Carbon::parse($this->time)->format('H:i A'),
            'booking_at' => $this->created_at->format(' H:i d/m/Y'),
            'status' => $this->status,
        ];
    }
}
