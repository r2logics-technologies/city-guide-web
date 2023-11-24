<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->text('avatar')->nullable();
            $table->string('name');
            $table->string('password')->nullable();
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('country_code', 10)->default('+91');
            $table->string('mobile', 20)->nullable();
            $table->string('facebook')->nullable();
            $table->string('instagram')->nullable();
            $table->text('address')->nullable();
            $table->enum('user_type', ['admin', 'employee', 'customer', 'super_admin',])->default('customer');
            $table->text('fcm_topics')->nullable()->comment('Comma separated values');
            $table->enum('status', ['activated', 'deactivated', 'deleted'])->default('activated');
            $table->rememberToken();
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
        Schema::dropIfExists('users');
    }
}
