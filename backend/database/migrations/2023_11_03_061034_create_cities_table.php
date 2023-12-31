<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCitiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cities', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id')->nullable();
            $table->integer('country_id');
            $table->string('name');
            $table->string('slug');
            $table->string('intro')->nullable();
            $table->longText('description')->nullable();
            $table->string('thumb')->nullable();
            $table->string('banner')->nullable();
            $table->string('best_time_to_visit')->nullable();
            $table->string('currency')->nullable();
            $table->string('language')->nullable();
            $table->double('lat')->nullable();
            $table->double('lng')->nullable();
            $table->integer('priority')->nullable();
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
        Schema::dropIfExists('cities');
    }
}
