'use client';

import React from 'react';
import Link from 'next/link';
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Stack,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import parse from 'html-react-parser';

export interface EventCardProps {
  image: string;
  category: string;
  title: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  slug?: string;
  price?: number | null;
  eventType?: number;
  sortBy?: string;
}

const EventCard: React.FC<EventCardProps> = ({
  image,
  category,
  title,
  description,
  location,
  startDate,
  endDate,
  slug,
  price,
  eventType,
}) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <Link href={slug ? `/content/events/${slug}` : '#'} passHref>
      <Card
        sx={{
          width: 340,               
          height: 360,            
          borderRadius: '6px',     
          overflow: 'hidden',
          bgcolor: '#fff',
          boxShadow: 'none',
          mb: 2,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Cover Image */}
        <Box sx={{ position: 'relative', height: 180 }}>
          <CardMedia
            component="img"
            image={image}
            alt={title}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />

          {/* Date Tag */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              backgroundColor: '#0078D4',
              color: '#fff',
              px: 1.2,
              py: '2px',
              fontSize: '12px',
              fontWeight: 600,
              borderTopLeftRadius: '4px',
              textTransform: 'capitalize',
              maxWidth: '90%',
            }}
          >
            {`${formatDate(startDate)} to ${formatDate(endDate)}`}
          </Box>
        </Box>

        {/* Content */}
        <CardContent sx={{ p: 1.5, flex: 1, display: 'flex', flexDirection: 'column' }}>

          <Typography sx={{ fontSize: 11, color: '#646464', mb: 0.5 }}>
            {category}
          </Typography>

          <Typography
            variant="subtitle1"
            fontWeight={600}
            sx={{
              fontSize: 15,
              mb: 0.5,
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {title}
          </Typography>

          <Typography
            sx={{
              fontSize: 13,
              color: 'text.secondary',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              mb: 1,
            }}
          >
            {parse(description)}
          </Typography>

          <Stack direction="row" spacing={0.5} alignItems="center">
            <LocationOnIcon fontSize="small" sx={{ color: 'gray' }} />
            <Typography variant="body2" sx={{ fontSize: 12, color: 'text.secondary' }}>
              {location}
            </Typography>
          </Stack>

          <Typography
            sx={{
              fontSize: 16,
              fontWeight: 700,
              color: '#003459',
              mt: 'auto', 
            }}
          >
            {eventType === 3
              ? price === 0 || price === null
                ? 'Free'
                : `${price} QAR`
              : eventType === 2
                ? 'Open Registration'
                : eventType === 1
                  ? 'Free Access'
                  : ''}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default EventCard;