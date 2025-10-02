import React, { useState } from 'react';
import {
  Drawer,
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  Chip,
  Alert,
  TextField,
  InputAdornment,
  Paper,
  Stack,
  Fade,
  Zoom,
} from '@mui/material';
import {
  Close,
  Delete,
  Add,
  Remove,
  ShoppingCart as ShoppingCartIcon,
  Warning,
  AttachMoney,
  CheckCircle,
} from '@mui/icons-material';
import { useCart } from '../../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

const ShoppingCart = ({ open, onClose }) => {
  const navigate = useNavigate();
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getSubtotal,
    getFees,
    getTotal,
    getFCTItems,
    getVerifiedItems,
  } = useCart();

  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleQuantityChange = (tokenId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(tokenId);
    } else {
      updateQuantity(tokenId, newQuantity);
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate checkout process
    setTimeout(() => {
      navigate('/checkout');
      onClose();
      setIsCheckingOut(false);
    }, 1000);
  };

  const fctItems = getFCTItems();
  const verifiedItems = getVerifiedItems();

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: { xs: '100%', sm: 400 },
          background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
          color: 'white',
        },
      }}
    >
      <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" component="h2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ShoppingCartIcon />
            Shopping Cart
          </Typography>
          <IconButton onClick={onClose} sx={{ color: 'white' }}>
            <Close />
          </IconButton>
        </Box>

        {/* Cart Items */}
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          {items.length === 0 ? (
            <Fade in timeout={600}>
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <ShoppingCartIcon sx={{ fontSize: 64, color: 'rgba(255,255,255,0.3)', mb: 2 }} />
                <Typography variant="h6" color="rgba(255,255,255,0.7)">
                  Your cart is empty
                </Typography>
                <Typography variant="body2" color="rgba(255,255,255,0.5)">
                  Add some carbon credits to get started
                </Typography>
              </Box>
            </Fade>
          ) : (
            <List sx={{ p: 0 }}>
              {/* FCT Items with Warning */}
              {fctItems.length > 0 && (
                <>
                  <Alert 
                    severity="warning" 
                    sx={{ 
                      mb: 2, 
                      bgcolor: 'rgba(255,152,0,0.1)',
                      border: '1px solid rgba(255,152,0,0.3)',
                      '& .MuiAlert-message': { color: 'white' }
                    }}
                  >
                    <Typography variant="body2">
                      <strong>Forward Credit Tokens</strong> - Higher risk than verified credits
                    </Typography>
                  </Alert>
                  
                  {fctItems.map((item, index) => (
                    <Fade in timeout={600 + index * 100} key={item.tokenId}>
                      <Paper sx={{ 
                        mb: 2, 
                        p: 2, 
                        bgcolor: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,152,0,0.3)',
                      }}>
                        <ListItem sx={{ p: 0 }}>
                          <ListItemText
                            primary={
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                <Typography variant="subtitle1" sx={{ color: 'white' }}>
                                  {item.name}
                                </Typography>
                                <Chip 
                                  label="FCT" 
                                  size="small" 
                                  color="warning" 
                                  variant="filled"
                                />
                              </Box>
                            }
                            secondary={
                              <Box>
                                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                                  {item.location} • {item.vintage}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                                  {item.methodology} • {item.registry}
                                </Typography>
                              </Box>
                            }
                          />
                          <ListItemSecondaryAction>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <IconButton 
                                  size="small" 
                                  onClick={() => handleQuantityChange(item.tokenId, item.quantity - 1)}
                                  sx={{ color: 'white' }}
                                >
                                  <Remove />
                                </IconButton>
                                <TextField
                                  size="small"
                                  value={item.quantity}
                                  onChange={(e) => handleQuantityChange(item.tokenId, parseInt(e.target.value) || 1)}
                                  inputProps={{ 
                                    min: 1, 
                                    max: item.availableTons,
                                    style: { 
                                      textAlign: 'center', 
                                      width: '50px',
                                      color: 'white',
                                      backgroundColor: 'rgba(255,255,255,0.1)',
                                    }
                                  }}
                                  sx={{
                                    '& .MuiOutlinedInput-root': {
                                      '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                                      '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.5)' },
                                    },
                                  }}
                                />
                                <IconButton 
                                  size="small" 
                                  onClick={() => handleQuantityChange(item.tokenId, item.quantity + 1)}
                                  sx={{ color: 'white' }}
                                >
                                  <Add />
                                </IconButton>
                              </Box>
                              <Typography variant="body2" sx={{ color: 'white', fontWeight: 'bold' }}>
                                ${(item.price * item.quantity).toFixed(2)}
                              </Typography>
                              <IconButton 
                                size="small" 
                                onClick={() => removeFromCart(item.tokenId)}
                                sx={{ color: 'rgba(255,255,255,0.5)' }}
                              >
                                <Delete />
                              </IconButton>
                            </Box>
                          </ListItemSecondaryAction>
                        </ListItem>
                      </Paper>
                    </Fade>
                  ))}
                </>
              )}

              {/* Verified Items */}
              {verifiedItems.length > 0 && (
                <>
                  {fctItems.length > 0 && <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.2)' }} />}
                  
                  {verifiedItems.map((item, index) => (
                    <Fade in timeout={600 + (fctItems.length + index) * 100} key={item.tokenId}>
                      <Paper sx={{ 
                        mb: 2, 
                        p: 2, 
                        bgcolor: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(76,175,80,0.3)',
                      }}>
                        <ListItem sx={{ p: 0 }}>
                          <ListItemText
                            primary={
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                <Typography variant="subtitle1" sx={{ color: 'white' }}>
                                  {item.name}
                                </Typography>
                                <Chip 
                                  label="Verified" 
                                  size="small" 
                                  color="success" 
                                  variant="filled"
                                  icon={<CheckCircle />}
                                />
                              </Box>
                            }
                            secondary={
                              <Box>
                                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                                  {item.location} • {item.vintage}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                                  {item.methodology} • {item.registry}
                                </Typography>
                              </Box>
                            }
                          />
                          <ListItemSecondaryAction>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <IconButton 
                                  size="small" 
                                  onClick={() => handleQuantityChange(item.tokenId, item.quantity - 1)}
                                  sx={{ color: 'white' }}
                                >
                                  <Remove />
                                </IconButton>
                                <TextField
                                  size="small"
                                  value={item.quantity}
                                  onChange={(e) => handleQuantityChange(item.tokenId, parseInt(e.target.value) || 1)}
                                  inputProps={{ 
                                    min: 1, 
                                    max: item.availableTons,
                                    style: { 
                                      textAlign: 'center', 
                                      width: '50px',
                                      color: 'white',
                                      backgroundColor: 'rgba(255,255,255,0.1)',
                                    }
                                  }}
                                  sx={{
                                    '& .MuiOutlinedInput-root': {
                                      '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                                      '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.5)' },
                                    },
                                  }}
                                />
                                <IconButton 
                                  size="small" 
                                  onClick={() => handleQuantityChange(item.tokenId, item.quantity + 1)}
                                  sx={{ color: 'white' }}
                                >
                                  <Add />
                                </IconButton>
                              </Box>
                              <Typography variant="body2" sx={{ color: 'white', fontWeight: 'bold' }}>
                                ${(item.price * item.quantity).toFixed(2)}
                              </Typography>
                              <IconButton 
                                size="small" 
                                onClick={() => removeFromCart(item.tokenId)}
                                sx={{ color: 'rgba(255,255,255,0.5)' }}
                              >
                                <Delete />
                              </IconButton>
                            </Box>
                          </ListItemSecondaryAction>
                        </ListItem>
                      </Paper>
                    </Fade>
                  ))}
                </>
              )}
            </List>
          )}
        </Box>

        {/* Cart Summary */}
        {items.length > 0 && (
          <Zoom in timeout={800}>
            <Paper sx={{ 
              p: 3, 
              mt: 2, 
              bgcolor: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}>
              <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
                Order Summary
              </Typography>
              
              <Stack spacing={1} sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                    Subtotal ({getTotalItems()} items)
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'white' }}>
                    ${getSubtotal().toFixed(2)}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                    Platform fee (5%)
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'white' }}>
                    ${getFees().toFixed(2)}
                  </Typography>
                </Box>
                <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)' }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6" sx={{ color: 'white' }}>
                    Total
                  </Typography>
                  <Typography variant="h6" sx={{ color: 'white' }}>
                    ${getTotal().toFixed(2)}
                  </Typography>
                </Box>
              </Stack>

              <Stack spacing={2}>
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  sx={{
                    textTransform: 'none',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                    },
                  }}
                >
                  {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
                </Button>
                
                <Button
                  variant="outlined"
                  size="small"
                  fullWidth
                  onClick={clearCart}
                  sx={{
                    textTransform: 'none',
                    borderColor: 'rgba(255,255,255,0.3)',
                    color: 'rgba(255,255,255,0.7)',
                    '&:hover': {
                      borderColor: 'rgba(255,255,255,0.5)',
                      color: 'white',
                    },
                  }}
                >
                  Clear Cart
                </Button>
              </Stack>
            </Paper>
          </Zoom>
        )}
      </Box>
    </Drawer>
  );
};

export default ShoppingCart;
