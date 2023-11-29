<?php

namespace App\Http\Resources\Website;

use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class BlogsResource extends JsonResource
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

        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'thumb' => $this->thumb,
            'category_id' => $this->category->id,
            'category_name' => $this->category->name,
            'created_date' => $formattedDate,
            'content' => $this->content,
        ];
    }
}
