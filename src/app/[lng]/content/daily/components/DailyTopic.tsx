'use client';

import React from 'react';
import { Box, Typography, Skeleton } from '@mui/material';
import { styled } from '@mui/material/styles';
import DailyTopicCard from './DailyTopicCard';

interface ContentEvent {
  id: string;
  title: string;
  category: string;
  image_url: string;
  slug: string;
  node_type: string;
}

interface DailyTopicProps {
  title: string;
  items: ContentEvent[];
  loading?: boolean;
}

const CategorySection = styled(Box)({
  padding: '1rem',
  marginBottom: '1rem',
  fontFamily: "'Public Sans', sans-serif",
});

const SectionHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  width: '100%',
  padding: '0px 5px',
});

const SectionHeading = styled(Typography)({
  fontSize: '25px',
  fontWeight: 600,
  color: '#003459',
  display: 'flex',
  alignItems: 'center',
});

const AccentBar = styled(Box)({
  width: '4px',
  height: '24px',
  backgroundColor: '#003459',
  marginRight: '8px',
});

const CardList = styled(Box)(({ theme }) => ({
  display: 'flex',
  overflowX: 'auto',
  gap: '4rem',
  padding: '10px 0',
  scrollSnapType: 'x mandatory',
  [theme.breakpoints.up('md')]: {
    overflowX: 'visible',
  },
}));

const DailyTopic: React.FC<DailyTopicProps> = ({ title, items, loading = false }) => {
  const displayItems = items.slice(0, 3);

  const getDetailUrl = (item: ContentEvent) => {
    if (item.node_type?.toLowerCase().includes('post') && item.slug) {
      return `/content/news/${item.slug}`;
    } else if (item.node_type?.toLowerCase().includes('event') && item.slug) {
      return `/content/events/${item.slug}`;
    }
    return '#';
  };

  if (loading) {
    return (
      <CategorySection>
        <SectionHeader>
          <SectionHeading variant="h3">
            <AccentBar />
            <Skeleton variant="text" width={150} height={30} />
          </SectionHeading>
        </SectionHeader>
        <CardList>
          {[...Array(3)].map((_, index) => (
            <Skeleton key={index} variant="rectangular" width={214} height={130} />
          ))}
        </CardList>
      </CategorySection>
    );
  }

  return (
    <Box sx={{ maxWidth: "1170px", mx: "auto", mt: 6 }}>
      <CategorySection>
        <SectionHeader>
          <SectionHeading variant="h3">
            <AccentBar />
            {title}
          </SectionHeading>
        </SectionHeader>

        <CardList>
          {displayItems.map((item, index) => (
            <a
              key={item.id}
              href={getDetailUrl(item)}
              style={{ textDecoration: 'none', display: 'flex' }}
            >
              <DailyTopicCard item={item} isLast={index === displayItems.length - 1} />
            </a>
          ))}
        </CardList>
      </CategorySection>
    </Box>
  );
};

export default DailyTopic;
