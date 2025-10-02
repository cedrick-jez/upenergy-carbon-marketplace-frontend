import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  TextField,
  Alert,
  Divider,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Edit,
  Save,
  Cancel,
  ContentCopy,
  CheckCircle,
  AccountBalance,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { accountAPI } from '../services/api';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [copiedField, setCopiedField] = useState(null);

  const handleEdit = () => {
    setIsEditing(true);
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
    });
  };

  const handleSave = () => {
    if (!formData.name.trim() || !formData.email.trim()) {
      setError('Name and email are required');
      return;
    }

    updateUser(formData);
    setIsEditing(false);
    setSuccess('Profile updated successfully');
    setTimeout(() => setSuccess(null), 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
        Profile
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
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">
                  Personal Information
                </Typography>
                {!isEditing ? (
                  <Button
                    startIcon={<Edit />}
                    onClick={handleEdit}
                    size="small"
                    sx={{ textTransform: 'none' }}
                  >
                    Edit
                  </Button>
                ) : (
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      startIcon={<Save />}
                      onClick={handleSave}
                      size="small"
                      variant="contained"
                      sx={{ textTransform: 'none' }}
                    >
                      Save
                    </Button>
                    <Button
                      startIcon={<Cancel />}
                      onClick={handleCancel}
                      size="small"
                      sx={{ textTransform: 'none' }}
                    >
                      Cancel
                    </Button>
                  </Box>
                )}
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Full Name
                </Typography>
                {isEditing ? (
                  <TextField
                    fullWidth
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    variant="outlined"
                    size="small"
                  />
                ) : (
                  <Typography variant="body1">
                    {user?.name || 'Not provided'}
                  </Typography>
                )}
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Email Address
                </Typography>
                {isEditing ? (
                  <TextField
                    fullWidth
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    variant="outlined"
                    size="small"
                  />
                ) : (
                  <Typography variant="body1">
                    {user?.email || 'Not provided'}
                  </Typography>
                )}
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Role
                </Typography>
                <Chip
                  label={user?.role || 'N/A'}
                  color={user?.role === 'admin' ? 'primary' : 'default'}
                  size="small"
                />
              </Box>

              <Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Member Since
                </Typography>
                <Typography variant="body1">
                  {user?.loginTime ? new Date(user.loginTime).toLocaleDateString() : 'N/A'}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AccountBalance sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">
                  Hedera Account
                </Typography>
              </Box>

              {user?.hederaAccount ? (
                <>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Account ID
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body1" sx={{ fontFamily: 'monospace', flexGrow: 1 }}>
                        {user.hederaAccount}
                      </Typography>
                      <CopyButton 
                        text={user.hederaAccount} 
                        field="accountId" 
                        label="Account ID" 
                      />
                    </Box>
                  </Box>

                  {user?.hederaPublicKey && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
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
                          {user.hederaPublicKey}
                        </Typography>
                        <CopyButton 
                          text={user.hederaPublicKey} 
                          field="publicKey" 
                          label="Public Key" 
                        />
                      </Box>
                    </Box>
                  )}

                  <Alert severity="info" sx={{ mt: 2 }}>
                    <Typography variant="body2">
                      Your Hedera account is connected and ready for blockchain transactions.
                    </Typography>
                  </Alert>
                </>
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                    No Hedera account connected
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => window.location.href = '/accounts'}
                    sx={{ textTransform: 'none' }}
                  >
                    Create Hedera Account
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
