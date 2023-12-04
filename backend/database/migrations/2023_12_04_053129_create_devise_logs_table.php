<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDeviseLogsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('devise_logs', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id')->nullable();
            $table->enum('device_type', ['android', 'ios', 'other'])->default('android');
            $table->string('device_id', 300)->nullable();
            $table->string('fcm_token', 300)->nullable();
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
        Schema::dropIfExists('devise_logs');
    }
}
