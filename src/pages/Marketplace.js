import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Alert,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
} from '@mui/material';
import { Refresh, Add } from '@mui/icons-material';
import TokenGrid from '../components/Tokens/TokenGrid';
import { tokenAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`marketplace-tabpanel-${index}`}
      aria-labelledby={`marketplace-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const Marketplace = () => {
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [createTokenDialog, setCreateTokenDialog] = useState(false);
  const { user, isAdmin } = useAuth();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleCreateTokens = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await tokenAPI.createTokens();
      setSuccess(`Successfully created ${response.data.count} tokens!`);
      setCreateTokenDialog(false);
    } catch (err) {
      setError('Failed to create tokens. Please try again.');
      console.error('Error creating tokens:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    // Force refresh by updating a key or calling the API again
    window.location.reload();
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Carbon Credit Marketplace
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {isAdmin && (
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setCreateTokenDialog(true)}
              sx={{ textTransform: 'none' }}
            >
              Create Tokens
            </Button>
          )}
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={handleRefresh}
            sx={{ textTransform: 'none' }}
          >
            Refresh
          </Button>
        </Box>
      </Box>

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="marketplace tabs">
          <Tab label="All Tokens" />
          <Tab label="Marketplace" />
          <Tab label="My Tokens" />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <TokenGrid
          endpoint="upenergy"
          title="All Carbon Credit Tokens"
          showFilters={true}
        />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <TokenGrid
          endpoint="market"
          title="Tokens for Sale"
          showFilters={true}
        />
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <TokenGrid
          endpoint="upenergy"
          title="My Token Portfolio"
          showFilters={true}
        />
      </TabPanel>

      {/* Create Tokens Dialog */}
      <Dialog
        open={createTokenDialog}
        onClose={() => setCreateTokenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Create New Tokens</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            This will create new carbon credit tokens from the latest distribution data in S3.
            Each token represents a claim on future carbon credits from clean cooking devices.
          </Typography>
          <Alert severity="info" sx={{ mt: 2 }}>
            Tokens will be created based on the distribution data stored in AWS S3.
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateTokenDialog(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleCreateTokens}
            variant="contained"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : <Add />}
          >
            {loading ? 'Creating...' : 'Create Tokens'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Marketplace;
