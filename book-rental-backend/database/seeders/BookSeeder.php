<?php

namespace Database\Seeders;

use App\Models\Book;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class BookSeeder extends Seeder
{
    public function run(): void
    {
        $books = [
            [
                'title' => 'The Great Gatsby',
                'author' => 'F. Scott Fitzgerald',
                'published_date' => '1925-04-10',
                'is_available' => true,
            ],
            [
                'title' => 'To Kill a Mockingbird',
                'author' => 'Harper Lee',
                'published_date' => '1960-07-11',
                'is_available' => true,
            ],
            [
                'title' => '1984',
                'author' => 'George Orwell',
                'published_date' => '1949-06-08',
                'is_available' => false,
            ],
            [
                'title' => 'Pride and Prejudice',
                'author' => 'Jane Austen',
                'published_date' => '1813-01-28',
                'is_available' => true,
            ],
            [
                'title' => 'The Catcher in the Rye',
                'author' => 'J.D. Salinger',
                'published_date' => '1951-07-16',
                'is_available' => true,
            ],
        ];

        foreach ($books as $book) {
            Book::create($book);
        }
    }
}