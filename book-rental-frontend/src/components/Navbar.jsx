import React, { useEffect, useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  IconButton
} from '@mui/material';

import { 
  ExitToApp as LogoutIcon,
  BookOutlined as BookIcon,
  Add as AddIcon,
  ExpandMore as ExpandMoreIcon
} from '@mui/icons-material';

import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../auth/authSlice';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const reduxRole = useSelector((state) => state.auth.role);
  const [role, setRole] = useState(reduxRole || localStorage.getItem('role'));
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    setRole(reduxRole || storedRole);
  }, [reduxRole]);


  const handleLogout = async () => {
    try {
      await fetch('http://localhost:8000/api/logout', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      dispatch(logout());
      navigate('/login');
      setAnchorEl(null);

    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const userName = localStorage.getItem('name') || 'Test User';

  return (
    <AppBar 
      position="static" 
      elevation={0}
      sx={{
        backgroundColor: 'white',
        borderBottom: '1px solid #e0e0e0',
        color: '#333'
      }}
    >
      <Toolbar sx={{ px: { xs: 2, md: 4 }, py: 1 }}>
        {/* Logo/Brand */}
        <Typography 
          variant="h5" 
          component="div"
          sx={{ 
            flexGrow: 1,
            fontWeight: 600,
            color: '#1976d2',
            fontSize: { xs: '1.2rem', md: '1.5rem' }
          }}
        >
           Book Rental Platform
        </Typography>

        {token ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* Navigation Links */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
              <Button
                component={Link}
                to="/books"
                startIcon={<BookIcon />}
                sx={{
                  color: '#666',
                  textTransform: 'none',
                  fontWeight: 500,
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                    color: '#1976d2'
                  }
                }}
              >
                Books
              </Button>

              {role?.toLowerCase() === 'admin' && (
                <Button
                  component={Link}
                  to="/add"
                  startIcon={<AddIcon />}
                  sx={{
                    color: '#666',
                    textTransform: 'none',
                    fontWeight: 500,
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    '&:hover': {
                      backgroundColor: '#f5f5f5',
                      color: '#1976d2'
                    }
                  }}
                >
                  Add New Book
                </Button>
              )}
            </Box>

            {/* User Menu */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              
              <IconButton
                onClick={handleMenuClick}
                sx={{
                  p: 0.5,
                  border: '1px solid',
                  borderColor: open ? '#1976d2' : 'transparent',
                  borderRadius: 2,
                  '&:hover': {
                    borderColor: '#1976d2'
                  }
                }}
              >
                <Avatar 
                  sx={{ 
                    width: 32, 
                    height: 32, 
                    backgroundColor: '#1976d2',
                    fontSize: '0.875rem'
                  }}
                >
                  {userName.charAt(0).toUpperCase()}
                </Avatar>
                <ExpandMoreIcon 
                  sx={{ 
                    ml: 0.5, 
                    fontSize: '1rem',
                    color: '#666',
                    transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s'
                  }} 
                />
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                onClick={handleMenuClose}
                PaperProps={{
                  elevation: 3,
                  sx: {
                    mt: 1.5,
                    minWidth: 200,
                    borderRadius: 2,
                    '& .MuiMenuItem-root': {
                      px: 2,
                      py: 1.5,
                      borderRadius: 1,
                      mx: 1,
                      my: 0.5,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <Box sx={{ px: 2, py: 1 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    {userName}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#666' }}>
                    {role?.charAt(0).toUpperCase() + role?.slice(1).toLowerCase()}
                  </Typography>
                </Box>
                
                <Divider sx={{ my: 1 }} />

                {/* Mobile Navigation */}
                <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                  <MenuItem component={Link} to="/books">
                    <BookIcon sx={{ mr: 2, fontSize: '1.2rem' }} />
                        Books
                  </MenuItem>
                  
                  {role?.toLowerCase() === 'admin' && (
                    <MenuItem component={Link} to="/add">
                      <AddIcon sx={{ mr: 2, fontSize: '1.2rem' }} />
                      Add New Book
                    </MenuItem>
                  )}
                  
                  <Divider sx={{ my: 1 }} />
                </Box>

                <MenuItem onClick={handleLogout} sx={{ color: '#d32f2f' }}>
                  <LogoutIcon sx={{ mr: 2, fontSize: '1.2rem' }} />
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        ) : (
          <Button
            component={Link}
            to="/login"
            variant="contained"
            sx={{
              textTransform: 'none',
              fontWeight: 500,
              px: 3,
              py: 1,
              borderRadius: 2,
              boxShadow: 'none',
              '&:hover': {
                boxShadow: '0 2px 8px rgba(25, 118, 210, 0.3)'
              }
            }}
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;