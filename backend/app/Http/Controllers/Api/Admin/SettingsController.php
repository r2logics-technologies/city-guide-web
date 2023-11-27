<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\SettingResource;
use App\Models\Setting;
use Illuminate\Http\Request;

class SettingsController extends Controller
{
    public function getData()
    {
        $setting = Setting::first();
        if ($setting) {
            return response([
                'status' => 'success',
                'message' => '',
                'status_code' => 200,
                'setting' => new SettingResource($setting),
            ]);
        }
        return response([
            'status' => 'warning',
            'status_code' => 500,
            'message' => 'No setting created.',
            'setting' => null,
        ]);
    }


    public function updateData(Request $request)
    {
        $setting =  Setting::first();
        $data = $request->all();
        if ($request->hasFile('logo')) {
            $data['logo']  = '/storage/' . $request->logo->store('images/logo');
            if ($setting != null) {
                $setting->deleteLogo();
            }
        }

        $upsert = Setting::updateOrCreate(['id' => 1], $data);

        if ($upsert) {
            $setting =  Setting::first();
            return response(['status' => 'success', 'message' => 'Successfully Updated...', 'setting' => new SettingResource($setting)], 200);
        }

        return response([
            'status' => 'warning',
            'status_code' => 500,
            'message' => 'Something went wrong.'
        ]);
    }
}
