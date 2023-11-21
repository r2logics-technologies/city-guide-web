<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePlaceReviewsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('place_reviews', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id')->nullable();
            $table->integer('place_id')->nullable();
            $table->float('rating')->nullable();
            $table->text('review')->nullable();
            $table->enum('status', ['activated', 'deactivated', 'deleted'])->default('deactivated');
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
        Schema::dropIfExists('place_reviews');
    }
}
