import {
  SAMPLE_CATEGORIES,
  SAMPLE_ALBUMS,
  SAMPLE_EVENTS,
  SAMPLE_MEDIA,
  SAMPLE_SITE_SETTINGS,
  Category,
  Album,
  EventItem,
  MediaItem,
  SiteSettings,
} from "./mock-data";

/**
 * Returns whether live Supabase credentials are configured in the environment.
 */
export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("your-project-id")
  );
}

export async function getCategories(): Promise<Category[]> {
  // If Supabase is configured, client queries will be performed. Otherwise return mock data.
  return SAMPLE_CATEGORIES;
}

export async function getAlbums(categorySlug?: string): Promise<Album[]> {
  if (categorySlug) {
    return SAMPLE_ALBUMS.filter((a) => a.category_slug === categorySlug);
  }
  return SAMPLE_ALBUMS;
}

export async function getAlbumBySlug(slug: string): Promise<Album | null> {
  const album = SAMPLE_ALBUMS.find((a) => a.slug === slug);
  return album || null;
}

export async function getEvents(academicYear?: string): Promise<EventItem[]> {
  if (academicYear) {
    return SAMPLE_EVENTS.filter((e) => e.academic_year === academicYear);
  }
  return SAMPLE_EVENTS;
}

export async function getFeaturedEvents(): Promise<EventItem[]> {
  return SAMPLE_EVENTS.filter((e) => e.is_featured);
}

export async function getEventBySlug(slug: string): Promise<EventItem | null> {
  const event = SAMPLE_EVENTS.find((e) => e.slug === slug);
  return event || null;
}

export async function getMedia(options?: {
  categorySlug?: string;
  academicYear?: string;
  mediaType?: "image" | "video";
}): Promise<MediaItem[]> {
  let items = [...SAMPLE_MEDIA];

  if (options?.categorySlug) {
    items = items.filter((m) => m.category_slug === options.categorySlug);
  }
  if (options?.academicYear) {
    items = items.filter((m) => m.academic_year === options.academicYear);
  }
  if (options?.mediaType) {
    items = items.filter((m) => m.media_type === options.mediaType);
  }

  return items;
}

export async function getMediaByAlbumId(albumId: string): Promise<MediaItem[]> {
  return SAMPLE_MEDIA.filter((m) => m.album_id === albumId);
}

export async function getMediaByEventId(eventId: string): Promise<MediaItem[]> {
  return SAMPLE_MEDIA.filter((m) => m.event_id === eventId);
}

export async function getSiteSettings(): Promise<SiteSettings> {
  return SAMPLE_SITE_SETTINGS;
}
