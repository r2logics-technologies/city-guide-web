<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\City;
use App\Models\Place;
use App\Models\PlaceReview;
use App\Models\User;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function getData()
    {
        $data = [];
        $data['bookings'] = count(Booking::all());
        $data['cities'] = count(City::allowed()->get());
        $data['places'] = count(Place::allowed()->get());
        $data['users'] = count(User::where('user_type', '!=', 'admin')->allowed()->get());
        $startOfMonth = Carbon::now()->subMonths(12)->startOfMonth();
        $endOfMonth = Carbon::now()->endOfMonth();
        $data['reviews_chart'] = PlaceReview::whereBetween('created_at', [$startOfMonth, $endOfMonth])
            ->selectRaw("DATE_FORMAT(created_at, '%Y-%m') as month, COUNT(*) as count")
            ->groupBy('month')
            ->get();

        $data['users_chart'] = User::where('user_type', 'customer')->whereBetween('created_at', [$startOfMonth, $endOfMonth])
            ->selectRaw("DATE_FORMAT(created_at, '%Y-%m') as month, COUNT(*) as count")
            ->groupBy('month')
            ->get();

        $statuses = ['pending', 'accepted', 'completed', 'rejected', 'cancelled'];
        $statusCounts = [];

        foreach ($statuses as $status) {
            $count = Booking::where('status', $status)->count();
            $statusCounts[$status] = $count;
        }
        $data['booking_chart'] =  $statusCounts;

        return response([
            'status' => 'success',
            'data' => $data,
        ], 200);
    }
}
