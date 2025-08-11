'use client';

import { Box, Grid, Skeleton } from '@mui/material';
import { useEffect, useState, useRef } from 'react';
import EventDetail from '@/components/content/slug-components/EventDetails';
import { getEventDetails } from '@/utils/content/content';
import { getDailyPageData } from '@/utils/content/getDailyPageData';
import dynamic from 'next/dynamic';
import BaseLayout from "@/layouts/base-layout";
import BannerCarousel from "@/components/banner/BannerCarousel";
import EmptyState from "@/components/empty-box";
import Breadcrumbs from "@/components/breadcrumbs/index";
const Submenu = dynamic(() => import("@/components/header/submenu"));
import { useParams } from 'next/navigation';
import SideBannerCarousel from '@/components/banner/SideBanner';
import SideBanner from '../components/SideBanner';
import EventReminderDialog from '../components/EventRemiderDialogue';
import { AlertMessage, AlertMessageRef } from '@/components/alert-message';

interface BannerImage {
  id: string;
  image_url: string;
  link?: string;
  duration?: number;
}

interface TimeSlot {
  dayOfWeek: number;
  textTime: string;
}

interface EventData {
  eventTitle: string;
  coverImage: string;
  location: string;
  eventDescription: string;
  categoryName: string;
  latitude: string;
  longitude: string;
  redirectionLink: string;
  price?: string;
  eventSchedule: {
    startDate: string;
    endDate: string;
    timeSlotType: number;
    generalTextTime?: string | null;
    timeSlots: TimeSlot[];
    startTime?: string | null;
    endTime?: string | null;
  };
}

export default function EventPage() {
  const alertRef = useRef<AlertMessageRef>(null);
  const params = useParams();
  const slugArray = params?.slug as string | undefined;
  const slug = decodeURIComponent(slugArray ?? "");

  const [eventDialogueOpen, setEventDialogueOpen] = useState(false);
  const [event, setEvent] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);
  const [sideBanner, setSideBanner] = useState<{ images: BannerImage[] } | null>(null);
  const [heroBanner, setHeroBanner] = useState<{ images: BannerImage[] } | null>(null);

  const mapBannerImages = (images: BannerImage[]) =>
    images.map((img) => ({
      id: img.id,
      image: img.image_url,
      title: '',
      subtitle: '',
      cta: '',
      href: img.link || '#',
      duration: img.duration,
    }));

  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      try {
        const eventData = await getEventDetails(slug);
        if (!eventData) return;

        const { eventDetailHeroBanner, eventDetailSideBanner } = await getDailyPageData();

        setEvent(eventData);
        setHeroBanner(eventDetailHeroBanner);
        setSideBanner(eventDetailSideBanner);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <BaseLayout>
        <Submenu />
        <Box sx={{ maxWidth: "1170px", mx: "auto", width: "100%" }}>
          <Skeleton variant="rectangular" width="100%" height={250} sx={{ borderRadius: 2, mt: 2 }} />
          <Box sx={{ mx: "auto", pt: 4 }}>
            <Skeleton width="200px" height={32} />
          </Box>
          <Box sx={{ mx: "auto", py: 2 }}>
            <Grid container spacing={4} alignItems="stretch">
              <Grid item xs={12} md={8.5}>
                <Skeleton variant="rectangular" height={300} sx={{ borderRadius: 2, mb: 2 }} />
                <Skeleton variant="text" width="80%" height={30} />
                <Skeleton variant="text" width="90%" height={20} />
                <Skeleton variant="text" width="95%" height={20} />
                <Skeleton variant="text" width="60%" height={20} sx={{ mb: 4 }} />
                <Skeleton variant="rectangular" height={180} sx={{ borderRadius: 2 }} />
              </Grid>
              <Grid item xs={12} md={3}>
                <Skeleton variant="text" width="100%" height={30} sx={{ mb: 2 }} />
                {[...Array(3)].map((_, idx) => (
                  <Skeleton key={idx} variant="rectangular" height={120} sx={{ mb: 2, borderRadius: 2 }} />
                ))}
                <Skeleton variant="rectangular" height={250} sx={{ borderRadius: 2 }} />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </BaseLayout>
    );
  }

  if (!event) {
    return <EmptyState title="Event Not Found" subtitle="Please check the link or try again later." />;
  }

  return (
    <BaseLayout>
      <Submenu />
      <Box sx={{ maxWidth: "1170px", mx: "auto", width: "100%" }}>
        {!heroBanner?.images?.length ? (
          <EmptyState title="No banners available" subtitle="Please check again later." />
        ) : (
          <BannerCarousel banners={mapBannerImages(heroBanner.images)} />
        )}

        <Box sx={{ mx: "auto", pt: 4 }}>
          <Breadcrumbs />
        </Box>

        <Box sx={{ mx: "auto", py: 2 }}>
          <Grid container alignItems="stretch">
            <Grid item xs={8} sx={{ paddingRight: "10px" }}>
              <EventDetail
                title={event.eventTitle}
                imageUrl={event.coverImage}
                location={event.location}
                content={event.eventDescription}
                dateRange={event.eventSchedule}
                timeRange={event.eventSchedule?.timeSlots}
                slug={slug}
                alertRef={alertRef}
              />
              <AlertMessage ref={alertRef} />
            </Grid>

            <Grid item xs={4} sx={{ paddingLeft: "10px" }}>
              <SideBanner event={event} openDialogueBox={setEventDialogueOpen} />
              {!sideBanner?.images?.length ? (
                <EmptyState title="No Side banners available" subtitle="Please check again later." />
              ) : (
                <SideBannerCarousel banners={mapBannerImages(sideBanner.images)} loading={false} />
              )}
            </Grid>
          </Grid>
        </Box>
      </Box>

      <EventReminderDialog
        event={event}
        open={eventDialogueOpen}
        onClose={() => setEventDialogueOpen(false)}
      />
    </BaseLayout>
  );
}
