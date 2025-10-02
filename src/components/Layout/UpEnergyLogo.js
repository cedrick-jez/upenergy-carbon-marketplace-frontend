import React from 'react';
import { Box, Typography } from '@mui/material';

const UpEnergyLogo = ({ size = 'medium', showText = true }) => {
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return { width: 24, height: 24 };
      case 'large':
        return { width: 48, height: 48 };
      default:
        return { width: 32, height: 32 };
    }
  };

  const getTextSize = () => {
    switch (size) {
      case 'small':
        return 'body2';
      case 'large':
        return 'h5';
      default:
        return 'h6';
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      {/* Logo Icon - Stylized energy circles */}
      <Box sx={{ position: 'relative', ...getSizeStyles() }}>
        {/* Energy circles representing upward movement */}
        <Box
          sx={{
            position: 'absolute',
            width: 6,
            height: 6,
            borderRadius: '50%',
            bgcolor: 'currentColor',
            bottom: 2,
            left: 2,
            opacity: 0.8,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            width: 8,
            height: 8,
            borderRadius: '50%',
            bgcolor: 'currentColor',
            bottom: 6,
            left: 6,
            opacity: 0.9,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            width: 10,
            height: 10,
            borderRadius: '50%',
            bgcolor: 'currentColor',
            bottom: 10,
            left: 8,
            opacity: 1,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            width: 8,
            height: 8,
            borderRadius: '50%',
            bgcolor: 'currentColor',
            bottom: 16,
            left: 10,
            opacity: 0.9,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            width: 6,
            height: 6,
            borderRadius: '50%',
            bgcolor: 'currentColor',
            bottom: 20,
            left: 12,
            opacity: 0.8,
          }}
        />
      </Box>
      
      {showText && (
        <Typography 
          variant={getTextSize()} 
          component="div" 
          sx={{ 
            fontWeight: 'bold',
            color: 'inherit'
          }}
        >
          UpEnergy
        </Typography>
      )}
    </Box>
  );
};

export default UpEnergyLogo;
