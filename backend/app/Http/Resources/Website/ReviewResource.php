<?php

namespace App\Http\Resources\Website;

use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

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
            'rating' => $this->rating,
            'review' => $this->review,
            'percentage' => $percentage.'%',
            'review_date' => $formattedDate,
            'customer' => new CustomerResource($this->get_customer)
        ];
    }
}
