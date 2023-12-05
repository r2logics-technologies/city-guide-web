<?php

use App\Models\DeviceLog;
use App\Models\Notification;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Http;

class PushNotification
{

    public static function notifyToTopic($topic, $title, $message, $image, $click_action)
    {
        $path_to_fcm = "https://fcm.googleapis.com/fcm/send";
        $server_key = "AAAACp_ly3o:APA91bEsCj1oU3T4Ezke32qltVpkGlSAVdjTKvT--e8jVTsY4ugZ3NUry0WUmDKepUzMaTfYtxTEUDjcIz58S9rg7posJlnY2kmaEFkweBSOdWf0VFwt0YzJl04Tfv71ktIEAfO7tqP_";

        $fields = [
            'to' => "/topics/" . $topic,
            'notification' => [
                'title' => $title,
                'body' => $message,
                'image' => $image,
                'priority' => "high",
            ],
        ];

        $headers = array(
            'Authorization: key=' . $server_key,
            'Content-Type: application/json'
        );

        $payload = json_encode($fields);
        $curl_session = curl_init();
        curl_setopt($curl_session, CURLOPT_URL, $path_to_fcm);
        curl_setopt($curl_session, CURLOPT_POST, true);
        curl_setopt($curl_session, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($curl_session, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl_session, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($curl_session, CURLOPT_IPRESOLVE, CURL_IPRESOLVE_V4);
        curl_setopt($curl_session, CURLOPT_POSTFIELDS, $payload);
        $result = curl_exec($curl_session);
        curl_close($curl_session);

        $users = User::whereRaw("find_in_set('$topic',fcm_topics)")->get();

        $userIds = '';
        foreach ($users as $user) {
            $userIds .= $user->id . ",";
        }

        $notification = Notification::where('title', $title)->where('description', $message)->where('user_ids', $userIds)->first();
        if (!$notification) {
            $appNotification = Notification::create([
                'title' => $title,
                'description' => $message,
                'user_ids' => $userIds
            ]);
        }

        return json_encode($result);
    }

    public static function notifyToToken($registration_ids, $title, $message, $image, $click_action)
    {
        Log::info("message>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
        $path_to_fcm = "https://fcm.googleapis.com/fcm/send";
        $server_key = "AAAACp_ly3o:APA91bEsCj1oU3T4Ezke32qltVpkGlSAVdjTKvT--e8jVTsY4ugZ3NUry0WUmDKepUzMaTfYtxTEUDjcIz58S9rg7posJlnY2kmaEFkweBSOdWf0VFwt0YzJl04Tfv71ktIEAfO7tqP_";

        $fields = [
            'registration_ids' => $registration_ids,
            'data' => $click_action,
            'notification' => [
                'title' => $title,
                'body' => $message,
                'image' => $image,
                'priority' => "high",
            ],

        ];

        $headers = array(
            'Authorization: key=' . $server_key,
            'Content-Type: application/json'
        );

        $payload = json_encode($fields);
        $curl_session = curl_init();
        curl_setopt($curl_session, CURLOPT_URL, $path_to_fcm);
        curl_setopt($curl_session, CURLOPT_POST, true);
        curl_setopt($curl_session, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($curl_session, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl_session, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($curl_session, CURLOPT_IPRESOLVE, CURL_IPRESOLVE_V4);
        curl_setopt($curl_session, CURLOPT_POSTFIELDS, $payload);
        $result = curl_exec($curl_session);
        curl_close($curl_session);

        $userIds = '';
        foreach ($registration_ids as $token) {
            if ($token != null && $token != "") {
                $deviceLogs = DeviceLog::where('fcm_token', $token)->get();
                foreach ($deviceLogs as $deviceLog) {
                    $userIds .= $deviceLog->user_id . ",";
                }
            }
        }
        $notification = Notification::where('title', $title)->where('description', $message)->where('user_ids', $userIds)->first();
        if (!$notification) {
            $appNotification = Notification::create([
                'title' => $title,
                'description' => $message,
                'user_ids' => $userIds
            ]);
        }
        return json_encode($result);
    }

    public static function sendSMS($mobile, $otp)
    {
        $apiKey = urlencode('8ca9d000-d74f-11ec-9c12-0200cd936042');
        $url = "https://2factor.in/API/V1/" . $apiKey . "/SMS/" . $mobile . "/" . $otp . "/OTP1";

        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $response = curl_exec($ch);
        Log::info(json_encode($ch));
        curl_close($ch);

        return $response;
    }
}
