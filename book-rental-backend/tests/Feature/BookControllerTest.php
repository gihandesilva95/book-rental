<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Artisan;
use Tests\TestCase;
use App\Models\User;
use App\Models\Book;

class BookControllerTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        
        Artisan::call('db:seed');
    }

    public function test_authenticated_user_can_view_books()
    {
        $user = User::first();

        $response = $this->actingAs($user, 'api')->getJson('/api/books');

        $response->assertStatus(200)
                 ->assertJsonStructure(['data']);
    }

    public function test_admin_can_create_book()
    {
        $admin = User::where('role', 'admin')->first();

        $response = $this->actingAs($admin, 'api')->postJson('/api/books/create', [
            'title' => 'Seeder Test Book',
            'author' => 'Seeder Author',
            'published_date' => '2022-01-01',
        ]);

        $response->assertStatus(201);
        $this->assertDatabaseHas('books', ['title' => 'Seeder Test Book']);
    }

    public function test_user_cannot_create_book()
    {
        $user = User::where('role', 'user')->first();

        $response = $this->actingAs($user, 'api')->postJson('/api/books/create', [
            'title' => 'Unauthorized',
            'author' => 'Blocked',
            'published_date' => '2022-01-01',
        ]);

        $response->assertStatus(403); 
    }

    public function test_rent_and_return_book()
    {
        $user = User::where('role', 'user')->first();
        $book = Book::where('is_available', true)->first();

        // Rent
        $rentResponse = $this->actingAs($user, 'api')->postJson("/api/books/{$book->id}/rent");
        $rentResponse->assertStatus(200);
        $this->assertFalse($book->fresh()->is_available);

        // Return
        $returnResponse = $this->actingAs($user, 'api')->postJson("/api/books/{$book->id}/return");
        $returnResponse->assertStatus(200);
        $this->assertTrue($book->fresh()->is_available);
    }
}
