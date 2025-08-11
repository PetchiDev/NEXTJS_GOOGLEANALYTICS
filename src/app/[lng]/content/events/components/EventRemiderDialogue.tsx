'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  Typography,
  Select,
  MenuItem,
  Button,
} from '@mui/material';
import CalendarPlus from '../../../../../icons/calendarplus';

type EventData = {
  eventTitle: string;
  eventSchedule: {
    startDate: string;
    endDate: string;
  };
  location?: string;
  eventDescription?: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  event: EventData;
};

const EventReminderDialog: React.FC<Props> = ({ open, onClose, event }) => {
  const [selectedCalendar, setSelectedCalendar] = useState('');

  const handleAddToCalendar = () => {
    if (!selectedCalendar) return;

    const { eventTitle, eventSchedule, location, eventDescription } = event;

    const start = new Date(eventSchedule.startDate);
    const end = new Date(eventSchedule.endDate);

    const formatDate = (dateStr: string) =>
      new Date(dateStr).toISOString().replace(/[-:]/g, '').split('.')[0];

    const startFormatted = formatDate(eventSchedule.startDate);
    const endFormatted = formatDate(eventSchedule.endDate);

    let url = '';

    if (selectedCalendar === 'google') {
      const params = new URLSearchParams({
        text: eventTitle,
        dates: `${startFormatted}/${endFormatted}`,
        details: eventDescription || '',
        location: location || '',
      });
      url = `https://www.google.com/calendar/render?action=TEMPLATE&${params.toString()}`;
      window.open(url, '_blank');
    }

    else if (selectedCalendar === 'outlookweb') {
      const params = new URLSearchParams({
        subject: eventTitle,
        body: eventDescription || '',
        startdt: start.toISOString(),
        enddt: end.toISOString(),
        location: location || '',
        path: '/calendar/view/Month',
      });
      url = `https://outlook.live.com/owa/?rru=addevent&${params.toString()}`;
      window.open(url, '_blank');
    }

    else if (selectedCalendar === 'yahooweb') {
      const duration = Math.floor((end.getTime() - start.getTime()) / 60000);
      const yahooFormat = (date: Date) =>
        date.toISOString().replace(/[-:]/g, '').split('.')[0];

      const params = new URLSearchParams({
        v: '60',
        title: eventTitle,
        st: yahooFormat(start),
        dur: `${String(Math.floor(duration / 60)).padStart(2, '0')}${String(duration % 60).padStart(2, '0')}`,
        desc: eventDescription || '',
        in_loc: location || '',
      });
      url = `https://calendar.yahoo.com/?${params.toString()}`;
      window.open(url, '_blank');
    }

    else if (selectedCalendar === 'outlook') {
      const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'BEGIN:VEVENT',
        `SUMMARY:${eventTitle}`,
        `DESCRIPTION:${eventDescription || ''}`,
        `LOCATION:${location || ''}`,
        `DTSTART:${startFormatted}`,
        `DTEND:${endFormatted}`,
        'END:VEVENT',
        'END:VCALENDAR',
      ].join('\r\n');

      const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `${eventTitle.replace(/[^a-zA-Z0-9_-]/g, '_')}.ics`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    }

    // Reset and close
    setSelectedCalendar('');
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="event-reminder-title"
      PaperProps={{
        sx: {
          width: 450,
          maxWidth: '90vw',
          borderRadius: 4,
          px: 4,
          py: 3,
          textAlign: 'center',
        },
      }}
    >
      <Box display="flex" justifyContent="center" mt={1}>
        <Box
          sx={{
            bgcolor: '#E7F8F1',
            borderRadius: '50%',
            width: 48,
            height: 48,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CalendarPlus color="#22C55E" />
        </Box>
      </Box>

      <DialogTitle id="event-reminder-title" sx={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
        Event Reminder
      </DialogTitle>

      <DialogContent>
        <Typography sx={{ mb: 3, color: '#666' }}>
          You will be notified 1 day ahead of this event
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Typography sx={{ textAlign: 'left', fontSize: 14, mb: 0.5 }} color="text.secondary">
            Calendar*
          </Typography>
          <Select
            fullWidth
            value={selectedCalendar}
            onChange={(e) => setSelectedCalendar(e.target.value)}
            displayEmpty
            sx={{
              borderRadius: 2,
              backgroundColor: '#fff',
              '& .MuiSelect-icon': {
                color: '#888',
              },
            }}
          >
            <MenuItem value="" disabled>
              Choose
            </MenuItem>
            <MenuItem value="google">Google Calendar</MenuItem>
            <MenuItem value="outlook">Outlook Calendar</MenuItem>
            <MenuItem value="outlookweb">Outlook Web App</MenuItem>
            <MenuItem value="yahooweb">Yahoo Calendar</MenuItem>
          </Select>
        </Box>

        <Button
          fullWidth
          variant="contained"
          disabled={!selectedCalendar}
          onClick={handleAddToCalendar}
          sx={{
            textTransform: 'none',
            borderRadius: 2,
            color: !selectedCalendar ? '#999' : '#fff',
            backgroundColor: selectedCalendar ? '#FF7F38' : '#F1F1F1',
          }}
        >
          Add to Calendar
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default EventReminderDialog;
