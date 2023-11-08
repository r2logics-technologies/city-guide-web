<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Resources\Json\JsonResource;

class CategoryResource extends JsonResource
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
            'name' => $this->name,
            'slug' => $this->slug,
            'priority' => $this->priority,
            'is_feature' => $this->is_feature,
            'feature_title' => $this->feature_title,
            'icon_map_marker' => $this->icon_map_marker,
            'status' => $this->status,
        ];
    }
}
