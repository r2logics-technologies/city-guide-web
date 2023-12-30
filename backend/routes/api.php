<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\Admin\DashboardController;
use App\Http\Controllers\Api\Admin\CountryController;
use App\Http\Controllers\Api\Admin\CurrencyController;
use App\Http\Controllers\Api\Admin\CityController;
use App\Http\Controllers\Api\Admin\CategoryController;
use App\Http\Controllers\Api\Admin\PlaceTypeController;
use App\Http\Controllers\Api\Admin\AmenitiesController;
use App\Http\Controllers\Api\Admin\BookingController;
use App\Http\Controllers\Api\Admin\PlacesController;
use App\Http\Controllers\Api\Admin\PostsController;
use App\Http\Controllers\Api\Admin\PagesController;
use App\Http\Controllers\Api\Admin\ReviewsController;
use App\Http\Controllers\Api\Admin\UsersController;
use App\Http\Controllers\Api\Admin\SettingsController;
// Web Controller
use App\Http\Controllers\Api\Website\HomeController;
use App\Http\Controllers\Api\Website\PaymentController;

// Mobile Controller
use App\Http\Controllers\Api\Mobile\AuthUserController;
use App\Http\Controllers\Api\Mobile\CustomerController;
use App\Http\Controllers\Api\Mobile\HomePageController;

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

    //Dashboard
    Route::get('/dashboard', [DashboardController::class, 'getData']);

    //Country
    Route::prefix('countries')->group(function () {
        Route::get('/', [CountryController::class, 'getData']);
        Route::post('/save/update', [CountryController::class, 'submitData']);
        Route::post('/change/status/{country}', [CountryController::class, 'changeStatusData']);
    });

    //Currencies
    Route::prefix('currencies')->group(function () {
        Route::get('/', [CurrencyController::class, 'getData']);
        Route::post('/save/update', [CurrencyController::class, 'submitData']);
        Route::post('/change/status/{currency}', [CurrencyController::class, 'changeStatusData']);
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
    Route::get('/place/{id}', [PlacesController::class, 'getSpecificData']);
    Route::prefix('places')->group(function () {
        Route::get('/', [PlacesController::class, 'getData']);
        Route::post('/save/update', [PlacesController::class, 'submitData']);
        Route::post('/change/status/{place}', [PlacesController::class, 'changeStatusData']);
    });

    //Post
    Route::get('/post/{id}', [PostsController::class, 'getSpecificData']);
    Route::prefix('posts')->group(function () {
        Route::get('/', [PostsController::class, 'getPosts']);
        Route::post('/save/update', [PostsController::class, 'submitData']);
        Route::post('/change/status/{post}', [PostsController::class, 'changeStatusData']);
        //category
        Route::prefix('categories')->group(function () {
            Route::get('/', [PostsController::class, 'getCategories']);
            Route::post('/save/update', [PostsController::class, 'submitCategory']);
            Route::post('/change/status/{PostCategory}', [PostsController::class, 'changeStatusCategory']);
        });
    });

    //Pages
    Route::prefix('pages')->group(function () {
        Route::get('/', [PagesController::class, 'getData']);
        Route::get('/contacts', [PagesController::class, 'getContact']);
        Route::post('/contacts/status/{contact}', [PagesController::class, 'changeContactStatus']);
        Route::post('/save/update', [PagesController::class, 'submitData']);
        Route::post('/change/status/{page}', [PagesController::class, 'changeStatusData']);
    });

    //Bookings
    Route::prefix('bookings')->group(function () {
        Route::get('/', [BookingController::class, 'getData']);
        Route::post('/change/status/{booking}', [BookingController::class, 'changeStatusData']);
    });
    //reviews
    Route::prefix('reviews')->group(function () {
        Route::get('/', [ReviewsController::class, 'getData']);
        Route::post('/change/status/{review}', [ReviewsController::class, 'changeStatusData']);
    });
    //users
    Route::prefix('users')->group(function () {
        Route::get('/', [UsersController::class, 'getData']);
        Route::post('/change/type/{user}', [UsersController::class, 'changeUserType']);
        Route::post('/change/status/{user}', [UsersController::class, 'changeStatusData']);
    });
    //settings
    Route::prefix('settings')->group(function () {
        Route::get('/', [SettingsController::class, 'getData']);
        Route::post('/update', [SettingsController::class, 'updateData']);
    });
});

