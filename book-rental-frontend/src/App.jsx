import React from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import LoginPage from './auth/LoginPage';
import RegisterPage from './auth/RegisterPage';
import BookList from './features/books/BookList';
import BookDetail from './features/books/BookDetail';
import AddBookForm from './features/books/AddBookForm';
import Navbar from './components/Navbar';
import PrivateRoute from './routes/PrivateRoute';
import NotFound from './pages/NotFound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AppContent = () => {
  const location = useLocation();
  const hideNavbarOn = ['/login', '/register'];
  const shouldHideNavbar = hideNavbarOn.includes(location.pathname);

  return (
    <>
        {!shouldHideNavbar && <Navbar />}
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* Redirect root / to /books if authenticated, otherwise to /login via PrivateRoute */}
                <Route
                    path="/"
                    element={
                    <PrivateRoute>
                        <Navigate to="/books" />
                    </PrivateRoute>
                    }
                />

                <Route
                    path="/books"
                    element={
                    <PrivateRoute>
                        <BookList />
                    </PrivateRoute>
                    }
                />
                <Route
                    path="/books/:id"
                    element={
                    <PrivateRoute>
                        <BookDetail />
                    </PrivateRoute>
                    }
                />
                <Route
                    path="/add"
                    element={
                    <PrivateRoute>
                        <AddBookForm />
                    </PrivateRoute>
                    }
                />
                <Route path="*" element={<NotFound />} />
                </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

const App = () => (
  <BrowserRouter>
    <AppContent />
  </BrowserRouter>
);

export default App;
