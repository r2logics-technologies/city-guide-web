<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBookingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id');
            $table->integer('place_id');
            $table->integer('numbber_of_adult');
            $table->integer('numbber_of_children');
            $table->date('date');
            $table->time('time');
            $table->string('name');
            $table->string('email');
            $table->string('phone_number');
            $table->string('message', 500);
            $table->integer('type');
            $table->tinyInteger('status')->default('1')->comment('1 => Active, 0 => Inactive');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('bookings');
    }
}
