import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Container,
  Paper,
  Fade,
  Slide,
  Zoom,
} from '@mui/material';
import {
  Nature,
  AccountBalance,
  TrendingUp,
  Security,
  Speed,
  Public,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: <AccountBalance sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Blockchain Marketplace',
      description: 'Buy and sell carbon credit tokens in a transparent, secure marketplace powered by Hedera.',
    },
    {
      icon: <Nature sx={{ fontSize: 40, color: 'info.main' }} />,
      title: 'Carbon Credit Tokenization',
      description: 'Transform clean cooking device distributions into tradeable carbon credit tokens on the blockchain.',
    },
    {
      icon: <Security sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Secure & Transparent',
      description: 'All transactions are recorded on the Hedera blockchain for complete transparency and security.',
    },
    {
      icon: <TrendingUp sx={{ fontSize: 40, color: 'info.main' }} />,
      title: 'Investment Opportunity',
      description: 'Invest in the future of carbon credits with forward-looking tokenized assets.',
    },
    {
      icon: <Speed sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Real-time Data',
      description: 'Monitor device usage and carbon credit generation in real-time across Africa.',
    },
    {
      icon: <Public sx={{ fontSize: 40, color: 'info.main' }} />,
      title: 'Global Impact',
      description: 'Support clean cooking initiatives across 9 African countries with measurable environmental impact.',
    },
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)',
      color: 'white'
    }}>
      {/* Hero Section */}
      <Fade in={isLoaded} timeout={1000}>
        <Paper
          sx={{
            background: 'linear-gradient(135deg, #1976D2 0%, #42A5F5 100%)',
            color: 'white',
            py: 8,
            mb: 6,
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.1) 100%)',
              animation: 'shimmer 3s ease-in-out infinite',
            },
            '@keyframes shimmer': {
              '0%': { transform: 'translateX(-100%)' },
              '100%': { transform: 'translateX(100%)' },
            },
          }}
        >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ textAlign: 'center' }}>
            <Slide direction="down" in={isLoaded} timeout={800}>
              <Typography 
                variant="h2" 
                component="h1" 
                gutterBottom 
                fontWeight="bold"
                sx={{
                  background: 'linear-gradient(45deg, #ffffff 30%, #e3f2fd 90%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 30px rgba(255,255,255,0.5)',
                }}
              >
                UpEnergy Carbon Credit Marketplace
              </Typography>
            </Slide>
            <Fade in={isLoaded} timeout={1200}>
              <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
                Tokenizing Clean Cooking Impact Across Africa
              </Typography>
            </Fade>
            <Fade in={isLoaded} timeout={1400}>
              <Typography variant="body1" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
                Join the future of carbon credit trading. Our platform transforms clean cooking device 
                distributions into tradeable blockchain tokens, creating new opportunities for 
                environmental impact investment.
              </Typography>
            </Fade>
            <Zoom in={isLoaded} timeout={1600}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                {!isAuthenticated ? (
                  <>
                    <Button
                      variant="contained"
                      size="large"
                      onClick={() => navigate('/login')}
                      sx={{
                        bgcolor: 'white',
                        color: 'primary.main',
                        '&:hover': { 
                          bgcolor: 'grey.100',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                        },
                        textTransform: 'none',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      Get Started
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      onClick={() => navigate('/marketplace')}
                      sx={{
                        borderColor: 'white',
                        color: 'white',
                        '&:hover': { 
                          borderColor: 'white', 
                          bgcolor: 'rgba(255,255,255,0.1)',
                          transform: 'translateY(-2px)',
                        },
                        textTransform: 'none',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      Explore Marketplace
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="contained"
                      size="large"
                      onClick={() => navigate('/dashboard')}
                      sx={{
                        bgcolor: 'white',
                        color: 'primary.main',
                        '&:hover': { 
                          bgcolor: 'grey.100',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                        },
                        textTransform: 'none',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      Go to Dashboard
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      onClick={() => navigate('/marketplace')}
                      sx={{
                        borderColor: 'white',
                        color: 'white',
                        '&:hover': { 
                          borderColor: 'white', 
                          bgcolor: 'rgba(255,255,255,0.1)',
                          transform: 'translateY(-2px)',
                        },
                        textTransform: 'none',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      Browse Tokens
                    </Button>
                  </>
                )}
              </Box>
            </Zoom>
          </Box>
        </Container>
      </Paper>
      </Fade>

      {/* Features Section */}
      <Container maxWidth="lg">
        <Fade in={isLoaded} timeout={1800}>
          <Typography variant="h3" component="h2" textAlign="center" gutterBottom sx={{ color: 'white' }}>
            Why Choose UpEnergy?
          </Typography>
        </Fade>
        <Fade in={isLoaded} timeout={2000}>
          <Typography variant="h6" textAlign="center" sx={{ mb: 6, color: 'rgba(255,255,255,0.8)' }}>
            Leading the transformation of carbon credit markets through blockchain technology
          </Typography>
        </Fade>

        {/* Horizontal Features Section */}
        <Fade in={isLoaded} timeout={2200}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', lg: 'row' },
            gap: 3,
            mb: 8,
            overflowX: { lg: 'auto' },
            pb: 2,
          }}>
            {features.map((feature, index) => (
              <Fade in={isLoaded} timeout={2200 + index * 200} key={index}>
                <Card sx={{ 
                  minWidth: { xs: '100%', lg: '300px' },
                  flex: { lg: '1' },
                  textAlign: 'center', 
                  p: 3,
                  background: 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'white',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                    background: 'rgba(255,255,255,0.1)',
                  },
                }}>
                  <CardContent sx={{ p: 0 }}>
                    <Box sx={{ mb: 2 }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" component="h3" gutterBottom sx={{ color: 'white', mb: 2 }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Fade>
            ))}
          </Box>
        </Fade>

        {/* Stats Section */}
        <Fade in={isLoaded} timeout={3000}>
          <Paper sx={{ 
            p: 4, 
            mb: 6, 
            background: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: 'white',
          }}>
            <Typography variant="h4" textAlign="center" gutterBottom sx={{ color: 'white' }}>
              Platform Impact
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: 4, sm: 2 },
              mt: 2,
              px: { xs: 2, sm: 0 }
            }}>
              <Box sx={{ 
                textAlign: 'center', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                flex: 1,
                minWidth: 0
              }}>
                <Typography variant="h3" color="primary.light" fontWeight="bold" sx={{ mb: 1 }}>
                  9
                </Typography>
                <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.8)', textAlign: 'center' }}>
                  African Countries
                </Typography>
              </Box>
              <Box sx={{ 
                textAlign: 'center', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                flex: 1,
                minWidth: 0
              }}>
                <Typography variant="h3" color="info.light" fontWeight="bold" sx={{ mb: 1 }}>
                  10,000+
                </Typography>
                <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.8)', textAlign: 'center' }}>
                  Devices Distributed
                </Typography>
              </Box>
              <Box sx={{ 
                textAlign: 'center', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                flex: 1,
                minWidth: 0
              }}>
                <Typography variant="h3" color="primary.light" fontWeight="bold" sx={{ mb: 1 }}>
                  1,000
                </Typography>
                <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.8)', textAlign: 'center' }}>
                  Active Monitoring
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Fade>

        {/* CTA Section */}
        <Fade in={isLoaded} timeout={3200}>
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <Typography variant="h4" gutterBottom sx={{ color: 'white' }}>
              Ready to Start Trading?
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, color: 'rgba(255,255,255,0.8)' }}>
              Join the carbon credit revolution and start trading tokens today.
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate(isAuthenticated ? '/marketplace' : '/login')}
              sx={{ 
                textTransform: 'none',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              {isAuthenticated ? 'Go to Marketplace' : 'Get Started Now'}
            </Button>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default Home;
