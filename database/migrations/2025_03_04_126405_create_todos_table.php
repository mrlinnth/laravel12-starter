<?php

use App\Enums\TodoStatusEnum;
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
        Schema::disableForeignKeyConstraints();

        Schema::create('todos', function (Blueprint $table) {
            $table->id();
            $table->string('title', 400);
            $table->text('content');
            $table->foreignId('creator_id')->constrained('users');
            $table->enum('status', array_column(TodoStatusEnum::cases(), 'value'));
            $table->timestamp('completed_at')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('todos');
    }
};
