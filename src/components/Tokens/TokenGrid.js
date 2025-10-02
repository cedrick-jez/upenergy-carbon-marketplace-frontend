import React, { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  Box,
  CircularProgress,
  Alert,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Stack,
  Slider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Paper,
} from '@mui/material';
import { Search, FilterList, ExpandMore, Clear } from '@mui/icons-material';
import TokenCard from './TokenCard';
import { tokenAPI } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

const TokenGrid = ({ endpoint, title, showFilters = true }) => {
  const [tokens, setTokens] = useState([]);
  const [filteredTokens, setFilteredTokens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [countryFilter, setCountryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priceRange, setPriceRange] = useState([3, 25]);
  const [vintageFilter, setVintageFilter] = useState('');
  const [methodologyFilter, setMethodologyFilter] = useState('');
  const [projectTypeFilter, setProjectTypeFilter] = useState('');
  const [creditTypeFilter, setCreditTypeFilter] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    fetchTokens();
  }, [endpoint]);

  useEffect(() => {
    filterTokens();
  }, [tokens, searchTerm, countryFilter, statusFilter, priceRange, vintageFilter, methodologyFilter, projectTypeFilter, creditTypeFilter, sortBy]);

  const fetchTokens = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let response;
      switch (endpoint) {
        case 'upenergy':
          response = await tokenAPI.getUpEnergyTokens();
          break;
        case 'market':
          response = await tokenAPI.getMarketTokens();
          break;
        default:
          response = await tokenAPI.getUpEnergyTokens();
      }
      
      setTokens(response.data.tokens || []);
    } catch (err) {
      setError('Failed to fetch tokens. Please try again.');
      console.error('Error fetching tokens:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterTokens = () => {
    let filtered = [...tokens];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(token =>
        token.tokenId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        token.serial.toLowerCase().includes(searchTerm.toLowerCase()) ||
        token.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        token.village?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Country filter
    if (countryFilter) {
      filtered = filtered.filter(token => token.country === countryFilter);
    }

    // Status filter
    if (statusFilter) {
      if (statusFilter === 'for_sale') {
        filtered = filtered.filter(token => token.for_sale === 1 || token.for_sale === true);
      } else if (statusFilter === 'owned') {
        filtered = filtered.filter(token => token.account && token.account !== '');
      } else if (statusFilter === 'available') {
        filtered = filtered.filter(token => !token.account || token.account === '');
      }
    }

    // Advanced filters (simulated based on token data)
    if (vintageFilter) {
      filtered = filtered.filter(token => {
        const year = new Date(token.distribution_date).getFullYear();
        return year.toString() === vintageFilter;
      });
    }

    // Sort tokens
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price_low_high':
          // Simulate price based on token ID
          return parseInt(a.tokenId.replace(/[^0-9]/g, '')) - parseInt(b.tokenId.replace(/[^0-9]/g, ''));
        case 'price_high_low':
          return parseInt(b.tokenId.replace(/[^0-9]/g, '')) - parseInt(a.tokenId.replace(/[^0-9]/g, ''));
        case 'newest':
          return new Date(b.distribution_date) - new Date(a.distribution_date);
        case 'oldest':
          return new Date(a.distribution_date) - new Date(b.distribution_date);
        case 'rating':
          // Simulate rating based on token ID
          return Math.random() - Math.random();
        default:
          return 0;
      }
    });

    setFilteredTokens(filtered);
  };

  const handleSell = async (tokenId) => {
    try {
      await tokenAPI.sellToken(tokenId);
      fetchTokens(); // Refresh the list
    } catch (err) {
      console.error('Error selling token:', err);
    }
  };

  const handleBuy = async (tokenId) => {
    try {
      // In a real app, you'd get the buyer account from user's wallet
      const buyerAccount = user?.hederaAccount || '0.0.123456'; // Demo account
      await tokenAPI.buyToken(tokenId, buyerAccount);
      fetchTokens(); // Refresh the list
    } catch (err) {
      console.error('Error buying token:', err);
    }
  };

  const handleView = (token) => {
    // Navigate to token details page
    console.log('View token:', token);
  };

  const getUniqueCountries = () => {
    return [...new Set(tokens.map(token => token.country))].sort();
  };

  const getUniqueVintages = () => {
    return [...new Set(tokens.map(token => new Date(token.distribution_date).getFullYear()))].sort().reverse();
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setCountryFilter('');
    setStatusFilter('');
    setPriceRange([3, 25]);
    setVintageFilter('');
    setMethodologyFilter('');
    setProjectTypeFilter('');
    setCreditTypeFilter('');
    setSortBy('newest');
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          {title}
        </Typography>
        <Chip
          label={`${filteredTokens.length} tokens`}
          color="primary"
          variant="outlined"
        />
      </Box>

      {showFilters && (
        <Paper sx={{ p: 3, mb: 3 }}>
          {/* Basic Filters */}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" sx={{ mb: 2 }}>
            <TextField
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              sx={{ minWidth: 200 }}
            />

            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>Country</InputLabel>
              <Select
                value={countryFilter}
                label="Country"
                onChange={(e) => setCountryFilter(e.target.value)}
              >
                <MenuItem value="">All Countries</MenuItem>
                {getUniqueCountries().map(country => (
                  <MenuItem key={country} value={country}>
                    {country}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                label="Status"
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="">All Status</MenuItem>
                <MenuItem value="for_sale">For Sale</MenuItem>
                <MenuItem value="owned">Owned</MenuItem>
                <MenuItem value="available">Available</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>Type</InputLabel>
              <Select
                value={creditTypeFilter}
                label="Type"
                onChange={(e) => setCreditTypeFilter(e.target.value)}
              >
                <MenuItem value="">All Types</MenuItem>
                <MenuItem value="FCT">FCT</MenuItem>
                <MenuItem value="Verified">Verified</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortBy}
                label="Sort By"
                onChange={(e) => setSortBy(e.target.value)}
              >
                <MenuItem value="newest">Newest First</MenuItem>
                <MenuItem value="oldest">Oldest First</MenuItem>
                <MenuItem value="price_low_high">Price: Low to High</MenuItem>
                <MenuItem value="price_high_low">Price: High to Low</MenuItem>
                <MenuItem value="rating">Best Rating</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="outlined"
              startIcon={<Clear />}
              onClick={clearAllFilters}
              sx={{ textTransform: 'none' }}
            >
              Clear All
            </Button>
          </Stack>

          {/* Advanced Filters */}
          <Accordion expanded={showAdvancedFilters} onChange={() => setShowAdvancedFilters(!showAdvancedFilters)}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <FilterList />
                <Typography variant="subtitle1">Advanced Filters</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
                {/* Price Range */}
                <Box sx={{ minWidth: 200 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Price Range: ${priceRange[0]} - ${priceRange[1]} per tCO₂e
                  </Typography>
                  <Slider
                    value={priceRange}
                    onChange={(e, newValue) => setPriceRange(newValue)}
                    valueLabelDisplay="auto"
                    min={3}
                    max={25}
                    step={1}
                    marks={[
                      { value: 3, label: '$3' },
                      { value: 15, label: '$15' },
                      { value: 25, label: '$25' }
                    ]}
                  />
                </Box>

                {/* Vintage Filter */}
                <FormControl sx={{ minWidth: 120 }}>
                  <InputLabel>Vintage</InputLabel>
                  <Select
                    value={vintageFilter}
                    label="Vintage"
                    onChange={(e) => setVintageFilter(e.target.value)}
                  >
                    <MenuItem value="">All Vintages</MenuItem>
                    {getUniqueVintages().map(vintage => (
                      <MenuItem key={vintage} value={vintage.toString()}>
                        {vintage}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* Methodology Filter */}
                <FormControl sx={{ minWidth: 150 }}>
                  <InputLabel>Methodology</InputLabel>
                  <Select
                    value={methodologyFilter}
                    label="Methodology"
                    onChange={(e) => setMethodologyFilter(e.target.value)}
                  >
                    <MenuItem value="">All Methodologies</MenuItem>
                    <MenuItem value="VCS-VM0007">VCS-VM0007</MenuItem>
                    <MenuItem value="Gold Standard-GS-VER">Gold Standard-GS-VER</MenuItem>
                    <MenuItem value="CDM-AMS-I.D">CDM-AMS-I.D</MenuItem>
                  </Select>
                </FormControl>

                {/* Project Type Filter */}
                <FormControl sx={{ minWidth: 150 }}>
                  <InputLabel>Project Type</InputLabel>
                  <Select
                    value={projectTypeFilter}
                    label="Project Type"
                    onChange={(e) => setProjectTypeFilter(e.target.value)}
                  >
                    <MenuItem value="">All Types</MenuItem>
                    <MenuItem value="Clean Cooking">Clean Cooking</MenuItem>
                    <MenuItem value="Renewable Energy">Renewable Energy</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
            </AccordionDetails>
          </Accordion>
        </Paper>
      )}

      {filteredTokens.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" color="text.secondary">
            No tokens found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your search criteria
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredTokens.map((token) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={token.tokenId}>
              <TokenCard
                token={token}
                onView={handleView}
                onSell={handleSell}
                onBuy={handleBuy}
                userRole={user?.role}
                userAccount={user?.hederaAccount}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default TokenGrid;
