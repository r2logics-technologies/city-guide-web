<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\Admin\CountryController;
use App\Http\Controllers\Api\Admin\CityController;
use App\Http\Controllers\Api\Admin\CategoryController;
use App\Http\Controllers\Api\Admin\PlaceTypeController;
use App\Http\Controllers\Api\Admin\AmenitiesController;
use App\Http\Controllers\Api\Admin\PlacesController;
use App\Http\Controllers\Api\Website\HomeController;
use App\Http\Controllers\Api\Website\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

//register
Route::post('/auth/register', [AuthController::class, 'register']);
//login
Route::post('/auth/login', [AuthController::class, 'login']);

//Admin
Route::group(['prefix' => '/admin', 'middleware' => ['auth:sanctum']], function () {
    //Login Check
    Route::get('/login-check', [AuthController::class, 'loginCheck']);

    //Country
    Route::prefix('countries')->group(function () {
        Route::get('/', [CountryController::class, 'getData']);
        Route::post('/save/update', [CountryController::class, 'submitData']);
        Route::post('/change/status/{country}', [CountryController::class, 'changeStatusData']);
    });

    //City
    Route::prefix('cities')->group(function () {
        Route::get('/', [CityController::class, 'getData']);
        Route::post('/save/update', [CityController::class, 'submitData']);
        Route::post('/change/status/{city}', [CityController::class, 'changeStatusData']);
    });

    //Category
    Route::prefix('categories')->group(function () {
        Route::get('/', [CategoryController::class, 'getData']);
        Route::post('/save/update', [CategoryController::class, 'submitData']);
        Route::post('/change/status/{category}', [CategoryController::class, 'changeStatusData']);
    });

    //Place Type
    Route::prefix('placetypes')->group(function () {
        Route::get('/', [PlaceTypeController::class, 'getData']);
        Route::post('/save/update', [PlaceTypeController::class, 'submitData']);
        Route::post('/change/status/{placetype}', [PlaceTypeController::class, 'changeStatusData']);
    });

    //Amenities
    Route::prefix('amenities')->group(function () {
        Route::get('/', [AmenitiesController::class, 'getData']);
        Route::post('/save/update', [AmenitiesController::class, 'submitData']);
        Route::post('/change/status/{amenities}', [AmenitiesController::class, 'changeStatusData']);
    });

    //Places
    Route::prefix('places')->group(function () {
        Route::get('/', [PlacesController::class, 'getData']);
        Route::post('/save/update', [PlacesController::class, 'submitData']);
        Route::post('/change/status/{place}', [PlacesController::class, 'changeStatusData']);
    });
});

//Website
Route::group(['prefix' => '/website'], function () {
    Route::get('/', [HomeController::class, 'getData']);
    Route::post('/search', [HomeController::class, 'searchData']);
    Route::get('/city/{city}', [HomeController::class, 'cityDetails']);
    Route::get('/wishlist/{place}', [HomeController::class, 'wishlist'])->middleware(['auth:sanctum']);
    Route::get('/place/{place}', [HomeController::class, 'placeDetails']);
    Route::post('/book-place/{place}', [HomeController::class, 'placeBook'])->middleware(['auth:sanctum']);
});

//User
Route::group(['prefix' => '/user', 'middleware' => ['auth:sanctum']], function () {
    Route::get('/', [UserController::class, 'getProfile']);
    Route::post('/update-profile', [UserController::class, 'updateProfile']);
    Route::post('/change-password', [UserController::class, 'changePassword']);
    Route::get('/remove-wishlist/{wishlist}', [UserController::class, 'wishlistRemove']);
    Route::get('/booking-details/{booking}', [UserController::class, 'bookingDetails']);
    Route::get('/booking-status/{booking}', [UserController::class, 'changeBookingStatus']);
    Route::get('/remove-booking/{booking}', [UserController::class, 'bookingRemove']);
});
