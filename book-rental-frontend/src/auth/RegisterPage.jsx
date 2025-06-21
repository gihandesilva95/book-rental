import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
} from '@mui/material';
import { toast } from 'react-toastify';

const RegisterPage = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await axios.post('http://localhost:8000/api/register', data);
      toast.success('Registered successfully! Please log in.');
      reset();
      navigate('/login');
    } catch (err) {
      console.error('Registration error:', err);
      toast.error(err?.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <Paper elevation={4} sx={{ p: 4, width: '100%', borderRadius: 3 }}>
        <Box textAlign="center" mb={3}>
          <Typography variant="h4" fontWeight="bold" color="primary">
            Book Rental Platform
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Register
          </Typography>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="Name"
            {...register('name')}
            margin="normal"
            variant="outlined"
            required
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            {...register('email')}
            margin="normal"
            variant="outlined"
            required
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            {...register('password')}
            margin="normal"
            variant="outlined"
            required
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            size="large"
            sx={{ mt: 2, py: 1.5, borderRadius: 2 }}
          >
            Register
          </Button>
        </form>

        <Box textAlign="center" mt={2}>
          <Typography variant="body2">
            Already have an account?{' '}
            <Button size="small" onClick={() => navigate('/login')}>
              Login
            </Button>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default RegisterPage;
