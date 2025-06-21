<?php

namespace App\Services;

use App\Repositories\BookRepositoryInterface;
use App\Models\Book;

class BookService
{
    public function __construct(protected BookRepositoryInterface $repo) {}

    public function list(array $filters)
    {
        return $this->repo->getAll($filters);
    }

    public function detail(int $id)
    {
        return $this->repo->getById($id);
    }

    public function create(array $data)
    {
        return $this->repo->create($data);
    }

    public function rent(Book $book)
    {
        return $this->repo->markAsRented($book);
    }

    public function return(Book $book)
    {
        return $this->repo->markAsReturned($book);
    }
}
