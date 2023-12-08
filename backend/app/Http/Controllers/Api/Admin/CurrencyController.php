<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\Admin\CurrencyResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use App\Models\Currency;

class CurrencyController extends Controller
{
    public function getData()
    {
        $currencies = Currency::with('get_country')->allowed()->get();
        if ($currencies && count($currencies) > 0) {
            return response([
                'status' => 'success',
                'message' => '',
                'status_code' => 200,
                'currencies' => CurrencyResource::collection($currencies),
            ]);
        }
        return response([
            'status' => 'warning',
            'status_code' => 500,
            'message' => 'No currencies found.',
            'currencies' => null,
        ]);
    }

    public function submitData(Request $request)
    {
        if (!$request->edited && $request->edited == null) {
            $auth = Auth::user()->id;
            $request['user_id'] = $auth;
            $data = $request->all();

            $find_currency = Currency::where('title', $request->title)->first();
            if ($find_currency) {
                return response([
                    'status' => 'error',
                    'message' => 'This currency already exists',
                ]);
            }

            $create = Currency::create($data);
            return response(
                [
                    'status' => 'success',
                    'currency' => new CurrencyResource($create),
                    'status_code' => 200,
                    'message' => 'Successfully added...'
                ],
                200
            );
        } else {
            $currency = Currency::find($request->edited);
            $auth = Auth::user()->id;
            $request['user_id'] = $auth;
            $data = $request->all();
            $find_currency = Currency::where('title', $request->title)->where('id', '!=', $currency->id)->first();
            if ($find_currency) {
                return response([
                    'status' => 'error',
                    'message' => 'This place type already exists',
                ]);
            }
            $update = $currency->update($data);
            if ($update) {
                $update = Currency::find($request->edited);
                return response(
                    [
                        'status' => 'success',
                        'currency' => new CurrencyResource($update),
                        'status_code' => 200,
                        'message' => 'Successfully updated...'
                    ],
                    200
                );
            }
        }

        return response([
            'status' => 'warning',
            'status_code' => 500,
            'message' => 'something went wrong...',
            'currency' => null,
        ], 500);
    }

    public function changeStatusData(Request $request, Currency $currency)
    {
        $message = "";
        if ($request->status == 'deleted') {
            $message = "Deleted";
        } else if ($request->status == 'activated') {
            $message = "Activated";
        } else {
            $message = "Deactivated";
        }
        $updated =  $currency->update(['status' => $request->status]);

        if ($updated) {
            $currency =  Currency::find($currency->id);
            return response(['status' => 'success', 'message' => $message, 'currency' => new CurrencyResource($currency)], 200);
        }

        return response([
            'status' => 'warning',
            'status_code' => 500,
            'message' => 'something want wrong. unable to ' . $message,

        ]);
    }
}
