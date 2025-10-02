import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Alert,
  CircularProgress,
  Grid,
  Chip,
  Divider,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  AccountBalance,
  ContentCopy,
  CheckCircle,
  Add,
  Refresh,
} from '@mui/icons-material';
import { accountAPI } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

const AccountCreation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [newAccount, setNewAccount] = useState(null);
  const [copiedField, setCopiedField] = useState(null);
  const { user, updateUser } = useAuth();

  const handleCreateAccount = async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);
      
      const response = await accountAPI.createAccount();
      const accountData = response.data;
      
      setNewAccount(accountData);
      setSuccess('Hedera account created successfully!');
      
      // Update user context with the new account
      updateUser({
        hederaAccount: accountData.accountId,
        hederaPublicKey: accountData.publicKey,
        hederaPrivateKey: accountData.privateKey,
      });
      
    } catch (err) {
      setError('Failed to create Hedera account. Please try again.');
      console.error('Error creating account:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async (text, field) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const CopyButton = ({ text, field, label }) => (
    <Tooltip title={copiedField === field ? 'Copied!' : `Copy ${label}`}>
      <IconButton
        size="small"
        onClick={() => handleCopy(text, field)}
        color={copiedField === field ? 'success' : 'default'}
      >
        {copiedField === field ? <CheckCircle /> : <ContentCopy />}
      </IconButton>
    </Tooltip>
  );

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Hedera Account Management
      </Typography>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Create a new Hedera Testnet account to participate in the carbon credit marketplace.
        Each account comes with 10 HBAR for transaction fees.
      </Typography>

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

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AccountBalance sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">
                  Create New Account
                </Typography>
              </Box>
              
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Generate a new Hedera Testnet account with public/private key pair.
                This account will be used for blockchain transactions.
              </Typography>

              <Button
                variant="contained"
                fullWidth
                onClick={handleCreateAccount}
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : <Add />}
                sx={{ textTransform: 'none' }}
              >
                {loading ? 'Creating Account...' : 'Create Hedera Account'}
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {newAccount && (
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <CheckCircle sx={{ mr: 1, color: 'success.main' }} />
                  <Typography variant="h6">
                    Account Created
                  </Typography>
                </Box>

                <Alert severity="warning" sx={{ mb: 2 }}>
                  <Typography variant="body2">
                    <strong>Important:</strong> Save your private key securely. 
                    It cannot be recovered if lost.
                  </Typography>
                </Alert>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Account ID
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2" sx={{ fontFamily: 'monospace', flexGrow: 1 }}>
                      {newAccount.accountId}
                    </Typography>
                    <CopyButton 
                      text={newAccount.accountId} 
                      field="accountId" 
                      label="Account ID" 
                    />
                  </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Public Key
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontFamily: 'monospace', 
                        flexGrow: 1,
                        wordBreak: 'break-all',
                        fontSize: '0.75rem'
                      }}
                    >
                      {newAccount.publicKey}
                    </Typography>
                    <CopyButton 
                      text={newAccount.publicKey} 
                      field="publicKey" 
                      label="Public Key" 
                    />
                  </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Private Key
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontFamily: 'monospace', 
                        flexGrow: 1,
                        wordBreak: 'break-all',
                        fontSize: '0.75rem'
                      }}
                    >
                      {newAccount.privateKey}
                    </Typography>
                    <CopyButton 
                      text={newAccount.privateKey} 
                      field="privateKey" 
                      label="Private Key" 
                    />
                  </Box>
                </Box>

                <Box sx={{ mt: 2 }}>
                  <Chip
                    label="10 HBAR Initial Balance"
                    color="success"
                    variant="outlined"
                    size="small"
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        )}

        {user?.hederaAccount && (
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Current Account
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>
                    {user.hederaAccount}
                  </Typography>
                  <CopyButton 
                    text={user.hederaAccount} 
                    field="currentAccount" 
                    label="Current Account" 
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default AccountCreation;
