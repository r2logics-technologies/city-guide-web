<?php


use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});


Route::get('/migrate-refresh', function () {
    Artisan::call('migrate:fresh --seed');
});
Route::get('/generate-key', function () {
    Artisan::call('key:generate');
});

Route::get('/linkstorage', function () {
    Artisan::call('storage:link');
});

Route::get('/dump-autoload', function () {
    Artisan::call('clear-compiled');
    exec('composer dump-autoload');
    Artisan::call('optimize');
    echo 'dump-autoload complete';
});
Route::get('/composer-update', function () {
    echo 'please wait!! composer updating';
    exec('composer update');
    echo 'composer updated';
});

Route::get('/config-clear', function () {
    Artisan::call('cache:clear');
    Artisan::call('config:clear');
    Artisan::call('route:clear');
    return "Cache is cleared";
});

Route::get('/config/{command}', function ($command) {
    Artisan::call("'" . $command . "'");
    return "Cache is cleared";
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
