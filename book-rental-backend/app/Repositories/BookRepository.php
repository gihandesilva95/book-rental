<?php

namespace App\Repositories;

use App\Models\Book;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;


class BookRepository implements BookRepositoryInterface
{
    public function getAll(array $filters): LengthAwarePaginator
    {
        $query = Book::query();

        if (!empty($filters['author'])) {
            $query->where('author', 'like', '%' . $filters['author'] . '%');
        }

        if (isset($filters['available'])) {
            $available = filter_var($filters['available'], FILTER_VALIDATE_BOOLEAN);
            $query->where('is_available', $available);
        }

        return $query->paginate(10);
    }


    public function getById(int $id): ?Book
    {
        return Book::find($id);
    }

    public function create(array $data): Book
    {
        return Book::create($data);
    }

    public function markAsRented(Book $book): Book
    {
        $book->update(['is_available' => false]);
        return $book;
    }

    public function markAsReturned(Book $book): Book
    {
        $book->update(['is_available' => true]);
        return $book;
    }
}
