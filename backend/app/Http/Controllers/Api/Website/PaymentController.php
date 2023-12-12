<?php

namespace App\Http\Controllers\Api\Website;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Razorpay\Api\Api;

class PaymentController extends Controller
{
    public function createPayment(Request $request)
    {
        try {
            $api = new Api('rzp_test_uvxPE36NLe26pz', 'CH3IqF70ZEcjbM3L7es99rlX');

            // Assuming you have validated the input and it's a valid integer
            $amount = (int) $request->input('amount') * 100;

            // Create a Razorpay order
            $order = $api->order->create([
                'amount'   => $amount,
                'currency' => 'INR',
            ]);

            // Return the order ID or any relevant information to the frontend
            return response()->json(['order_id' => $order->id]);
        } catch (\Exception $e) {
            // Handle any exceptions or errors
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    public function verifyPayment(Request $request)
    {
        $api = new Api('rzp_test_uvxPE36NLe26pz', 'CH3IqF70ZEcjbM3L7es99rlX');
        $attributes = array(
            'razorpay_order_id' => $request->input('razorpay_order_id'),
            'razorpay_payment_id' => $request->input('razorpay_payment_id'),
            'razorpay_signature' => $request->input('razorpay_signature'),
        );
        $api->utility->verifyPaymentSignature($attributes);
        return response()->json(['success' => true]);
    }
}
