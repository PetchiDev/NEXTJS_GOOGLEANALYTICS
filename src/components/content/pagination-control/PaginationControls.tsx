'use client';

import React,{useEffect,useState} from 'react';
import {
  Box,
  Button,
  MenuItem,
  Select,
  Typography,
  IconButton,
  useMediaQuery,
} from '@mui/material';
import EastIcon from '@mui/icons-material/East';
import WestIcon from '@mui/icons-material/West';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useTheme } from '@mui/material/styles';

type Props = {
  currentPage: number;
  totalPages: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onNumPageChange: (page: number) => void;
};

const PaginationControls: React.FC<Props> = ({
  currentPage,
  totalPages,
  rowsPerPage,
  onPageChange,
  onNumPageChange,
}) => {
  const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down('sm'), { noSsr: true });
  

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 600); // 600px breakpoint for "sm"
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);




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
          variant="text"
          sx={{
            minWidth: isMobile ? 32 : 36,
            borderRadius: '8px',
            backgroundColor: '#fff !important',
            ':hover': {
              backgroundColor: '#fff !important',
            },
            mx: isMobile ? 0.25 : 0.5,
            color: page === currentPage ? '#000' : '#555',
            fontWeight: 500,
            textTransform: 'none',
            boxShadow: page === currentPage ? 1 : 'none',
            border: page === currentPage ? '1px solid #ccc' : '1px solid transparent',
            fontSize: isMobile ? '0.875rem' : '1rem',
          }}
          onClick={() => onNumPageChange(page)}
        >
          {page}
        </Button>
      ) : (
        <Typography key={idx} sx={{ mx: isMobile ? 0.5 : 1, color: '#888' }}>
          {page}
        </Typography>
      )
    );
  };

  // Mobile view - minimal pagination
  if (isMobile) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" gap={2} mt={4}>
        <IconButton 
          onClick={() => onPageChange(currentPage - 1)} 
          disabled={currentPage <= 1}
          sx={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            backgroundColor: "#fff !important",
            minWidth: '40px',
            height: '40px'
          }}
        >
          <ArrowBackIosNewIcon fontSize="small" sx={{ color: "#475467" }} />
        </IconButton>

        <Typography variant="body2" sx={{ fontWeight: 500, color: '#475467' }}>
          Page {currentPage} of {totalPages}
        </Typography>

        <IconButton 
          onClick={() => onPageChange(currentPage + 1)} 
          disabled={currentPage >= totalPages}
          sx={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            backgroundColor: "#fff !important",
            minWidth: '40px',
            height: '40px'
          }}
        >
          <ArrowForwardIosIcon fontSize="small" sx={{ color: "#475467" }} />
        </IconButton>
      </Box>
    );
  }

  // Desktop view - full pagination bar
  return (
    <Box sx={{display:'flex',gap:"30px",justifyContent:'space-between',alignItems:'center',flexDirection:'column',width:"100%"}}>
      <Box       
        sx={{width:"100%"}}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
        gap={2}
        mt={4}>
        <IconButton
          onClick={() => onPageChange(currentPage - 1)}
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
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          sx={{border:"1px solid",borderRadius:"8px",backgroundColor:"#ffff !important", minWidth:'100px'}}
        >
          <Typography sx={{fontWeight:600,color:'#475467'}} ml={0.5}>Next</Typography>
          <EastIcon fontSize="small"  sx={{color:"#475467"}}/>
        </IconButton>
      </Box>
    </Box>
  );
};

export default PaginationControls;
