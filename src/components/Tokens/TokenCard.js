import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Chip,
  Grid,
  Divider,
  Stack,
  Rating,
  Fade,
  Zoom,
} from '@mui/material';
import {
  Sell,
  ShoppingCart,
  Visibility,
  Nature,
  Verified,
  Security,
  AttachMoney,
} from '@mui/icons-material';

const TokenCard = ({ token, onView, onSell, onBuy, userRole, userAccount }) => {
  const navigate = useNavigate();
  const { addToCart, isInCart, getItemQuantity } = useCart();
  const isForSale = token.for_sale === 1 || token.for_sale === true;
  const isOwner = token.account === userAccount;

  // Calculate environmental impact based on token data
  const calculateCO2Impact = (token) => {
    // Simulate CO2 reduction based on device type and location
    const baseReduction = 2.5; // kg CO2 per day
    const daysSinceDistribution = Math.floor(
      (new Date() - new Date(token.distribution_date)) / (1000 * 60 * 60 * 24)
    );
    return Math.max(0, baseReduction * daysSinceDistribution).toFixed(1);
  };

  // Generate blockchain transaction ID (simulated)
  const generateTransactionId = (token) => {
    return `0x${token.tokenId.replace(/[^a-zA-Z0-9]/g, '').substring(0, 16)}${Math.random().toString(16).substring(2, 8)}`;
  };

  // Generate professional carbon credit metadata with FCT support
  const generateProjectMetadata = (token) => {
    const methodologies = ['VCS-VM0007', 'Gold Standard-GS-VER', 'CDM-AMS-I.D'];
    const registries = ['VCS', 'Gold Standard', 'CDM'];
    const projectTypes = ['Clean Cooking', 'Renewable Energy', 'Clean Cooking'];
    const vintages = ['2023', '2024', '2025'];
    
    // Determine credit type - 70% FCT, 30% Verified for demo
    const isFCT = Math.random() < 0.7;
    const creditType = isFCT ? 'FCT' : 'Verified';
    
    return {
      methodology: methodologies[Math.floor(Math.random() * methodologies.length)],
      registry: registries[Math.floor(Math.random() * registries.length)],
      projectType: projectTypes[Math.floor(Math.random() * projectTypes.length)],
      vintage: vintages[Math.floor(Math.random() * vintages.length)],
      pricePerTon: isFCT ? (Math.random() * 10 + 3).toFixed(2) : (Math.random() * 20 + 8).toFixed(2), // FCT cheaper
      availableTons: Math.floor(Math.random() * 100 + 10),
      rating: (Math.random() * 2 + 3).toFixed(1),
      coBenefits: ['Health', 'Gender', 'Biodiversity'].slice(0, Math.floor(Math.random() * 3) + 1),
      creditType: creditType,
      isFCT: isFCT,
      fctStatus: isFCT ? ['Issued', 'Data Anchored', 'Pending Verification', 'Eligible to Convert'][Math.floor(Math.random() * 4)] : null,
      hcsTxHash: isFCT ? `0x${Math.random().toString(16).substring(2, 10)}${token.tokenId.replace(/[^a-zA-Z0-9]/g, '').substring(0, 8)}` : null,
      projectNFTId: isFCT ? `NFT-${token.tokenId}` : null,
      lastDataAnchor: isFCT ? new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString() : null
    };
  };

  const co2Reduction = calculateCO2Impact(token);
  const transactionId = generateTransactionId(token);
  const isBlockchainVerified = !!token.tokenId;
  const projectData = generateProjectMetadata(token);

  const getStatusColor = () => {
    if (isForSale) return 'info';
    if (isOwner) return 'primary';
    return 'default';
  };

  const getCreditTypeColor = (creditType) => {
    switch (creditType) {
      case 'FCT': return 'warning';
      case 'Verified': return 'success';
      case 'Retired': return 'default';
      default: return 'default';
    }
  };

  const getCreditTypeLabel = (creditType) => {
    switch (creditType) {
      case 'FCT': return 'Forward Credit Token';
      case 'Verified': return 'Verified Credit';
      case 'Retired': return 'Retired';
      default: return 'Credit';
    }
  };

  const getStatusText = () => {
    if (isForSale) return 'For Sale';
    if (isOwner) return 'Owned';
    return 'Available';
  };

  return (
    <Fade in timeout={600}>
      <Card 
        sx={{ 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-8px) scale(1.02)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
          },
        }}
      >
      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        {/* Project Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Typography variant="h6" component="h2" noWrap sx={{ fontWeight: 'bold' }}>
                {projectData.projectType} Project
              </Typography>
              <Chip
                label={projectData.creditType}
                color={getCreditTypeColor(projectData.creditType)}
                size="small"
                variant="filled"
              />
            </Box>
            <Typography variant="body2" color="text.secondary" noWrap>
              {token.village}, {token.country}
            </Typography>
            {projectData.isFCT && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                <Verified fontSize="small" color="warning" />
                <Typography variant="caption" color="warning.main">
                  {projectData.fctStatus}
                </Typography>
              </Box>
            )}
            {!projectData.isFCT && isBlockchainVerified && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                <Verified fontSize="small" color="success" />
                <Typography variant="caption" color="success.main">
                  {projectData.registry} Verified
                </Typography>
              </Box>
            )}
          </Box>
          <Chip
            label={getStatusText()}
            color={getStatusColor()}
            size="small"
            variant={isForSale ? 'filled' : 'outlined'}
          />
        </Box>

        {/* Project Metadata */}
        <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', gap: 0.5 }}>
          <Chip 
            label={`${projectData.vintage}`} 
            size="small" 
            variant="outlined" 
            color="primary"
          />
          <Chip 
            label={`${projectData.availableTons} tCO₂e`} 
            size="small" 
            variant="outlined" 
            color="secondary"
          />
          <Chip 
            label={`$${projectData.pricePerTon}/tCO₂e`} 
            size="small" 
            variant="outlined" 
            color="success"
            icon={<AttachMoney />}
          />
        </Stack>

        {/* Rating */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Rating value={parseFloat(projectData.rating)} precision={0.1} size="small" readOnly />
          <Typography variant="caption" color="text.secondary">
            {projectData.rating}/5.0
          </Typography>
        </Box>

        {/* Methodology & Registry */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            <strong>Methodology:</strong> {projectData.methodology}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            <strong>Registry:</strong> {projectData.registry}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            <strong>Project ID:</strong> {token.tokenId}
          </Typography>
          {projectData.isFCT && projectData.hcsTxHash && (
            <Typography variant="body2" color="text.secondary" gutterBottom>
              <strong>HCS Tx:</strong> {projectData.hcsTxHash.substring(0, 20)}...
            </Typography>
          )}
        </Box>

        {/* Co-benefits */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Co-benefits:
          </Typography>
          <Stack direction="row" spacing={0.5} sx={{ flexWrap: 'wrap', gap: 0.5 }}>
            {projectData.coBenefits.map((benefit, index) => (
              <Chip 
                key={index}
                label={benefit} 
                size="small" 
                variant="filled" 
                color="info"
                sx={{ fontSize: '0.7rem' }}
              />
            ))}
          </Stack>
        </Box>

        {/* Environmental Impact Section */}
        <Box sx={{
          mt: 2,
          p: 2,
          bgcolor: 'info.50', 
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'info.200'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Nature color="info" />
            <Typography variant="subtitle2" color="info.dark" fontWeight="bold">
              Environmental Impact
            </Typography>
          </Box>
          <Typography variant="h5" color="info.dark" fontWeight="bold">
            {co2Reduction} kg CO₂
          </Typography>
          <Typography variant="caption" color="info.dark">
            Reduced since distribution
          </Typography>
        </Box>

        {/* FCT Risk Disclosure */}
        {projectData.isFCT && (
          <Box sx={{
            mt: 2,
            p: 2,
            bgcolor: 'warning.50', 
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'warning.200'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Security color="warning" />
              <Typography variant="subtitle2" color="warning.dark" fontWeight="bold">
                Forward Credit Token
              </Typography>
            </Box>
            <Typography variant="body2" color="warning.dark" sx={{ fontSize: '0.8rem' }}>
              Represents a future ton of CO₂e pending verification. Higher risk than verified credits.
            </Typography>
            <Button size="small" sx={{ mt: 1, textTransform: 'none', color: 'warning.dark' }}>
              Learn more
            </Button>
          </Box>
        )}

        {/* Blockchain Verification */}
        <Box sx={{
          mt: 2,
          p: 2,
          bgcolor: projectData.isFCT ? 'warning.50' : 'primary.50', 
          borderRadius: 2,
          border: '1px solid',
          borderColor: projectData.isFCT ? 'warning.200' : 'primary.200'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Security color={projectData.isFCT ? 'warning' : 'primary'} />
            <Typography variant="subtitle2" color={projectData.isFCT ? 'warning.dark' : 'primary.dark'} fontWeight="bold">
              {projectData.isFCT ? 'Data Proofs on Hedera' : 'Blockchain Verification'}
            </Typography>
          </Box>
          <Typography variant="body2" color={projectData.isFCT ? 'warning.dark' : 'primary.dark'} sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
            {projectData.isFCT ? projectData.hcsTxHash : transactionId}
          </Typography>
          <Typography variant="caption" color={projectData.isFCT ? 'warning.dark' : 'primary.dark'}>
            {projectData.isFCT ? 'HCS Transaction Hash' : 'Hedera Transaction ID'}
          </Typography>
        </Box>
      </CardContent>

      <Divider />

      <CardActions sx={{ p: 2, pt: 1 }}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Visibility />}
              onClick={() => navigate(`/project/${token.tokenId}`)}
              sx={{ 
                textTransform: 'none', 
                mb: 1,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                },
              }}
            >
              View Details
            </Button>
          </Grid>
          
          {isForSale && !isOwner && (
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<ShoppingCart />}
                onClick={() => addToCart(token, 1)}
                sx={{ 
                  textTransform: 'none',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
                  },
                }}
              >
                {isInCart(token.tokenId) ? `In Cart (${getItemQuantity(token.tokenId)})` : 'Add to Cart'}
              </Button>
            </Grid>
          )}
          
          {isOwner && !isForSale && (
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<Sell />}
                onClick={() => onSell(token.tokenId)}
                sx={{ 
                  textTransform: 'none',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
                  },
                }}
              >
                List for Sale
              </Button>
            </Grid>
          )}
        </Grid>
      </CardActions>
    </Card>
    </Fade>
  );
};

export default TokenCard;