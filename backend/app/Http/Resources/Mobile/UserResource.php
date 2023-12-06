<?php

namespace App\Http\Resources\Mobile;

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
            'avatar' => $this->avatar,
            'name' => $this->name,
            'email' => $this->email,
            'mobile' => $this->mobile,
            'facebook' => $this->facebook,
            'instagram' => $this->instagram,
        ];
    }
}
