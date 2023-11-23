<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
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
            'post_category_id' => intval($this->post_category_id),
            'category' => $this->category->name,
            'title' => $this->title,
            'slug' => $this->slug,
            'content' => $this->content,
            'thumb' => $this->thumb,
            'type' => $this->type,
            'status' => $this->status,
        ];
    }
}
