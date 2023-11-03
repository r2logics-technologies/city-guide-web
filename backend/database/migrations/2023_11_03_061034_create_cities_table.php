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
            $table->string('intro');
            $table->longText('description');
            $table->string('thumb');
            $table->string('banner');
            $table->string('best_time_to_visit');
            $table->string('currency');
            $table->string('language');
            $table->double('lat');
            $table->double('lng');
            $table->integer('priority');
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
        Schema::dropIfExists('cities');
    }
}
