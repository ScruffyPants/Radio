<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Channel as Channel;
use App\Http\Resources\Channels;
use Illuminate\Support\Facades\Auth;
use App\User as User;
use Symfony\Component\HttpFoundation\Response;

class ChannelController extends Controller
{
    public function getChannels(){
        return new Channels(Channel::all());
    }

    public function getStreamKey(){
        $user = Auth::user();

        if(Channel::where('id', $user->id)->count() >= 1){
            //UPDATE
            $channel = Channel::find($user->id);

            $key = md5(microtime().rand());
            $channel->name = $key;

            $channel->save();
            return $key;
        } else {
            //INSERT
            $channel = new Channel;
            $channel->id = $user->id;

            $key = md5(microtime().rand());
            $channel->name = $key;

            $channel->save();
            return $key;
        }

    }

    public function authStream(Request $request){
        $username = $request['user'];
        $password = $request['pass'];
        $mount = ltrim($request['mount'],'/');

        if(User::where('name', $username)->first() != null && $mount == $username){
            $id = User::select('id')->where('name', $username)->first()->id;
            error_log($id);
            $key = Channel::select('name')->where('id', $id)->first()->name;
            if($key == $password){
                return response() -> json() -> header('icecast-auth-user','1');
            }
        }

        return response() -> json() -> header('icecast-auth-user','0');
    }
}
