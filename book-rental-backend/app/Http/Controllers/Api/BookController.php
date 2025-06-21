<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBookRequest;
use App\Http\Resources\BookResource;
use App\Models\Book;
use App\Services\BookService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class BookController extends Controller
{
    public function __construct(protected BookService $service) {}

    public function index(Request $request)
    {
        return BookResource::collection($this->service->list($request->query()));
    }

    public function show($id)
    {
        $book = $this->service->detail($id);
        return $book ? new BookResource($book) : response()->json(['error' => 'Not Found'], 404);
    }

    public function store(StoreBookRequest $request)
    {
        $book = $this->service->create($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Book created successfully',
            'data' => new BookResource($book)
        ], 201);
    }

    public function rent($id)
    {
        $book = Book::findOrFail($id);

        if (!$book->is_available) {
            return response()->json(['error' => 'Already rented'], 422);
        }

        $book = $this->service->rent($book);
        return new BookResource($book);
    }

    public function return($id)
    {
        $book = Book::findOrFail($id);
        
        if ($book->is_available) {
            return response()->json(['error' => 'Book already returned'], 422);
        }

        $book = $this->service->return($book);
        return new BookResource($book);
    }
}
