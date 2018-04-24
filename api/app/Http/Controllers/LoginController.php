<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Validator;


class LoginController extends Controller
{
    public $successStatus = 200;

    /**
     * login api
     *
     * @return \Illuminate\Http\Response
     */

    public function login(){
        if(Auth::attempt(['username' => request('username'), 'password' => request('password')])){
            $user = Auth::user();
            $success['token'] =  $user->createToken('MyApp')->accessToken;
            return response()->json(['success' => $success], $this->successStatus);
        }
        else{
            return response()->json(['error'=>'Unauthorised!'], 401);
        }
    }
    /**
     * Register api
     *
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required',
            'password' => 'required',
            'c_password' => 'required|same:password',
            'password_hint' => 'required'
        ]);

        if($request['password']!=$request['c_password']){
            return response()->json(['error'=>'The password and the repeated password do not match.'], 412);
        }

        if($request['password']==$request['password_hint']){
            return response()->json(['error'=>'The hint cannot be the same as your password.'], 412);
        }

        if(null==$request['password_hint']){
            return response()->json(['error'=>'Please enter your password hint.'], 412);
        }

        if(User::where('username','=',$request['username'])->first() != null){
            return response()->json(['error'=>'A user with this username already exists.'], 409);
        }

        if ($validator->fails()) {
            return response()->json(['error'=>'An error occured. Please check the input data.'], 406); //validator->errors()], 412);
        }

        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        $user = User::create($input);
        $success['token'] =  $user->createToken('MyApp')->accessToken;
        $success['username'] =  $user->username;

        return response()->json(['success'=>$success], $this->successStatus);
    }

    /**
     * details api
     *
     * @return \Illuminate\Http\Response
     */
    public function getDetails()
    {
        $user = Auth::user();
        return response()->json(['success' => $user], $this->successStatus);
    }


    public function changePassword(Request $request){
        $messages = [
            'password.required' => 'Please enter the old password.',
            'c_password.same' => 'Repeated password does not match new password.'
        ];

        $validator = Validator::make($request->all(), [
            'password' => 'required',
            'new_password' => 'required',
            'c_password' => 'required|same:new_password'
        ], $messages);

        if(Auth::check()){
            if($validator->fails()){
                return response()->json(array('error' => $validator->getMessageBag()->toArray()), 400);
            } else {
                $current_password = Auth::user()->password;
                if(Hash::check($request['password'], $current_password)){
                    $user_id = Auth::User()->id;
                    $obj_user = User::find($user_id);
                    $obj_user->password = Hash::make($request['new_password']);;
                    $obj_user->save();
                    return response()->json(['success' => 'Password has been successfully changed.']);
                } else {
                    $error = array('password' => 'Please enter the correct old password.');
                    return response()->json(array('error' => $error), 400);
                }
            }
        }
    }

    public function getPasswordHint(Request $request){
        $validator = Validator::make($request->all(), [
            'username' => 'required'
        ], [
            'username.required' => 'Please enter username'
        ]);

        if($validator->fails()){
            return response()->json(array('error' => $validator->getMessageBag()->toArray()), 400);
        }

        if(User::where('username', $request['username'])->count() >= 1){
            return User::select('password_hint')->where('username', $request['username'])->get();
        } else {
            $error = array('username' => 'User with such username not found');
            return response()->json(array('error' => $error), 400);
        }
    }

}
