<?php

namespace App\Repositories;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use App\Models\Book;

interface BookRepositoryInterface
{
    public function getAll(array $filters): LengthAwarePaginator;
    public function getById(int $id): ?Book;
    public function create(array $data): Book;
    public function markAsRented(Book $book): Book;
    public function markAsReturned(Book $book): Book;
}
