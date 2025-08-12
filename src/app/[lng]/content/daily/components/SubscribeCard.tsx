'use client';

import React, { useRef, useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
} from '@mui/material';
import { trackNewsletterSubscription, trackNewsletterSubscriptionQL } from '@/utils/analytics';

const NewsletterSubscription = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const [emailError, setEmailError] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = emailRef.current?.value.trim() || '';

    const emailRegex = /\S+@\S+\.\S+/;
    if (!email) {
      setEmailError('Please enter your email');
      return;
    }
    if (!emailRegex.test(email)) {
      setEmailError('Please enter valid email address');
      return;
    }

    setEmailError('');
    
    try {
      // Track newsletter subscription to Google Analytics
      trackNewsletterSubscription(true, "daily");
      
      // Track newsletter subscription to QL analytics server
      await trackNewsletterSubscriptionQL(true, "daily");
      
      // Small delay to ensure analytics are sent before redirect
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Redirect to Mailchimp subscribe endpoint
      window.location.href =
        `//qatarliving.us9.list-manage.com/subscribe/post?u=3ab0436d22c64716e67a03f64&id=94198fac96&EMAIL=${encodeURIComponent(email)}`;
    } catch (error) {
      console.error('Analytics tracking failed:', error);
      // Still redirect even if analytics fails
      window.location.href =
        `//qatarliving.us9.list-manage.com/subscribe/post?u=3ab0436d22c64716e67a03f64&id=94198fac96&EMAIL=${encodeURIComponent(email)}`;
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        borderRadius: 2,
        border: '1px solid #eee',
        p: 3,
        height: '100%',
        bgcolor: '#fff',
      }}
    >
      <Typography variant="subtitle1" fontWeight={600} mb={2}>
        Get The QL newsletter. Subscribe to receive the top stories you need to know right now.
      </Typography>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Enter your email"
        size="small"
        inputRef={emailRef}
        onChange={(e) => {
          if (emailError) {
            // live-validate only when an error is already shown
            const value = e.target.value;
            const emailRegex = /\S+@\S+\.\S+/;
            setEmailError(
              !value.trim()
                ? 'Please enter your email'
                : emailRegex.test(value)
                ? ''
                : 'Please enter valid email address'
            );
          }
        }}
        onBlur={() => {
          const value = emailRef.current?.value || '';
          const emailRegex = /\S+@\S+\.\S+/;
          setEmailError(
            !value.trim()
              ? 'Please enter your email'
              : emailRegex.test(value)
              ? ''
              : 'Please enter valid email address'
          );
        }}
        error={!!emailError}
        helperText={emailError}
        sx={{ mb: 2 }}
        inputProps={{ spellCheck: false }}
      />

      <Button
        fullWidth
        type="submit"
        variant="contained"
        sx={{
          bgcolor: '#FF6A00',
          '&:hover': { bgcolor: '#e35d00' },
        }}
      >
        Subscribe
      </Button>
    </Box>
  );
};

export default NewsletterSubscription;
