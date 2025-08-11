'use client';

import React, { useRef, useState, useCallback } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { trackNewsletterSubscription } from '@/utils/analytics';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;

function isValidEmail(raw: string): boolean {
  const email = raw.trim();
  if (!EMAIL_RE.test(email)) return false;

  const [local, domain] = email.split('@');
  if (!local || !domain) return false;

  if (local.startsWith('.') || local.endsWith('.')) return false;
  if (domain.startsWith('.') || domain.endsWith('.')) return false;
  if (local.includes('..') || domain.includes('..')) return false;

  return true;
}

const NewsletterSubscription: React.FC = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);

  const validate = useCallback((v: string) => {
    if (!v.trim()) return 'Please enter your email';
    if (!isValidEmail(v)) return 'Please enter a valid email address';
    return '';
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setValue(v);
    if (!validate(v)) setError('');
  };

  const handleBlur = () => setError(validate(value));

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const msg = validate(value);
    if (msg) {
      setError(msg);
      emailRef.current?.focus();
      return;
    }

    setError('');
    setSubmitting(true);
    const email = value.trim();

    // Track newsletter subscription
    trackNewsletterSubscription(true, "news");

    window.location.href = `https://qatarliving.us9.list-manage.com/subscribe/post?u=3ab0436d22c64716e67a03f64&id=94198fac96&EMAIL=${encodeURIComponent(email)}`;
  };

  const isButtonDisabled = submitting;

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: '100%',
        maxWidth: 520,
        minHeight: { xs: 'auto', sm: 198 },
        p: { xs: 2, sm: '14px' },
        borderRadius: '6px',
        border: '1px solid #E0E0E0',
        bgcolor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: 1.5, sm: '14px' },
        mx: 'auto',
      }}
    >
      <Typography
        variant="subtitle1"
        fontWeight={500}
        fontSize={{ xs: 14, sm: 16 }}
        textAlign="center"
      >
        Get the QL newsletter. Subscribe to receive the top stories you need to
        know right now.
      </Typography>

      <TextField
        fullWidth
        type="email"
        variant="outlined"
        placeholder="Enter your email"
        size="small"
        inputRef={emailRef}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        error={Boolean(error)}
        helperText={error || ' '}
        autoComplete="email"
        inputProps={{ spellCheck: false, 'aria-label': 'Email address' }}
        sx={{
          width: { xs: '100%', sm: 225 },
          mx: 'auto',
          '& .MuiInputBase-input': { textAlign: 'center' }, // center the text
        }}
      />

      <Button
        type="submit"
        variant="contained"
        disabled={isButtonDisabled}
        sx={{
          width: { xs: '100%', sm: 225 },
          height: 44,
          gap: '8px',
          px: '40px',
          py: '6px',
          borderRadius: '4px',
          bgcolor: '#FF6A00',
          color: '#fff',
          fontWeight: 600,
          fontSize: { xs: 14, sm: 14 },
          textTransform: 'none',
          mx: 'auto',
          '&:hover': { bgcolor: '#E35D00' },
          '&.Mui-disabled': { opacity: 0.6 },
        }}
      >
        {submitting ? 'Submitting…' : 'Subscribe'}
      </Button>
    </Box>
  );
};

export default NewsletterSubscription;
