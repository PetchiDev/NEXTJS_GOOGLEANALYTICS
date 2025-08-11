'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Popover,
  IconButton,
  Button,
  Stack,
} from '@mui/material';
import { DateRange, RangeKeyDict } from 'react-date-range';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { format } from 'date-fns';
import { formatDateShort } from '../../constants/helpers';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

interface Props {
  setStartDate: (date: string | null) => void;
  setEndDate: (date: string | null) => void;
  resetCounter: number;
  isMobile: boolean;
}

const DateSelector: React.FC<Props> = ({
  setStartDate,
  setEndDate,
  resetCounter,
  isMobile,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [hasSelected, setHasSelected] = useState(false);

  const [committedRange, setCommittedRange] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({
    startDate: null,
    endDate: null,
  });

  const [tempRange, setTempRange] = useState<[
    {
      startDate: Date | null;
      endDate: Date | null;
      key: string;
    }
  ]>([
    {
      startDate: null,
      endDate: null,
      key: 'selection',
    },
  ]);

  useEffect(() => {
    const reset = {
      startDate: null,
      endDate: null,
      key: 'selection',
    };
    setTempRange([reset]);
    setCommittedRange({ startDate: null, endDate: null });
    setStartDate(null);
    setEndDate(null);
    setHasSelected(false);
  }, [resetCounter]);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setTempRange([
      {
        startDate: null,
        endDate: null,
        key: 'selection',
      },
    ]);
    setAnchorEl(event.currentTarget);
  };


  const handleCancel = () => {
    setTempRange([{ startDate: null, endDate: null, key: "selection" }]);
    setCommittedRange({ startDate: null, endDate: null });
    setStartDate(null);
    setEndDate(null);
    setHasSelected(false);

    setAnchorEl(null);
  };

  const handleApply = () => {
    const selected = tempRange[0];
    if (selected.startDate && selected.endDate) {
      setCommittedRange({
        startDate: selected.startDate,
        endDate: selected.endDate,
      });
      setStartDate(formatDateShort(selected.startDate.toISOString()));
      setEndDate(formatDateShort(selected.endDate.toISOString()));
      setHasSelected(true);
    }
    setAnchorEl(null);
  };

  const handleSelect = (ranges: RangeKeyDict) => {
    const { startDate, endDate } = ranges.selection;
    setTempRange([
      {
        startDate: startDate ?? null,
        endDate: endDate ?? null,
        key: 'selection',
      },
    ]);
  };

  const start = committedRange.startDate;
  const end = committedRange.endDate;
  const selectedRange =
    start && end ? `${format(start, 'MMM dd')} - ${format(end, 'MMM dd')}` : '';

  const isPopoverOpen = Boolean(anchorEl);

  return (
    <>
      <Box
        onClick={handleOpen}
        sx={{
          width: isMobile ? 'auto' : 260,
          height: 56,
          backgroundColor: '#FF7A2F',
          color: 'white',
          borderRadius: isMobile ? '8px' : '0 8px 8px 0',
          padding: '8px 12px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: 2,
        }}
      >
        <Typography variant="caption">Dates</Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="body1" fontWeight="bold">
            {hasSelected ? selectedRange : 'Choose'}
          </Typography>
          <IconButton size="small" sx={{ color: 'white', p: 0, ml: 1 }}>
            <ExpandLessIcon />
          </IconButton>
        </Box>
      </Box>

      <Popover
        open={isPopoverOpen}
        anchorEl={anchorEl}
        onClose={handleCancel}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        PaperProps={{ sx: { p: 2 } }}
      >
        <DateRange
          editableDateInputs
          moveRangeOnFirstSelection={false}
          onChange={handleSelect}
          ranges={[
            {
              startDate: tempRange[0].startDate ?? undefined,
              endDate: tempRange[0].endDate ?? undefined,
              key: 'selection',
            },
          ]}
          showDateDisplay={false}
        />

        <Stack direction="row" spacing={2} justifyContent="flex-end" mt={2}>
          <Button onClick={handleCancel} variant="outlined" size="small">
            Cancel
          </Button>
          <Button onClick={handleApply} variant="contained" size="small">
            Apply
          </Button>
        </Stack>
      </Popover>
    </>
  );
};

export default DateSelector;
