"use client";

import React, { useEffect, useState, Suspense, useMemo } from "react";
import { Box, Skeleton, useMediaQuery, Grid } from "@mui/material";
import BaseLayout from "@/layouts/base-layout";
import dynamic from "next/dynamic";
import BannerCarousel from "@/components/banner/BannerCarousel";
import { getDailyPageData } from "@/utils/content/getDailyPageData";
import EmptyState from "@/components/empty-box";
import FeaturedEvents from "@/components/content/events-components/FeaturedEvents";
import EventCard from "./components/EventCard";
import EventFilterBar from "./components/EventFilterBar";
import SortDropdown from "./components/SortDropdown";
import { getAllEventData } from "@/utils/content/event-datas";
import PaginationFooter from "@/components/custom-pagination";
import FeedbackForm from "@/components/feedback/FeedbackForm";
import { useRouter, useSearchParams } from "next/navigation";

const Submenu = dynamic(() => import("@/components/header/submenu"));

interface EventSchedule {
  startDate: string;
  endDate: string;
  timeSlotType: number;
  generalTextTime: string | null;
  timeSlots: { dayOfWeek: number; textTime: string }[];
}
interface FeaturedSlot { id: number; name: string | null; }
interface Event {
  id: string;
  eventTitle: string;
  categoryId: number;
  categoryName: string;
  eventType: number;
  price: number | null;
  location: string;
  locationId: number;
  venue: string;
  longitude: string;
  latitude: string;
  redirectionLink: string;
  eventSchedule: EventSchedule;
  eventDescription: string;
  coverImage: string;
  isFeatured: boolean;
  featuredSlot: FeaturedSlot;
  publishedDate: string;
  status: number;
  slug: string;
  isActive: boolean;
  createdBy: string;
  createdAt: string;
  updatedBy: string | null;
  updatedAt: string | null;
}
interface BannerImage {
  id: string | number;
  image_url_mobile: string;
  image_url: string;
  link?: string;
  duration?: number | string;
}
interface EventHeroBanner { images: BannerImage[]; }
interface FeaturedEvent { id: string; title: string; image_url: string; }

