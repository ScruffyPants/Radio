<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Channel;
use App\Http\Resources\Channels;

class ChannelController extends Controller
{
    public function getChannels(){
        return new Channels(Channel::all());
    }
}
