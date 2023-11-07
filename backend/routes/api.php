<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\Admin\CountryController;

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


Route::group(['prefix' => '/admin', 'middleware' => ['auth:sanctum']], function () {
    //Login Check
    Route::get('/login-check', [AuthController::class, 'loginCheck']);

    //Country
    Route::prefix('countries')->group(function () {
        Route::get('/', [CountryController::class, 'getData']);
        Route::post('/save/update', [CountryController::class, 'submitData']);
        Route::post('/change/status/{country}', [CountryController::class, 'changeStatusData']);
    });
});
