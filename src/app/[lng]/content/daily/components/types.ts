export interface DailyTopicItem {
  id: string;
  title: string;
  image_url: string;
  category?: string;
  slug: string;
  node_type: string;
  event_start?: string;
  event_end?: string;
  event_location?: string;
}
