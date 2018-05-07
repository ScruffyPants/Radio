<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Channel as Channel;
use App\Http\Resources\Channels;
use Illuminate\Support\Facades\Auth;
use App\User as User;
use function MongoDB\BSON\toJSON;
use Symfony\Component\HttpFoundation\Response;

class ChannelController extends Controller
{
    public function getChannels(){
        $client = new \GuzzleHttp\Client();
        $res = $client->request('GET', 'http://localhost:8020/status-json.xsl');
        $contents = json_decode($res->getBody()->getContents());

        return json_encode($contents->icestats->source);
    }

    public function uploadImage(Request $request){
        $user = Auth::user();

        if($request -> hasFile('image')){
            $image = $request->file('image');
            $name = time().'.'.$image->getClientOriginalExtension();
            //$destinationPath = storage_path('storage/app/public');
            $image->storeAs('public', $name);;

            User::where("id",$user->id)->update(['image' => $name]);

            return response()->json(['data'=>"image is uploaded", 'name' => $name]);
        }
        else{
            return response()->json(['data'=>"must include image"]);
        }
    }

    public function getStreamKey(){
        $user = Auth::user();

        if(Channel::where('id', $user->id)->count() >= 1){
            //UPDATE
            $channel = Channel::find($user->id);

            $key = md5(microtime().rand());
            $channel->name = $key;

            $channel->save();
            
            return response()->json(['key' => $key]);
        } else {
            //INSERT
            $channel = new Channel;
            $channel->id = $user->id;

            $key = md5(microtime().rand());
            $channel->name = $key;
            $channel->description = "NULL";

            $channel->save();

            return response()->json(['key' => $key]);
        }

    }

    public function authStream(Request $request){
        $username = $request['user'];
        $password = $request['pass'];
        $mount = ltrim($request['mount'],'/');

        error_log($mount);
        error_log($password);
        error_log($username);

        if(User::where('username', $username)->first() != null && $mount == $username){
            $id = User::select('id')->where('username', $username)->first()->id;
            error_log($id);
            $key = Channel::select('name')->where('id', $id)->first()->name;
            if($key == $password){
                error_log('Success');
                return response() -> json() -> header('icecast-auth-user:1','');
            }
        }

        return response() -> json() -> header('icecast-auth-user:0','');
    }
}
