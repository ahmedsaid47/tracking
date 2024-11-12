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
        Schema::create('geocodes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('vehicle_id')->constrained('vehicles')->onDelete('cascade');
            $table->decimal('start_latitude', 10, 7);
            $table->decimal('start_longitude', 10, 7);
            $table->decimal('end_latitude', 10, 7);
            $table->decimal('end_longitude', 10, 7);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('geocodes');
    }
};
