<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'avatar' => $this->avatar,
            'name' => $this->name,
            'email' => $this->email,
            'mobile' => $this->mobile,
            'facebook' => $this->facebook,
            'instagram' => $this->instagram,
            'user_type' => $this->user_type,
            'status' => $this->status,
            'created_at' => $this->created_at->format(' H:i d/m/Y'),
        ];
    }
}