//Website
Route::group(['prefix' => '/website'], function () {
    Route::get('/', [HomeController::class, 'getData']);
    Route::post('/contact', [HomeController::class, 'Contact']);
    Route::post('/search', [HomeController::class, 'searchData']);
    Route::get('/city/{city}', [HomeController::class, 'cityDetails']);
    Route::get('/blog/{blog}', [HomeController::class, 'blogDetails']);
    Route::get('/blogs', [HomeController::class, 'getBlogs']);
    Route::get('/wishlist/{place}', [HomeController::class, 'wishlist'])->middleware(['auth:sanctum']);
    Route::get('/places', [HomeController::class, 'allPlaces']);
    Route::get('/place/{place}', [HomeController::class, 'placeDetails']);
    Route::post('/book-place/{place}', [HomeController::class, 'placeBook'])->middleware(['auth:sanctum']);
    Route::post('/review-place/{place}', [HomeController::class, 'placeReview'])->middleware(['auth:sanctum']);
});

//User
Route::group(['prefix' => '/user', 'middleware' => ['auth:sanctum']], function () {
    Route::get('/', [AuthController::class, 'getProfile']);
    Route::post('/update-profile', [AuthController::class, 'updateProfile']);
    Route::post('/change-password', [AuthController::class, 'changePassword']);
    Route::get('/remove-wishlist/{wishlist}', [AuthController::class, 'wishlistRemove']);
    Route::get('/booking-details/{booking}', [AuthController::class, 'bookingDetails']);
    Route::get('/booking-status/{booking}', [AuthController::class, 'changeBookingStatus']);
    Route::get('/remove-booking/{booking}', [AuthController::class, 'bookingRemove']);
});

//Mobile Api
Route::prefix('mobile')->group(function () {
    Route::get('/home', [HomePageController::class, 'getData']);
    Route::get('/all-cities', [HomePageController::class, 'allPlaces']);
    Route::post('/search', [HomeController::class, 'searchData']);
    Route::get('/city/{city}', [HomePageController::class, 'cityDetails']);
    Route::get('/place/{place}', [HomePageController::class, 'placeDetails']);
    Route::post('/register', [AuthUserController::class, 'register']);
    Route::post('/login', [AuthUserController::class, 'login']);
    Route::post('/login-check', [AuthUserController::class, 'loginCheck']);
});

Route::group(['prefix' => '/mobile', 'middleware' => ['auth:sanctum']],function () {
    Route::get('/dashboard', [AuthUserController::class, 'getDashboard']);
    Route::post('/profile/update', [CustomerController::class, 'profileUpdate']);
    Route::post('/change-password', [AuthController::class, 'changePassword']);
    Route::get('/wishlist/{place}', [HomeController::class, 'wishlist']);
    Route::get('/remove-wishlist/{wishlist}', [AuthController::class, 'wishlistRemove']);
    Route::post('/book-place/{place}', [HomeController::class, 'placeBook']);
    Route::get('/booking-details/{booking}', [AuthController::class, 'bookingDetails']);
    Route::post('/review-place/{place}', [HomeController::class, 'placeReview']);
    Route::get('/logout', [AuthUserController::class, 'logout']);
});

Route::post('/razorpay-payment', [PaymentController::class,'createPayment'])->name('razorpay.payment');
Route::post('/razorpay-verify', [PaymentController::class,'verifyPayment'])->name('razorpay.verify');
