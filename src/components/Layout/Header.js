import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Badge,
} from '@mui/material';
import {
  AccountCircle,
  ExitToApp,
  Dashboard,
  ShoppingCart,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import UpEnergyLogo from './UpEnergyLogo';
import ShoppingCartDrawer from '../Cart/ShoppingCart';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { getTotalItems } = useCart();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    handleClose();
  };

  const handleProfile = () => {
    navigate('/profile');
    handleClose();
  };

  return (
    <>
    <AppBar position="static" sx={{ backgroundColor: '#1976D2' }}>
      <Toolbar>
        <UpEnergyLogo size="medium" showText={false} sx={{ mr: 1 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          UpEnergy Carbon Credit Marketplace
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            color="inherit"
            onClick={() => navigate('/')}
            sx={{ textTransform: 'none' }}
          >
            Home
          </Button>
          
          <Button
            color="inherit"
            onClick={() => navigate('/marketplace')}
            sx={{ textTransform: 'none' }}
          >
            Marketplace
          </Button>

          {isAuthenticated && (
            <>
              <Button
                color="inherit"
                onClick={() => navigate('/dashboard')}
                startIcon={<Dashboard />}
                sx={{ textTransform: 'none' }}
              >
                Dashboard
              </Button>

              <IconButton
                color="inherit"
                onClick={() => setCartOpen(true)}
                sx={{ position: 'relative' }}
              >
                <Badge badgeContent={getTotalItems()} color="secondary">
                  <ShoppingCart />
                </Badge>
              </IconButton>

              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
                  {user?.name?.charAt(0) || <AccountCircle />}
                </Avatar>
              </IconButton>
              
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleProfile}>
                  <AccountCircle sx={{ mr: 1 }} />
                  Profile
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <ExitToApp sx={{ mr: 1 }} />
                  Logout
                </MenuItem>
              </Menu>
            </>
          )}

          {!isAuthenticated && (
            <Button
              color="inherit"
              onClick={() => navigate('/login')}
              sx={{ textTransform: 'none' }}
            >
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>

    {/* Shopping Cart Drawer */}
    <ShoppingCartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default Header;
