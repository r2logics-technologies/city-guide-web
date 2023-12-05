<?php

namespace App\Http\Controllers\Api\Mobile;

use App\Http\Controllers\Controller;
use App\Http\Resources\Mobile\UserResource;
use App\Models\DeviceLog;
use App\Models\LoginLog;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use PushNotification;

class AuthUserController extends Controller
{
    public function register(Request $request)
    {
        Log::info('Registration  Log:::' . json_encode($request->all()));
        $user = User::where('mobile', $request->mobile)->role($request->user_type)->first();
        $registrationIds = array();
        $deviceRegistered = false;
        Log::info("REGISTRATION USER LOG ::" . json_encode($user));
        if ($user) {
            $deviceLog = DeviceLog::where('user_id', $user->id)->where('device_type', $request->device_type)->where('device_id', $request->device_id)->first();
            if ($deviceLog) {
                $deviceRegistered = true;
                Log::info('Device registered Log:::' . json_encode($deviceLog));
            }

            if (!$deviceRegistered) {
                Log::info('Device not registered Log:::' . json_encode($deviceLog));
                $deviceLog = DeviceLog::create([
                    'user_id' => $user->id,
                    'device_type' => $request->device_type,
                    'device_id' => $request->device_id,
                    'fcm_token' => $request->fcm_token,
                ]);
                $fcm_topics = json_decode($user->fcm_topics);
                if ($fcm_topics == null) {
                    $fcm_topics = array("everyone");
                }
                if (!in_array($request->device_type, $fcm_topics)) {
                    array_push($fcm_topics, $request->device_type && $request->device_type != null ? $request->device_type : "android");
                }
                if (!in_array($request->user_type, $fcm_topics)) {
                    array_push($fcm_topics, $request->user_type && $request->user_type != null ? $request->user_type : "customer");
                }

                $userUpdate = $user->update(['fcm_topics' => json_encode($fcm_topics)]);
            } else {
                return response(['status' => 'error', 'message' => 'already registered'], 200);
            }
        } else {
            $user = User::create([
                'country_code' => $request->country_code,
                'mobile' => $request->mobile,
                'user_type' => 'customer',
                'fcm_topics' => json_encode(["everyone", $request->device_type, $request->user_type]),
            ]);

            if ($user) {
                $deviceLog = DeviceLog::create([
                    'user_id' => $user->id,
                    'device_type' => $request->device_type,
                    'device_id' => $request->device_id,
                    'fcm_token' => $request->fcm_token,
                ]);
            }
        }

        if (!$user) {
            return response(['status' => 'error', 'message' => 'Something went wrong'], 200);
        }

        $token = $user->createToken('myapptoken')->plainTextToken;

        $response = [
            'user' => new UserResource($user),
            'token' => $token,
            'status' => 'success',
            'message' => 'register successfully'
            // 'fcm_token' => $registrationIds,
        ];
        return response($response, 201);
    }


    public function login(Request $request)
    {
        Log::info('Login  Log:::' . json_encode($request->all()));

        $demoNumber = array("9876543201", "9876543202", "9876543203", "9876543204", "9876543205", "9876543206", "9876543207", "9876543208", "9876543209");

        $request->validate([
            'country_code' => 'required|string',
            'mobile' => 'required|regex:/^[0-9]{10}$/',
            'device_id' => 'required|string',
            'device_type' => 'required|string',
            'user_type' => 'required|string'
        ]);



        $user = User::where('mobile', $request->mobile)->role($request->user_type)->first();
        if (!$user) {
            return response([
                'status' => 'warning',
                'message' => 'user not register',
            ], 200);
        }

        $deviceRegistered = false;
        if ($user) {
            Log::info('Check USER ::' . json_encode($user->deviceLogs));
            if ($user->status == 'activated' || $user->status == 'pending') {
                $deviceUser = User::where('id', $user->id)->with('deviceLogs')->whereHas('deviceLogs', function ($query) use ($request) {
                    $query->where('device_id', $request->device_id)->where('device_type', $request->device_type);
                })->first();
                Log::info('Check DEVICE ::' . json_encode($deviceUser));
                if (!$deviceUser) {
                    return response([
                        'status' => 'device-not-register',
                        'message' => 'not register',
                        'user' => new UserResource($user),
                    ], 200);
                }
            } else {
                if ($user->status == 'blocked') {
                    $statusMessage = "This account has been block by Administrator";
                } else {
                    $statusMessage = "Your account is deactivated. Please contact Administrator to re-activate your account";
                }
                LoginLog::create([
                    'mobile' => $request->mobile,
                    'device_id' => $request->device_id,
                    'otp_response' => NULL,
                    'remark' => $statusMessage,
                ]);
                $response = [
                    'user' => new UserResource($user),
                    'token' => null,
                    'status' => 'unauthorize',
                    'message' => $statusMessage,
                ];
                return response($response, 200);
            }
        }
        $token = $user->createToken('myapptoken')->plainTextToken;
        $fcm_topics = json_decode($user->fcm_topics);
        if ($fcm_topics == null) {
            $fcm_topics = array("everyone");
        }
        if (!in_array($request->device_type, $fcm_topics)) {
            array_push($fcm_topics, $request->device_type && $request->device_type != null ? $request->device_type : "android");
        }
        if (!in_array($request->user_type, $fcm_topics)) {
            array_push($fcm_topics, $request->user_type && $request->user_type != null ? $request->user_type : "customer");
        }
        if ($request->fcm_token)
            $user->update(['fcm_token' => $request->fcm_token, 'fcm_topics' => json_encode($fcm_topics)]);
        Log::info("FCM::" . json_encode($user));
        $deviceLogs = DeviceLog::where('user_id', $user->id)->where('device_type', $request->device_type)->where('device_id', $request->device_id)->first();
        if ($deviceLogs) $deviceLogs->update(['fcm_token' => $request->fcm_token]);

        LoginLog::create([
            'mobile' => $request->mobile,
            'device_id' => $request->device_id,
            'otp_response' => NULL,
            'remark' => 'login success',
        ]);

        $response = [
            'user' => new UserResource($user),
            'token' => $token,
            'status' => 'success',
            'message' => 'login success'
        ];

        return response($response, 200);
    }

