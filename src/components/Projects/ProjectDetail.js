import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Stack,
  Divider,
  Rating,
  IconButton,
  TextField,
  InputAdornment,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  ArrowBack,
  LocationOn,
  CalendarToday,
  Verified,
  Security,
  Nature,
  AttachMoney,
  ShoppingCart,
  Download,
  Share,
  TrendingUp,
} from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { tokenAPI } from '../../services/api';

const ProjectDetail = () => {
  const navigate = useNavigate();
  const { tokenId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [retireNow, setRetireNow] = useState(false);

  // Generate professional project metadata with FCT support
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
      pricePerTon: isFCT ? (Math.random() * 10 + 3).toFixed(2) : (Math.random() * 20 + 8).toFixed(2),
      availableTons: Math.floor(Math.random() * 100 + 10),
      rating: (Math.random() * 2 + 3).toFixed(1),
      coBenefits: ['Health', 'Gender', 'Biodiversity'].slice(0, Math.floor(Math.random() * 3) + 1),
      verificationBody: 'SGS',
      lastAuditDate: '2024-01-15',
      projectDeveloper: 'UpEnergy Ltd',
      projectDescription: isFCT 
        ? 'This project involves the distribution of clean cooking devices to rural communities. Forward Credit Tokens represent future verified carbon credits pending verification.'
        : 'This project involves the distribution of clean cooking devices to rural communities, reducing deforestation and improving air quality while generating verified carbon credits.',
      sdgTags: ['SDG 3: Good Health', 'SDG 5: Gender Equality', 'SDG 13: Climate Action'],
      mrvDocuments: ['MRV Report 2024', 'Verification Report', 'Project Design Document'],
      creditType: creditType,
      isFCT: isFCT,
      fctStatus: isFCT ? ['Issued', 'Data Anchored', 'Pending Verification', 'Eligible to Convert'][Math.floor(Math.random() * 4)] : null,
      hcsTxHash: isFCT ? `0x${Math.random().toString(16).substring(2, 10)}${token.tokenId.replace(/[^a-zA-Z0-9]/g, '').substring(0, 8)}` : null,
      projectNFTId: isFCT ? `NFT-${token.tokenId}` : null,
      lastDataAnchor: isFCT ? new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString() : null,
      lifecycleSteps: isFCT ? [
        { step: 'Issued', completed: true, date: '2024-01-01' },
        { step: 'Data Anchored', completed: true, date: '2024-01-15' },
        { step: 'Verification Pending', completed: false, date: null },
        { step: 'Verified', completed: false, date: null },
        { step: 'Convert/Retire', completed: false, date: null }
      ] : null
    };
  };

  useEffect(() => {
    fetchProject();
  }, [tokenId]);

  const fetchProject = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch all tokens and find the one with matching tokenId
      const response = await tokenAPI.getUpEnergyTokens();
      const tokens = response.data.tokens || [];
      const foundToken = tokens.find(token => token.tokenId === tokenId);
      
      if (foundToken) {
        const projectData = generateProjectMetadata(foundToken);
        setProject({ ...foundToken, ...projectData });
      } else {
        setError('Project not found');
      }
    } catch (err) {
      setError('Failed to load project details');
      console.error('Error fetching project:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBuy = () => {
    // Implement buy logic
    console.log('Buying project:', project.tokenId, 'Quantity:', quantity);
  };

  const handleRetire = () => {
    // Implement retirement logic
    console.log('Retiring project:', project.tokenId, 'Quantity:', quantity);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !project) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error || 'Project not found'}
        </Alert>
        <Button startIcon={<ArrowBack />} onClick={() => navigate('/marketplace')}>
          Back to Marketplace
        </Button>
      </Box>
    );
  }

  const totalPrice = (parseFloat(project.pricePerTon) * quantity).toFixed(2);
  const fees = (totalPrice * 0.05).toFixed(2); // 5% fee
  const finalTotal = (parseFloat(totalPrice) + parseFloat(fees)).toFixed(2);

  const getCreditTypeColor = (creditType) => {
    switch (creditType) {
      case 'FCT': return 'warning';
      case 'Verified': return 'success';
      case 'Retired': return 'default';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <IconButton onClick={() => navigate('/marketplace')}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h4" component="h1" sx={{ flexGrow: 1 }}>
          {project.projectType} Project
        </Typography>
        <Stack direction="row" spacing={1}>
          <IconButton>
            <Share />
          </IconButton>
          <IconButton>
            <Download />
          </IconButton>
        </Stack>
      </Box>

      <Grid container spacing={3}>
        {/* Main Content */}
        <Grid item xs={12} md={8}>
          {/* Hero Section */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Typography variant="h5" component="h2">
                      {project.projectType} Project - {project.village}, {project.country}
                    </Typography>
                    <Chip
                      label={project.creditType}
                      color={getCreditTypeColor(project.creditType)}
                      size="small"
                      variant="filled"
                    />
                  </Box>
                  <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                    <Chip label={project.vintage} color="primary" />
                    <Chip label={`${project.availableTons} tCO₂e available`} color="secondary" />
                    <Chip 
                      label={`$${project.pricePerTon}/tCO₂e`} 
                      color="success" 
                      icon={<AttachMoney />}
                    />
                  </Stack>
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  <Rating value={parseFloat(project.rating)} precision={0.1} readOnly />
                  <Typography variant="body2" color="text.secondary">
                    {project.rating}/5.0 rating
                  </Typography>
                </Box>
              </Box>

              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                {project.projectDescription}
              </Typography>

              {/* Project Details */}
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Project Developer
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {project.projectDeveloper}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Project ID
                  </Typography>
                  <Typography variant="body1" gutterBottom sx={{ fontFamily: 'monospace' }}>
                    {project.tokenId}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Location
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <LocationOn fontSize="small" sx={{ mr: 0.5, verticalAlign: 'middle' }} />
                    {project.village}, {project.district}, {project.region}, {project.country}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Distribution Date
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <CalendarToday fontSize="small" sx={{ mr: 0.5, verticalAlign: 'middle' }} />
                    {new Date(project.distribution_date).toLocaleDateString()}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Integrity Panel */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Security color={project.isFCT ? 'warning' : 'primary'} />
                {project.isFCT ? 'FCT Integrity & Data Proofs' : 'Project Integrity'}
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Registry
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <Verified fontSize="small" color={project.isFCT ? 'warning' : 'success'} sx={{ mr: 0.5, verticalAlign: 'middle' }} />
                    {project.registry}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Methodology
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {project.methodology}
                  </Typography>
                </Grid>
                {project.isFCT && (
                  <>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Data Proofs on Hedera
                      </Typography>
                      <Typography variant="body1" gutterBottom sx={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>
                        <a href={`https://hashscan.io/testnet/transaction/${project.hcsTxHash}`} target="_blank" rel="noopener noreferrer">
                          {project.hcsTxHash}
                        </a>
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Project NFT ID
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        {project.projectNFTId}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Last Data Anchor
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        {new Date(project.lastDataAnchor).toLocaleString()}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2" color="text.secondary">
                        FCT Status
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        {project.fctStatus}
                      </Typography>
                    </Grid>
                  </>
                )}
                {!project.isFCT && (
                  <>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Verification Body
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        {project.verificationBody}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Last Audit Date
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        {new Date(project.lastAuditDate).toLocaleDateString()}
                      </Typography>
                    </Grid>
                  </>
                )}
              </Grid>
              
              {/* FCT Risk Disclosure */}
              {project.isFCT && (
                <Box sx={{
                  mt: 2,
                  p: 2,
                  bgcolor: 'warning.50',
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'warning.200'
                }}>
                  <Typography variant="subtitle2" color="warning.dark" gutterBottom>
                    Risk Disclosure
                  </Typography>
                  <Typography variant="body2" color="warning.dark" sx={{ mb: 1 }}>
                    Forward Credit Tokens represent future carbon credits pending verification. 
                    There is a risk that credits may not be verified or may be verified at a lower quantity.
                  </Typography>
                  <Button size="small" sx={{ textTransform: 'none', color: 'warning.dark' }}>
                    Learn more about FCT risks
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>

          {/* Impact Panel */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Nature color="info" />
                Environmental Impact & Co-benefits
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    SDG Contributions
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                    {project.sdgTags.map((sdg, index) => (
                      <Chip key={index} label={sdg} size="small" color="info" />
                    ))}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Co-benefits
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                    {project.coBenefits.map((benefit, index) => (
                      <Chip key={index} label={benefit} size="small" color="success" />
                    ))}
                  </Stack>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* FCT Lifecycle Timeline */}
          {project.isFCT && project.lifecycleSteps && (
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TrendingUp color="warning" />
                  FCT Lifecycle Timeline
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                <Stack spacing={2}>
                  {project.lifecycleSteps.map((step, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box sx={{
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        bgcolor: step.completed ? 'success.main' : 'grey.300',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '0.8rem',
                        fontWeight: 'bold'
                      }}>
                        {step.completed ? '✓' : index + 1}
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body1" sx={{ fontWeight: step.completed ? 'bold' : 'normal' }}>
                          {step.step}
                        </Typography>
                        {step.date && (
                          <Typography variant="caption" color="text.secondary">
                            {new Date(step.date).toLocaleDateString()}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          )}

          {/* Evidence Section */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Download color="primary" />
                Project Documentation
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                MRV Documents
              </Typography>
              <Stack spacing={1}>
                {project.mrvDocuments.map((doc, index) => (
                  <Button
                    key={index}
                    variant="outlined"
                    startIcon={<Download />}
                    sx={{ justifyContent: 'flex-start', textTransform: 'none' }}
                  >
                    {doc}
                  </Button>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Buy Box */}
        <Grid item xs={12} md={4}>
          <Card sx={{ position: 'sticky', top: 20 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <ShoppingCart color="primary" />
                Purchase Credits
              </Typography>
              <Divider sx={{ mb: 2 }} />

              {/* Quantity Selector */}
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Quantity (tons)
                </Typography>
                <TextField
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  inputProps={{ min: 1, max: project.availableTons }}
                  fullWidth
                  InputProps={{
                    endAdornment: <InputAdornment position="end">tons</InputAdornment>,
                  }}
                />
              </Box>

              {/* Price Breakdown */}
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">
                    {quantity} tons × ${project.pricePerTon}
                  </Typography>
                  <Typography variant="body2">${totalPrice}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Platform fee (5%)</Typography>
                  <Typography variant="body2">${fees}</Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6">Total</Typography>
                  <Typography variant="h6">${finalTotal}</Typography>
                </Box>
              </Box>

              {/* Retirement Options */}
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Retirement Options
                </Typography>
                <Stack spacing={1}>
                  <Button
                    variant={retireNow ? 'contained' : 'outlined'}
                    onClick={() => setRetireNow(true)}
                    fullWidth
                    sx={{ textTransform: 'none' }}
                  >
                    Retire Now
                  </Button>
                  <Button
                    variant={!retireNow ? 'contained' : 'outlined'}
                    onClick={() => setRetireNow(false)}
                    fullWidth
                    sx={{ textTransform: 'none' }}
                  >
                    Hold for Later
                  </Button>
                </Stack>
              </Box>

              {/* Action Buttons */}
              <Stack spacing={1}>
                {retireNow ? (
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleRetire}
                    sx={{ textTransform: 'none' }}
                  >
                    Retire Credits
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleBuy}
                    sx={{ textTransform: 'none' }}
                  >
                    {project.isFCT ? 'Buy FCT' : 'Buy Verified Credits'}
                  </Button>
                )}
                <Button
                  variant="outlined"
                  size="large"
                  sx={{ textTransform: 'none' }}
                >
                  Connect Wallet
                </Button>
              </Stack>
              
              {/* FCT Disclaimer */}
              {project.isFCT && (
                <Box sx={{
                  mt: 2,
                  p: 2,
                  bgcolor: 'warning.50',
                  borderRadius: 1,
                  border: '1px solid',
                  borderColor: 'warning.200'
                }}>
                  <Typography variant="caption" color="warning.dark">
                    <strong>Forward Credit Token</strong> — future credit pending verification. 
                    Higher risk than verified credits.
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProjectDetail;
