<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePlaceTypeTranslationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('place_type_translations', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id')->nullable();
            $table->integer('place_type_id')->unsigned();
            $table->string('locale')->index();
            $table->string('name');
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
        Schema::dropIfExists('place_type_translations');
    }
}
