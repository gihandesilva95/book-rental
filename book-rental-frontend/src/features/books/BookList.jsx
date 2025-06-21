import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetBooksQuery } from './booksApi';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Checkbox,
  FormControlLabel,
  Pagination,
  CircularProgress,
  Typography,
  Chip,
  InputAdornment,
  Card,
  CardContent,
  Stack,
  Button,
  Tooltip
} from '@mui/material';
import {
  Book as BookIcon,
  Person as PersonIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Visibility as VisibilityIcon
} from '@mui/icons-material';

const BookList = () => {
  const [author, setAuthor] = useState('');
  const [available, setAvailable] = useState(false);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();


  const { data, isLoading, error } = useGetBooksQuery({ 
    author, 
    available: available ? true : undefined, 
    page 
  });

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Stack alignItems="center" spacing={2}>
          <CircularProgress size={60} thickness={4} />
          <Typography variant="h6" color="text.secondary">
            Loading books...
          </Typography>
        </Stack>
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Card sx={{ maxWidth: 400, textAlign: 'center' }}>
          <CardContent>
            <CancelIcon sx={{ fontSize: 60, color: 'error.main', mb: 2 }} />
            <Typography variant="h6" color="error" gutterBottom>
              Error Loading Books
            </Typography>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h1" gutterBottom sx={{ 
          fontWeight: 700, 
          color: '#1e293b',
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}>
          Book Library
        </Typography>
      </Box>

      {/* Filters Card */}
      <Card sx={{ mb: 3, boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
        <CardContent>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
            <TextField
              label="Search by Author"
              value={author}
              onChange={e => setAuthor(e.target.value)}
              variant="outlined"
              size="medium"
              sx={{ minWidth: 300 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
            <FormControlLabel
              control={
                <Checkbox 
                  checked={available} 
                  onChange={e => setAvailable(e.target.checked)}
                  color="primary"
                />
              }
              label="Show Available Only"
              sx={{ 
                backgroundColor: available ? 'primary.50' : 'transparent',
                borderRadius: 1,
                px: 1,
                transition: 'background-color 0.2s'
              }}
            />
          </Stack>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="body1" color="text.secondary">
          {data?.data.length !== 0 ? `Showing ${data.data.length} books` : 'No books found'}
        </Typography>
      </Box>

      {/* Books Table */}
      {data?.data.length === 0 ? (
        <Card sx={{ textAlign: 'center', py: 6 }}>
          <CardContent>
            <BookIcon sx={{ fontSize: 80, color: 'text.disabled', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No Books Found
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <TableContainer 
          component={Paper} 
          sx={{ 
            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
            borderRadius: 2,
            overflow: 'hidden'
          }}
        >
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'primary.main' }}>
                <TableCell sx={{ color: 'white', fontWeight: 600, fontSize: '0.95rem' }}>
                  Book Name
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600, fontSize: '0.95rem' }}>
                  Author
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600, fontSize: '0.95rem' }}>
                  Status
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600, fontSize: '0.95rem' }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.data.map((book, index) => (
                <TableRow 
                  key={book.id}
                  sx={{ 
                    '&:nth-of-type(odd)': { backgroundColor: '#f8fafc' }
                  }}
                >
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box>
                        <Typography variant="subtitle2" fontWeight={600}>
                          {book.title}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {book.author || 'Unknown Author'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      icon={book.is_available ? <CheckCircleIcon /> : <CancelIcon />}
                      label={book.is_available ? 'Available' : 'Not Available'}
                      color={book.is_available ? 'success' : 'error'}
                      size="small"
                      sx={{ minWidth: 110 }}
                    />
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Tooltip title="View Details">
                        <Button
                          size="small"
                          color="primary"
                          onClick={() => navigate(`/books/${book.id}`)}
                          startIcon={<VisibilityIcon fontSize="small" />}
                        >
                          View
                        </Button>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Pagination */}
      {data?.last_page > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={data.last_page}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
            size="large"
            sx={{
              '& .MuiPaginationItem-root': {
                fontSize: '1rem',
                fontWeight: 500
              }
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default BookList;