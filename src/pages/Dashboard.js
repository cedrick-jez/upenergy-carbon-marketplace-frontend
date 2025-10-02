import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Alert,
  CircularProgress,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from '@mui/material';
import {
  AccountBalance,
  Nature,
  TrendingUp,
  People,
  LocationOn,
  Phone,
  CalendarToday,
  Refresh,
} from '@mui/icons-material';
import { tokenAPI, accountAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalTokens: 0,
    tokensForSale: 0,
    myTokens: 0,
    totalAccounts: 0,
  });
  const [recentTokens, setRecentTokens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [tokensResponse, marketResponse, accountsResponse] = await Promise.all([
        tokenAPI.getUpEnergyTokens(),
        tokenAPI.getMarketTokens(),
        accountAPI.listAccounts(),
      ]);

      const allTokens = tokensResponse.data.tokens || [];
      const marketTokens = marketResponse.data.tokens || [];
      const accounts = accountsResponse.data.accounts || [];

      // Calculate stats
      const myTokens = allTokens.filter(token => 
        token.account === user?.hederaAccount
      );

      setStats({
        totalTokens: allTokens.length,
        tokensForSale: marketTokens.length,
        myTokens: myTokens.length,
        totalAccounts: accounts.length,
      });

      // Get recent tokens (last 5)
      setRecentTokens(allTokens.slice(-5).reverse());

    } catch (err) {
      setError('Failed to load dashboard data');
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon, color = 'primary', subtitle }) => (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography color="text.secondary" gutterBottom variant="h6">
              {title}
            </Typography>
            <Typography variant="h4" component="div" color={`${color}.main`}>
              {value}
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>
          <Box sx={{ color: `${color}.main` }}>
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h3" component="h1">
          Dashboard
        </Typography>
        <Button
          variant="outlined"
          startIcon={<Refresh />}
          onClick={fetchDashboardData}
          sx={{ textTransform: 'none' }}
        >
          Refresh
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Tokens"
            value={stats.totalTokens}
            icon={<Nature sx={{ fontSize: 40 }} />}
            color="primary"
            subtitle="Carbon credit tokens"
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="For Sale"
            value={stats.tokensForSale}
            icon={<TrendingUp sx={{ fontSize: 40 }} />}
            color="success"
            subtitle="Available in marketplace"
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="My Tokens"
            value={stats.myTokens}
            icon={<AccountBalance sx={{ fontSize: 40 }} />}
            color="info"
            subtitle="In my portfolio"
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Accounts"
            value={stats.totalAccounts}
            icon={<People sx={{ fontSize: 40 }} />}
            color="secondary"
            subtitle="Hedera accounts"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Tokens
              </Typography>
              {recentTokens.length === 0 ? (
                <Typography color="text.secondary">
                  No tokens found
                </Typography>
              ) : (
                <List>
                  {recentTokens.map((token, index) => (
                    <React.Fragment key={token.tokenId}>
                      <ListItem>
                        <ListItemIcon>
                          <Nature color="primary" />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Typography variant="subtitle1">
                                {token.tokenId}
                              </Typography>
                              <Chip
                                label={token.for_sale ? 'For Sale' : 'Available'}
                                color={token.for_sale ? 'success' : 'default'}
                                size="small"
                              />
                            </Box>
                          }
                          secondary={
                            <Box>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                                <LocationOn fontSize="small" color="action" />
                                <Typography variant="body2">
                                  {token.village}, {token.district}, {token.country}
                                </Typography>
                              </Box>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <CalendarToday fontSize="small" color="action" />
                                <Typography variant="body2">
                                  Distributed: {new Date(token.distribution_date).toLocaleDateString()}
                                </Typography>
                              </Box>
                            </Box>
                          }
                        />
                      </ListItem>
                      {index < recentTokens.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Account Information
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Name
                </Typography>
                <Typography variant="body1">
                  {user?.name || 'N/A'}
                </Typography>
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Role
                </Typography>
                <Chip
                  label={user?.role || 'N/A'}
                  color={user?.role === 'admin' ? 'primary' : 'default'}
                  size="small"
                />
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Email
                </Typography>
                <Typography variant="body1">
                  {user?.email || 'N/A'}
                </Typography>
              </Box>
              
              {user?.hederaAccount && (
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Hedera Account
                  </Typography>
                  <Typography variant="body1" sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
                    {user.hederaAccount}
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

export default Dashboard;
