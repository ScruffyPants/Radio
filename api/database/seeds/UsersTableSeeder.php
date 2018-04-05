<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //The line below should use factory to seed but for some reason doesn't work
        //$u = factory(App\User::class, 50)->make();

        //this is a ghetto manual "factory"
        for($i = 0; $i < 10; $i++) {
            DB::table('users')->insert([
                'name' => str_random(5),
                'email' => str_random(10) . '@gmail.com',
                'password' => "password",
            ]);
        }

    }
}
