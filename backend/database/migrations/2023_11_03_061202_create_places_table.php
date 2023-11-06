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
            $table->longText('description');
            $table->integer('price_range');
            $table->string('amenities');
            $table->string('address');
            $table->double('lat');
            $table->double('lng');
            $table->string('email');
            $table->string('phone_number');
            $table->string('website');
            $table->string('social', 500);
            $table->string('opening_hour', 500);
            $table->string('thumb');
            $table->longText('gallery');
            $table->string('video');
            $table->integer('booking_type');
            $table->string('link_bookingcom');
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
