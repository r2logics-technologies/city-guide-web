<?php

namespace App\Http\Resources\Admin;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class ReviewResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $carbonDate = Carbon::parse($this->created_at);
        $formattedDate = $carbonDate->format('F j, Y');

        $percentage = ($this->rating / 5) * 100;

        return [
            'id' => $this->id,
            'reviewer' => $this->get_customer->name,
            'place' => $this->place->name,
            'review' => $this->review,
            'rating' => $this->rating,
            'rating_percent' => $percentage.'%',
            'review_date' => $formattedDate,
            'status' => $this->status,
        ];
    }
}
