import React from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from './authSlice';
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

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post('http://localhost:8000/api/login', data);
      dispatch(loginSuccess({ token: res.data.token, role: res.data.role }));
      navigate('/books');
    } catch (err) {
      alert('Login failed');
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
            Log in
          </Typography>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            {...register('email')}
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            {...register('password')}
            margin="normal"
            variant="outlined"
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            size="large"
            sx={{ mt: 2, py: 1.5, borderRadius: 2 }}
          >
            Login
          </Button>
        </form>

        <Box textAlign="center" mt={2}>
          <Typography variant="body2">
            Don't have an account?{' '}
            <Button size="small" onClick={() => navigate('/register')}>
              Register
            </Button>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;