function EventLandingPage() {
  const isMobile = useMediaQuery("(max-width:600px)");
  const router = useRouter();
  const searchParams = useSearchParams();

  const [eventHeroBanner, setEventHeroBanner] = useState<EventHeroBanner | null>(null);
  const [featuredArticles, setFeaturedArticles] = useState<FeaturedEvent[]>([]);
  const [loadingBanner, setLoadingBanner] = useState(true);
  const [loadingFeaturedEvent, setLoadingFeaturedEvent] = useState(true);
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<Event[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState<string[]>([]);
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [freeOnly, setFreeOnly] = useState(false);
  const [sortDirection, setSortDirection] = useState<"default" | "sortByLowToHigh" | "sortByHighToLow">("default");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const page = useMemo(() => Number(searchParams.get("curpage") ?? 1), [searchParams]);
  const pageSize = useMemo(() => Number(searchParams.get("perpage") ?? 12), [searchParams]);
  const totalPages = useMemo(() => Math.max(1, Math.ceil(totalCount / pageSize)), [totalCount, pageSize]);
  const [inputValue, setInputValue] = useState(search);
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(inputValue);
    }, 500);
    return () => clearTimeout(handler);
  }, [inputValue]);

  const resetToFirstPage = () => {
    const params = new URLSearchParams(searchParams.toString());
    if ((params.get("curpage") ?? "1") !== "1") {
      params.set("curpage", "1");
      router.replace(`?${params.toString()}`, { scroll: false });
    }
  };


  useEffect(() => {
    const perselect = searchParams.get("perselect");
    if (perselect) setCategory(perselect);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const { eventHeroBanner, featuredArticles } = await getDailyPageData();
        setEventHeroBanner(eventHeroBanner);
        setFeaturedArticles(featuredArticles);
      } catch (e) {
        console.error("Failed to fetch banner data", e);
      } finally {
        setLoadingBanner(false);
        setLoadingFeaturedEvent(false);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await getAllEventData({
          page,
          perPage: pageSize,
          status: 1,
          search: inputValue || undefined,
          categoryId: category ? Number(category) : undefined,
          priceSortOrder: sortDirection,
          fromDate: date || undefined,
          toDate: date || undefined,
          locationId: location.length ? location.map(Number) : undefined,
          freeOnly,
          featuredFirst: false,
        });

        setEvents(
          (response?.items || []).map((item: any) => ({
            ...item,
            id: String(item.id),
            eventTitle: item.eventTitle ?? "",
            categoryId: item.categoryId ?? 0,
            categoryName: item.categoryName ?? "",
            eventType: item.eventType,
            price: item.price ?? null,
            location: item.location ?? "",
            locationId: item.locationId ?? 0,
            venue: item.venue ?? "",
            longitude: item.longitude ?? "",
            latitude: item.latitude ?? "",
            redirectionLink: item.redirectionLink ?? "",
            eventSchedule: {
              startDate: item.eventSchedule?.startDate ?? "",
              endDate: item.eventSchedule?.endDate ?? "",
              timeSlotType: 0,
              generalTextTime: null,
              timeSlots: [],
            },
            eventDescription: item.eventDescription ?? "",
            coverImage: item.coverImage ?? "",
            isFeatured: item.isFeatured ?? false,
            featuredSlot: { id: 0, name: null },
            publishedDate: item.publishedDate ?? "",
            status: item.status ?? 0,
            slug: item.slug ?? "",
            isActive: true,
            createdBy: "",
            createdAt: "",
            updatedBy: null,
            updatedAt: null,
          }))
        );

        setTotalCount(response?.totalCount || 0);
      } catch (err) {
        console.error("Failed to fetch events", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [debouncedSearch,page, pageSize, search, location, category, date, freeOnly, sortDirection]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLocationChange = (value: string[]) => {
    setLocation(value);
    resetToFirstPage();
  };

  return (
    <BaseLayout>
      <Submenu />
      <Box sx={{ maxWidth: "1170px", mx: "auto", width: "100%" }}>
        <Box sx={{ pt: isMobile ? 2 : 0, px: isMobile ? 2 : 0 }}>
          {loadingBanner ? (
            <Skeleton variant="rectangular" width="100%" height={250} />
          ) : !eventHeroBanner?.images?.length ? (
            <EmptyState title="No banners available" subtitle="Please check again later." />
          ) : (
            <BannerCarousel
              banners={eventHeroBanner.images.map((img: BannerImage) => ({
                id: String(img.id),
                image: isMobile ? img.image_url_mobile : img.image_url,
                title: "",
                subtitle: "",
                cta: "",
                href: img.link || "#",
                duration: img.duration !== undefined ? Number(img.duration) : undefined,
              }))}
              loading={false}
            />
          )}
        </Box>

        <Box sx={{ mt: 4, px: isMobile ? 2 : 0 }}>
          {loadingFeaturedEvent ? (
            <Grid container spacing={2}>
              {[...Array(3)].map((_, i) => (
                <Grid item xs={12} sm={4} key={i}>
                  <Skeleton variant="rectangular" height={200} />
                </Grid>
              ))}
            </Grid>
          ) : !featuredArticles.length ? (
            <EmptyState title="No featured events" subtitle="Try again later." />
          ) : (
            <FeaturedEvents featuredEvents={featuredArticles} loading={false} />
          )}
        </Box>

        <Box sx={{ mt: 4, px: isMobile ? 2 : 0 }}>
          <EventFilterBar
            searchText={inputValue}
            onSearchChange={(v) => { setInputValue(v); resetToFirstPage(); }}
            location={location}
            onLocationChange={handleLocationChange}
            category={category}
            onCategoryChange={(v) => { setCategory(v); resetToFirstPage(); }}
            date={date}
            startDate={startDate}
            setStartDate={(d) => { setStartDate(d); }}
            endDate={endDate}
            setEndDate={(d) => { setEndDate(d); }}
            onDateChange={(v) => { setDate(v); resetToFirstPage(); }}
            showFreeOnly={freeOnly}
            onToggleFree={(v) => { setFreeOnly(Boolean(v)); resetToFirstPage(); }}
            onClear={() => {
              setSearch("");
              setLocation([]);
              setCategory("");
              setDate("");
              setStartDate(null);
              setEndDate(null);
              setFreeOnly(false);
              resetToFirstPage();
            }}
            categories={["Awareness campaigns", "Forums", "Workshops"]}
          />

          <Box sx={{ mt: 2, mb: 1 }}>
            <Grid container alignItems="center" columnSpacing={2} rowSpacing={1}>
              <Grid item xs={12} sm>
                <Box
                  component="span"
                  sx={{ fontSize: 18, fontWeight: 500, color: "#242729", lineHeight: 1 }}
                >
                  Events in Qatar ({totalCount} results)
                </Box>
              </Grid>

              <Grid item xs="auto">
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <SortDropdown
                    value={sortDirection}
                    onChange={(v) => { setSortDirection(v as any); resetToFirstPage(); }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>

          {loading ? (
            <Grid container spacing={2}>
              {[...Array(6)].map((_, i) => (
                <Grid item xs={12} sm={6} md={4} key={i}>
                  <Skeleton variant="rectangular" height={250} />
                </Grid>
              ))}
            </Grid>
          ) : events.length === 0 ? (
            <EmptyState title="No Events Found" subtitle="Try adjusting your filters." />
          ) : (
            <Grid container spacing={2}>
              {events.map((event) => (
                <Grid item xs={12} sm={12} md={4} key={event.id}>
                  <EventCard
                    image={event.coverImage}
                    category={event.categoryName || "—"}
                    title={event.eventTitle}
                    location={event.location}
                    description={event.eventDescription}
                    startDate={event.eventSchedule?.startDate}
                    endDate={event.eventSchedule?.endDate}
                    slug={event.slug}
                    price={event.price}
                    eventType={event.eventType}
                    sortBy={sortDirection}
                  />
                </Grid>
              ))}
            </Grid>
          )}

          <Box sx={{ mt: 3, mb: 6 }}>
            <PaginationFooter
              totalPages={totalPages}
              preSelectedPerPage={String(pageSize)}
              paginationOptions={[12, 24, 48]}
              translationNS="events"
            />
          </Box>
        </Box>
      </Box>
    </BaseLayout>
  );
}

export default function EventsPage() {
  return (
    <Suspense fallback={<Skeleton height={600} />}>
      <EventLandingPage />
      <FeedbackForm />
    </Suspense>
  );
}
