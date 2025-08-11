'use client';

import { Box, Typography, Chip } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useEffect, useState } from 'react';
import { getAllEventCategoris } from '@/utils/content/content';
import Link from 'next/link';

interface Category {
  id: number;
  categoryName: string;
}

const FILTER_IDS = [10, 13, 6, 4, 5]; 
export default function MoreEvents() {
  const [filters, setFilters] = useState<Category[]>([]);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const res = await getAllEventCategoris();
        const filtered = res?.filter((item: Category) =>
          FILTER_IDS.includes(item.id)
        );
        setFilters(filtered || []);
      } catch (error) {
        console.error('Failed to load categories', error);
      }
    };

    fetchFilters();
  }, []);

  return (
    <Box sx={{mt:2}}>
      <Typography
        variant="h6"
        fontWeight={600}
        mb={2}
        textAlign="center"
        color="text.primary"
      >
        More Events
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
        }}
      >
        {filters.map((category) => (
          <Link
            key={category.id}
            href={`/content/events?perselect=${category.id}`}
            passHref
          >
              <Chip
                label={category.categoryName}
                clickable
                sx={{
                  padding: '6px 24px',
                  minHeight: '44px',
                  borderRadius: '999px',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  backgroundColor: '#FFFFFF',
                  color: '#111',
                  border: '1px solid #E0E0E0',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)',
                  transition: 'all 0.3s ease', 
                  '&:hover': {
                    backgroundColor: '#f9f9f9',
                    transform: 'translateY(-1px)',
                  },
                }}
              />
          </Link>
        ))}

        <Link href="/content/events" passHref >
            <Chip
              label="View all"
              clickable
              icon={<ArrowForwardIcon />}
              sx={{
                padding: '6px 24px',
                minHeight: '44px',
                borderRadius: '999px',
                fontWeight: 600,
                fontSize: '0.95rem',
                backgroundColor: '#00467F',
                color: '#FFFFFF',
                transition: 'all 0.3s ease',
                '& .MuiChip-icon': {
                  color: '#FFFFFF',
                  ml: 0.5,
                },
                '&:hover': {
                  backgroundColor: '#FF7F38',
                  transform: 'translateY(-1px)',
                },
              }}
            />
        </Link>
      </Box>
    </Box>
  );
}
