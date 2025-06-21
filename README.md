## Mini Book Rental Platform 

A Mini Book Rental Platform for a a small library, with Laravel and React.js.

### Tech Stack

- **Backend**: Laravel 10.0 + JWT
- **Frontend**: React, Redux Toolkit & Material UI 
- **Database**: MySQL

### Features

- View all books
- Filter by availability or author
- View detailed info about a book
- Rent or return books
- Admins can add new books


## Setup Instructions

### Prerequisites
- PHP 8.1 or higher
- Composer
- Node.js 18+ and npm
- MySQL

### Installation

1. Clone the repository
```bash
    git clone <your-repo-url>
```

### Backend Setup (Laravel)

1. Navigate to backend folder
```bash
    cd book-rental-backend
```

2. Install PHP dependencies
```bash
composer install
```

3. setup env file
```bash
cp .env.example .env
```

4. Generate application key
```bash
php artisan key:generate
```

5. Configure your .env database section
```bash
DB_CONNECTION=mysql
DB_DATABASE=book_rental
DB_USERNAME=
DB_PASSWORD=
```

6. Run migrations and seeders
```bash
php artisan migrate --seed
```

7. Setup JWT secret
```bash
php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider"
php artisan jwt:secret

```

8. Run the server
```bash
php artisan serve
```


### Frontend Setup (React)

1. Navigate to frontend folder
```bash
    cd book-rental-frontend
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm start
```

Visit http://localhost:3000 to access the Frontend.


## Run Tests
```bash
php artisan test
```

## Sample Credentials

1. Admin User
```bash
Email: admin@example.com
Password: Admin@123
```

2. Regular User
```bash
Email: user@example.com
Password: User@123
```