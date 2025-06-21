import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetBookQuery, useRentBookMutation, useReturnBookMutation } from './booksApi';
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Button,
  Chip,
  Divider,
} from '@mui/material';
import { toast } from 'react-toastify';
import BookIcon from '@mui/icons-material/Book';
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const BookDetail = () => {
  const { id } = useParams();

  const {
    data,
    isLoading,
    error,
    refetch,
  } = useGetBookQuery(id, {
    refetchOnMountOrArgChange: true, // force fetch on route change
  });

  const [rentBook, { isLoading: renting }] = useRentBookMutation();
  const [returnBook, { isLoading: returning }] = useReturnBookMutation();

  const book = data?.data || {};

  const handleRent = async () => {
    try {
      await rentBook(id).unwrap();
      toast.success('Book rented successfully');
      refetch(); 
    } catch (err) {
      console.error('Rent failed:', err);
      toast.error(err?.data?.error || 'Failed to rent book');
    }
  };

  const handleReturn = async () => {
    try {
      await returnBook(id).unwrap();
      toast.success('Book returned successfully');
      refetch();
    } catch (err) {
      console.error('Return failed:', err);
      toast.error(err?.data?.error || 'Failed to return book');
    }
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt={5}>
        <Typography color="error">Error loading book details</Typography>
      </Box>
    );
  }

  return (
    <Box display="flex" justifyContent="center" mt={6} px={2}>
      <Paper elevation={4} sx={{ p: 4, maxWidth: 600, width: '100%', borderRadius: 3 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          <BookIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          {book.title}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" sx={{ mb: 1 }}>
          <PersonIcon fontSize="small" sx={{ mr: 1 }} />
          Author: {book.author}
        </Typography>

        <Typography variant="body1" sx={{ mb: 2 }}>
          <CalendarMonthIcon fontSize="small" sx={{ mr: 1 }} />
          Published: {book.published_date}
        </Typography>

        <Chip
          label={book.is_available ? 'Available' : 'Rented'}
          color={book.is_available ? 'success' : 'default'}
          icon={book.is_available ? <CheckCircleIcon /> : <CancelIcon />}
          variant="outlined"
          sx={{ fontWeight: 600, fontSize: '0.9rem', mb: 3 }}
        />

        {book.is_available ? (
          <Button
            variant="contained"
            disabled={renting}
            onClick={handleRent}
            fullWidth
            sx={{
              mt: 2,
              py: 1.5,
              fontWeight: 'bold',
              fontSize: '1rem',
              background: '#00aaff',
              color: '#fff',
              '&:hover': {
                background: '#0072ff',
              },
            }}
          >
            {renting ? 'Renting...' : 'Rent this Book'}
          </Button>
        ) : (
          <Button
            variant="outlined"
            disabled={returning}
            onClick={handleReturn}
            fullWidth
            sx={{
              mt: 2,
              py: 1.5,
              fontWeight: 'bold',
              fontSize: '1rem',
              color: '#0072ff',
              borderColor: '#0072ff',
              '&:hover': {
                background: '#e3f2fd',
              },
            }}
          >
            {returning ? 'Returning...' : 'Return this Book'}
          </Button>
        )}

      </Paper>
    </Box>
  );
};

export default BookDetail;
