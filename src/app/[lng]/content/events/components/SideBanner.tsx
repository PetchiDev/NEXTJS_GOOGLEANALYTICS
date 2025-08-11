'use client';

import React from "react";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  Chip,
  TextField,
  InputAdornment,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CalendarPlus from "../../../../../icons/calendarplus";
import dynamic from "next/dynamic";

const StaticMap = dynamic(() => import('@/components/leaflet-map/StaticMap'), {
  ssr: false,
  loading: () => <p>Loading map...</p>,
});

type SideBannerProps = {
  event: {
    categoryName: string;
    latitude: string;
    longitude: string;
    redirectionLink: string;
    price?: string;
    eventType?: number;
    eventSchedule?: {
      startDate?: string;
      endDate?: string;
      generalTextTime?: string | null;
      timeSlotType?: number;
      timeSlots?: {
        dayOfWeek: number;
        textTime: string;
      }[];
    };
  };
  openDialogueBox: (open: boolean) => void;
};


const SideBanner: React.FC<SideBannerProps> = ({ event, openDialogueBox }) => {
  const getDayName = (dayNumber: number) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[dayNumber % 7]; // 0 (Sunday) to 6 (Saturday)
  };

  return (
    <Card
      elevation={0}
      sx={{
        maxWidth: 400,
        mx: "auto",
        borderRadius: "12px",
        p: 2,
        border: "1px solid #E0E0E0",
        boxShadow: "0px 4px 12px rgba(0,0,0,0.04)",
      }}
    >
      <CardContent sx={{ p: 0 }}>
        <Chip
          label={event.categoryName}
          size="small"
          sx={{
            mb: 2,
            backgroundColor: "#F5FAFF",
            color: "#2A6BA0",
            border: "1px solid #CDE5F9",
            fontWeight: 500,
          }}
        />

        {/* Date Range */}
        <TextField
          value={
            event?.eventSchedule?.startDate && event?.eventSchedule?.endDate
              ? `${event.eventSchedule.startDate} to ${event.eventSchedule.endDate}`
              : ""
          }
          size="small"
          fullWidth
          disabled
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CalendarTodayIcon fontSize="small" sx={{ color: '#000' }} />
              </InputAdornment>
            ),
          }}
          sx={{
            mb: 1,
            bgcolor: "#F9F9F9",
            borderRadius: "8px",
            '& .MuiInputBase-input.Mui-disabled': {
              color: '#454545',
              WebkitTextFillColor: '#454545',
            },
            '& .Mui-disabled': {
              opacity: 1,
            },
          }}
        />
        {/* Time */}
        {event?.eventSchedule?.generalTextTime ? (
          <TextField
            value={event.eventSchedule.generalTextTime}
            size="small"
            fullWidth
            disabled
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccessTimeIcon fontSize="small" sx={{ color: '#000' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              mb: 2,
              bgcolor: "#F9F9F9",
              borderRadius: "8px",
              '& .MuiInputBase-input.Mui-disabled': {
                color: '#454545',
                WebkitTextFillColor: '#454545',
              },
              '& .Mui-disabled': {
                opacity: 1,
              },
            }}
          />
        ) : (
          <Box
            sx={{
              mb: 2,
              bgcolor: "#F9F9F9",
              borderRadius: "8px",
              px: 1.5,
              py: 1.2,
              display: 'flex',
              gap: 1,
              alignItems: 'flex-start',
              flexDirection: 'column',
            }}
          >
            <Box display="flex" alignItems="center" gap={1}>
              <AccessTimeIcon fontSize="small" sx={{ color: '#000' }} />
              <Typography fontWeight={500} color="#454545" fontSize="14px">
                Time Slots:
              </Typography>
            </Box>
            <Box pl={3}>
              {event?.eventSchedule?.timeSlots?.map((slot, index) => (
                <Typography
                  key={index}
                  fontSize="13px"
                  color="#454545"
                  sx={{ mb: 0.5 }}
                >
                  {getDayName(slot.dayOfWeek)}: {slot.textTime}
                </Typography>
              ))}
            </Box>
          </Box>
        )}


        {/* Access Fees */}
        <Typography
          variant="subtitle2"
          sx={{ color: "#333", fontWeight: 500, mb: 0.5 }}
        >
          Access Fees:
        </Typography>
        <Typography
          component="div"
          sx={{ fontWeight: 700, fontSize: "28px", color: "#003459" }}
        >
          {event.eventType === 3
            ? event.price === "0" || event.price === null || event.price === undefined
              ? 'Free'
              : `${event.price} QAR`
            : event.eventType === 2
              ? 'Open Registration'
              : event.eventType === 1
                ? 'Free Access'
                : ''}
        </Typography>
        {/* Buttons */}
        {event?.redirectionLink && (
          <Button
            fullWidth
            variant="contained"
            onClick={() =>
              typeof window !== "undefined" &&
              window.open(event.redirectionLink, "_blank")
            }
            endIcon={<ArrowForwardIosIcon />}
            sx={{
              my: 2,
              backgroundColor: "#F39224",
              color: "#fff",
              fontWeight: 600,
              borderRadius: "8px",
              '&:hover': {
                backgroundColor: "#d77e1f",
              }
            }}
          >
            Book Now
          </Button>
        )}

        <Button
          fullWidth
          variant="outlined"
          endIcon={<CalendarPlus />}
          onClick={() => openDialogueBox(true)}
          sx={{
            borderColor: "#F39224",
            color: "#F39224",
            fontWeight: 600,
            borderRadius: "8px",
            mb: 2,
            '&:hover': {
              backgroundColor: "#FFF3E0",
              borderColor: "#F39224",
            }
          }}
        >
          Add to Calendar
        </Button>

        {/* Map Section */}
        <Box mt={1}>
          <Typography variant="subtitle2" sx={{ fontWeight: 500, mb: 1 }}>
            Location:
          </Typography>
          <Box
            sx={{
              borderRadius: 2,
              overflow: "hidden",
              height: 200,
              border: "1px solid #eee",
            }}
          >
            {!isNaN(parseFloat(event.latitude)) &&
              !isNaN(parseFloat(event.longitude)) ? (
              <StaticMap
                latitude={parseFloat(event.latitude)}
                longitude={parseFloat(event.longitude)}
              />
            ) : (
              <Typography color="error">No location Available</Typography>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SideBanner;
