<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Book extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'author',
        'published_date',
        'is_available'
    ];

    protected $casts = [
        'published_date' => 'date',
        'is_available' => 'boolean',
    ];
}