    public function logout()
    {
        $user = auth()->user();
        $user->currentAccessToken()->delete();

        return response(['message' => 'user logged out', 'status' => 'success'], 200);
    }
    public function profileUpdate(Request $request)
    {
        Log::info('Registration  Log:::' . json_encode($request->all()));
        $auth = Auth::user();
        if (!$auth) return response([
            'status' => 'unauthorized',
            'message' => 'user not available',
        ]);


        $user = User::where('id', $auth->id)->first();
        $avatar = $user->avatar;

        // if($request->has('reference_id') && $request->reference_id != null && $request->reference_id != ""){
        //     $isValidRefernce = User::where('reference_id','!=' ,$request->reference_id)->where(function($query){
        //         $query->where('id','!=',$user->id)->where('reference_id','!=', $user->reference_id);
        //     })->first();
        //     return response(['status' => 'warning', 'message' => 'this refernce code is not valid']);

        // }


        //Reference Code Update
        if ($request->has('reference_id') && $request->reference_id != null && $request->reference_id != "") {
            $isReferValid = User::where('referral_id', $request->reference_id)->first();
            if ($isReferValid) {
                $referUpdate = $user->update([
                    'reference_id' => $request->reference_id,
                ]);
            } else {
                return response(['status' => 'warning', 'message' => 'referal id invalid!']);
            }
        }

        //Referral code update
        $refCode = $this->generateReferralCode();
        $isRefValid = $user->referral_id == null;
        if ($isRefValid) {
            $refUpdate = $user->update([
                'referral_id' => $refCode,
            ]);
        }

        // Avatar Update
        if ($request->has('avatar') && $request->avatar != null && $request->avatar != "") {
            if ($user->avatar != null && $user->avatar != "") {
                Storage::delete($user->avatar);
            }
            $avatar = '/storage/' . $request->avatar->store('users/avatar');
        }

        $updated = $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'avatar' => $avatar,
            'mobile' => $request->mobile,
        ]);


        $authUser = User::find($auth->id);
        if ($updated) {

            //Add Points
            $rewardPoints = 50;
            if ($request->filled('reference_id')) {
                //add for referral person
                $refPerson = User::where('referral_id', $request->reference_id)->first();

                if ($refPerson) {
                    $refRewardPoints = $refPerson->reward_points + $rewardPoints;
                    $refPersonUpdate = $refPerson->update([
                        'reward_points' => $refRewardPoints,
                    ]);

                    if ($refPersonUpdate) {
                        $refPersonTransCredit = TransactionPoints::create([
                            'user_id' => $refPerson->id,
                            'reward_points' => $rewardPoints,
                            'transaction_type' => 'cr'
                        ]);
                        //add for new user
                        $referUpdate = $authUser->update([
                            'reward_points' => $rewardPoints
                        ]);
                        if ($referUpdate) {
                            $refTransCredit = TransactionPoints::create([
                                'user_id' => $authUser->id,
                                'reward_points' => $rewardPoints,
                                'transaction_type' => 'cr'
                            ]);
                        }
                    }
                }
            }
            return response([
                'status' => 'success',
                'message' => 'success',
                'user' => new UserResource($authUser),
            ]);
        }

        return response([
            'status' => 'error',
            'message' => 'error',
            'user' => null,
        ]);
    }
}
