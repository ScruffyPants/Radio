<?php

use Illuminate\Http\Request;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('login', 'LoginController@login') -> name('login');

Route::post('register', 'LoginController@register') -> name('register');

Route::post('auth_stream', 'ChannelController@authStream');

Route::group(['middleware' => 'auth:api'], function(){
    Route::post('get-details', 'LoginController@getDetails');

    Route::post('get-channels', 'ChannelController@getChannels');

    Route::post('get-streamKey', 'ChannelController@getStreamKey');
});