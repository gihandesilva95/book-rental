import React from 'react';
import { useForm } from 'react-hook-form';
import { useCreateBookMutation } from './booksApi';
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddBookForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [createBook, { isLoading }] = useCreateBookMutation();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log('Form data:', data); 
    try {
      await createBook(data).unwrap();
      toast.success('Book added successfully!');
      reset();
      navigate('/books');
    } catch (err) {
      console.error('Create book error:', err);
      toast.error(err?.data?.message || 'Failed to add book');
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      mt={5}
      px={2}
    >
      <Paper
        elevation={4}
        sx={{
          p: 4,
          borderRadius: 3,
          width: '100%',
          maxWidth: 500,
        }}
      >
        <Typography variant="h5" gutterBottom textAlign="center" fontWeight="bold">
          Add New Book
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <TextField
            label="📖 Title"
            placeholder="e.g., The Great Gatsby"
            fullWidth
            {...register('title', { required: 'Title is required' })}
            error={!!errors.title}
            helperText={errors.title?.message}
          />

          <TextField
            label="👤 Author"
            placeholder="e.g., F. Scott Fitzgerald"
            fullWidth
            {...register('author', { required: 'Author is required' })}
            error={!!errors.author}
            helperText={errors.author?.message}
          />

          <TextField
            label="📅 Published Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            {...register('published_date', {
              required: 'Published date is required',
            })}
            error={!!errors.published_date}
            helperText={errors.published_date?.message}
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={isLoading}
            sx={{
              background: ' #00aaff',
              fontWeight: 'bold',
              mt: 2,
              '&:hover': {
                background: ' #0072ff',
                
              },
            }}
          >
            {isLoading ? 'Adding...' : 'Add Book'}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default AddBookForm;
