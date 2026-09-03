<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
{
    Schema::table('products', function (Blueprint $table) {
        $table->string('name_fr')->nullable()->after('name');
        $table->string('name_ar')->nullable()->after('name_fr');
        $table->text('description_fr')->nullable()->after('description');
        $table->text('description_ar')->nullable()->after('description_fr');
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            //
        });
    }
};
