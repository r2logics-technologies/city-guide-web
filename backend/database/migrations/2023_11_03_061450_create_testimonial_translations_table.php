<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTestimonialTranslationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('testimonial_translations', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id')->nullable();
            $table->integer('testimonial_id')->unsigned();
            $table->string('name')->nullable();
            $table->string('job_title')->nullable();
            $table->string('content')->nullable();
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
        Schema::dropIfExists('testimonial_translations');
    }
}
