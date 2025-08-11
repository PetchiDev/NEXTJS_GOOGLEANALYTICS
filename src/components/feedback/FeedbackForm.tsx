'use client';

import React, { useState } from 'react';
import {
  Box, Grid, Typography, TextField, Button, CircularProgress, Dialog, DialogContent,
  DialogActions, IconButton, Select, MenuItem, InputLabel, FormControl
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import Image from 'next/image';
import { SelectChangeEvent } from '@mui/material/Select';
import feedbackIcon from '@/icons/feedback/feedback.webp';

interface FeedbackFormModel {
  name: string;
  email: string;
  mobile: string;
  category: string;
  description: string;
}

const categories = [
  'Account Blocked', 'Account Deletion', 'Ad Approval', 'Ad Unpublished/Removed', 'Ads posted in incorrect categories',
  'Cannot Edit/Update Ad', 'Cannot Post', 'Cannot Refresh Ad', 'Cannot View Ad', "Can't Login", 'Closed Account',
  'Default (Do Not Use)', 'Double payment', 'Email Update', 'Fraudulent/Infringement Report', 'General Complaints',
  'General Inquiry', 'Illegal Content Reports', 'Issue in Payment (Cannot Pay)', 'Mobile Number Update',
  'Multiple Ad Posting', 'Number Removal', 'Payment pending', 'Post Ad', 'Refund request', 'Request for Ad Removal',
  'Request for Comment Removal', 'Spam', 'Subscription/Account Issues', 'System Downtime/Outage',
  'Unauthorized use of contact details by another user', 'Unauthorized/Unusual Login', 'Username Update',
  'Verification', 'Wrong Category'
];

export default function FeedbackForm() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FeedbackFormModel>({
    name: '',
    email: '',
    mobile: '',
    category: '',
    description: ''
  });
  const [formErrors, setFormErrors] = useState<Partial<FeedbackFormModel>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<null | boolean>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name as keyof FeedbackFormModel]: value }));
  };

  const handleSubmit = async () => {
    const errors: Partial<FeedbackFormModel> = {};

    if (!form.name.trim()) errors.name = "Full name is required.";
    if (!form.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      errors.email = "Enter a valid email address.";
    }

    if (!form.mobile.trim()) {
      errors.mobile = "Phone number is required.";
    } else if (!/^[\d+ ]{7,15}$/.test(form.mobile)) {
      errors.mobile = "Enter a valid phone number.";
    }

    if (!form.category) errors.category = "Please select a category.";
    if (!form.description.trim()) errors.description = "Description is required.";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setIsSubmitting(true);
    setSubmissionResult(null);

    try {
      await new Promise((res) => setTimeout(res, 1500));
      setSubmissionResult(true);
    } catch {
      setSubmissionResult(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setForm({
      name: '',
      email: '',
      mobile: '',
      category: '',
      description: ''
    });
    setFormErrors({});
    setSubmissionResult(null);
    setOpen(false);
  };

  return (
    <>
      {/* FAB Desktop */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpen(true)}
        sx={{
          position: 'fixed',
          bottom: 70,
          left: 0,
          borderRadius: '0 6px 6px 0',
          minHeight: 146,
          maxHeight: 146,
          minWidth: 40,
          maxWidth: 40,
          display: { xs: 'none', md: 'flex' }
        }}
      >
        <Typography
          sx={{
            transform: 'rotate(180deg)',
            writingMode: 'vertical-lr',
            fontSize: 14,
            fontWeight: 500
          }}
        >
          Share Feedback
        </Typography>
      </Button>

      {/* FAB Mobile */}
      <Button
        onClick={() => setOpen(true)}
        sx={{
          position: 'fixed',
          bottom: 80,
          left: 16,
          borderRadius: '25px',
          width: 50,
          height: 50,
          display: { xs: 'flex', md: 'none' },
          backgroundColor: '#1976d2'
        }}
      >
        <Image
          src={feedbackIcon}
          alt="Feedback"
          width={215}
          height={215}
          style={{ borderRadius: 8 }}
        />
      </Button>

      <Dialog
        open={open}
        onClose={handleReset}
        fullWidth
        maxWidth="lg"
        PaperProps={{ sx: { borderRadius: '16px', padding: '24px', maxHeight: '90vh' } }}
      >
        <DialogContent sx={{ padding: 0 }}>
          {submissionResult === null ? (
            <Grid container spacing={4}>
              {/* Left */}
              <Grid item xs={12} md={5}>
                <Box display="flex" flexDirection="column" sx={{ paddingRight: { md: '24px' }, paddingBottom: { xs: '24px', md: 0 } }}>
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                    <Box>
                      <Typography variant="h4" fontWeight="bold" sx={{ fontSize: { xs: '1.75rem', md: '2rem' }, color: '#333', mb: 1 }}>
                        Your satisfaction, our priority
                      </Typography>
                      <Typography color="text.secondary" sx={{ color: '#666' }}>
                        We&apos;re here to listen and assist with any questions or concerns.
                        <br />Your satisfaction drives us to improve continually.
                      </Typography>
                    </Box>
                    <IconButton onClick={handleReset}>
                      <CloseIcon />
                    </IconButton>
                  </Box>
                  <Box mt={4} display="flex" justifyContent="center" sx={{ flex: 1 }}>
                    <Image
                      src={feedbackIcon}
                      alt="Feedback"
                      width={300}
                      height={280}
                      style={{ borderRadius: 8, maxWidth: '100%', height: 'auto' }}
                    />
                  </Box>
                </Box>
              </Grid>

              {/* Right - Form */}
              <Grid item xs={12} md={7}>
                <Box sx={{ paddingLeft: { md: '24px' } }}>
                  <TextField
                    label="Full name"
                    name="name"
                    value={form.name}
                    onChange={handleInputChange}
                    error={!!formErrors.name}
                    helperText={formErrors.name}
                    fullWidth
                    required
                    sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: 2, backgroundColor: '#f8f9fa' } }}
                  />

                  <TextField
                    label="Contact email"
                    name="email"
                    value={form.email}
                    onChange={handleInputChange}
                    error={!!formErrors.email}
                    helperText={formErrors.email}
                    fullWidth
                    required
                    sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: 2, backgroundColor: '#f8f9fa' } }}
                  />

                  <TextField
                    label="Phone number"
                    name="mobile"
                    value={form.mobile}
                    onChange={handleInputChange}
                    error={!!formErrors.mobile}
                    helperText={formErrors.mobile}
                    fullWidth
                    required
                    sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: 2, backgroundColor: '#f8f9fa' } }}
                  />

                  <FormControl
                    fullWidth
                    required
                    error={!!formErrors.category}
                    sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: 2, backgroundColor: '#f8f9fa' } }}
                  >
                    <InputLabel>Category</InputLabel>
                    <Select
                      name="category"
                      value={form.category}
                      onChange={handleSelectChange}
                      label="Category"
                    >
                      {categories.map((c) => (
                        <MenuItem key={c} value={c}>{c}</MenuItem>
                      ))}
                    </Select>
                    {formErrors.category && <Typography variant="caption" color="error">{formErrors.category}</Typography>}
                  </FormControl>

                  <TextField
                    name="description"
                    label="Description"
                    value={form.description}
                    onChange={handleInputChange}
                    error={!!formErrors.description}
                    helperText={formErrors.description}
                    multiline
                    minRows={4}
                    fullWidth
                    required
                    sx={{ mb: 4, '& .MuiOutlinedInput-root': { borderRadius: 2, backgroundColor: '#f8f9fa' } }}
                  />

                  <Box display="flex" gap={2} sx={{ flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'flex-end' }}>
                    <Button onClick={handleReset} variant="outlined" sx={{ borderRadius: 2, px: 3, py: 1.5 }}>
                      Close
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      variant="contained"
                      disabled={isSubmitting}
                      sx={{ borderRadius: 2, px: 3, py: 1.5, backgroundColor: '#ff6b35', '&:hover': { backgroundColor: '#e55a2b' } }}
                    >
                      {isSubmitting ? <CircularProgress size={24} /> : 'Submit'}
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          ) : (
            <Box textAlign="center" p={4}>
              {submissionResult ? (
                <>
                  <CheckCircleIcon color="success" sx={{ fontSize: 48 }} />
                  <Typography variant="h6" mt={2}>Your Message Submitted</Typography>
                  <Typography mt={1}>Thank you for your feedback! We&apos;ll review it and improve your experience.</Typography>
                </>
              ) : (
                <>
                  <ErrorIcon color="error" sx={{ fontSize: 48 }} />
                  <Typography variant="h6" mt={2}>Your message was not sent</Typography>
                  <Typography mt={1}>There was an error delivering your feedback. Please try again.</Typography>
                </>
              )}
            </Box>
          )}
        </DialogContent>

        {submissionResult !== null && (
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button fullWidth variant="contained" onClick={handleReset} sx={{ borderRadius: 2, py: 1.5 }}>
              Ok
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </>
  );
}
