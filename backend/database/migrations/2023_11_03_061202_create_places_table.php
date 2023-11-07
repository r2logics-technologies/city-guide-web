<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePlacesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('places', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id')->nullable();
            $table->integer('country_id');
            $table->integer('city_id');
            $table->string('category');
            $table->string('place_type');
            $table->string('name');
            $table->string('slug');
            $table->longText('description')->nullable();
            $table->integer('price_range')->nullable();
            $table->string('address')->nullable();
            $table->double('lat')->nullable();
            $table->double('lng')->nullable();
            $table->string('email')->nullable();
            $table->string('phone_number')->nullable();
            $table->string('website')->nullable();
            $table->string('thumb')->nullable();
            $table->longText('gallery')->nullable();
            $table->string('video')->nullable();
            $table->string('booking_type')->nullable();
            $table->string('link_bookingcom')->nullable();
            $table->enum('status', ['pending', 'activated', 'deactivated', 'deleted'])->default('activated');
            $table->json('details')->nullable();
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
        Schema::dropIfExists('places');
    }
}
