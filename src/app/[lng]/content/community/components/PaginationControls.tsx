'use client';

import React from 'react';
import {
  Box,
  Button,
  MenuItem,
  Select,
  Typography,
  IconButton,
} from '@mui/material';
import EastIcon from '@mui/icons-material/East';
import WestIcon from '@mui/icons-material/West';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { trackPagination } from "@/utils/analytics";

type Props = {
  currentPage: number;
  totalPages: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
};

const PaginationControls: React.FC<Props> = ({
  currentPage,
  totalPages,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}) => {
   const rowsPerPageOptions = [ 12,24,36];

  const renderPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }

    return pages.map((page, idx) =>
      typeof page === 'number' ? (
        <Button
          key={idx}
          variant={page === currentPage ? 'contained' : 'text'}
          sx={{
            minWidth: 36,
            borderRadius: '8px',
            mx: 0.5,
            bgcolor: page === currentPage ? '#fff' : 'transparent',
            color: page === currentPage ? '#000' : '#555',
            fontWeight: 500,
            textTransform: 'none',
            boxShadow: page === currentPage ? 1 : 'none',
          }}
          onClick={() => {
            onPageChange(page);
            trackPagination(page, "community");
          }}
        >
          {page}
        </Button>
      ) : (
        <Typography key={idx} sx={{ mx: 1, color: '#888' }}>
          {page}
        </Typography>
      )
    );
  };

  return (
    <Box sx={{display:'flex',gap:"30px",justifyContent:'center',alignItems:"center",flexDirection:'column'}}>
    <Box       
      sx={{width:"100%"}}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      flexWrap="wrap"
      gap={2}
      mt={4}>
      <IconButton
        onClick={() => {
          onPageChange(currentPage - 1);
          trackPagination(currentPage - 1, "community");
        }}
        disabled={currentPage === 1}
        sx={{border:"1px solid",borderRadius:"8px",backgroundColor:"#ffff !important", minWidth:'100px'}}
      >
        <WestIcon fontSize="small" sx={{color:"#475467"}} />
        <Typography sx={{fontWeight:600,color:'#475467'}} ml={0.5}>Previous</Typography>
      </IconButton>

      <Box display="flex" alignItems="center">
        {renderPageNumbers()}
      </Box>

      <IconButton
        onClick={() => {
          onPageChange(currentPage + 1);
          trackPagination(currentPage + 1, "community");
        }}
        disabled={currentPage === totalPages}
        sx={{border:"1px solid",borderRadius:"8px",backgroundColor:"#ffff !important", minWidth:'100px'}}
      >
        <Typography sx={{fontWeight:600,color:'#475467'}} ml={0.5}>Next</Typography>
        <EastIcon fontSize="small"  sx={{color:"#475467"}}/>
      </IconButton>
      </Box>
<Select 
  value={rowsPerPage}
  onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
  variant="outlined"
  size="small"
  IconComponent={ExpandMoreIcon}
   sx={{
    minWidth: 200,
    backgroundColor: '#fff',
    borderRadius: '8px',
    fontWeight: 500,
    color: '#475467',
    boxShadow: '0 1px 2px rgba(16, 24, 40, 0.05)',
    '.MuiOutlinedInput-notchedOutline': {
      borderColor: '#D0D5DD',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#D0D5DD',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#D0D5DD',
    },
    '& .MuiSelect-icon': {
      color: '#667085',
      marginRight: '12px',
    },
    '& .MuiSelect-select': {
      padding: '10px 14px',
      display: 'flex',
      alignItems: 'center',
    },
  }}
>
  {rowsPerPageOptions.map((option) => (
    <MenuItem key={option} value={option}>
      {option} results per page
    </MenuItem>
  ))}
</Select>
    </Box>
  );
};

export default PaginationControls;
