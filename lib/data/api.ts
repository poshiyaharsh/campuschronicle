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

export interface SearchResults {
  query: string;
  albums: Album[];
  events: EventItem[];
  media: MediaItem[];
  total: number;
}

export async function searchContent(query: string): Promise<SearchResults> {
  const cleanQuery = query.trim().toLowerCase();
  if (!cleanQuery) {
    return {
      query: "",
      albums: [],
      events: [],
      media: [],
      total: 0,
    };
  }

  const terms = cleanQuery.split(/\s+/).filter(Boolean);

  const matchesText = (text?: string): boolean => {
    if (!text) return false;
    const lower = text.toLowerCase();
    return terms.some((term) => lower.includes(term));
  };

  const albums = SAMPLE_ALBUMS.filter(
    (a) =>
      matchesText(a.title) ||
      matchesText(a.description) ||
      matchesText(a.category_slug) ||
      matchesText(a.academic_year)
  );

  const events = SAMPLE_EVENTS.filter(
    (e) =>
      matchesText(e.title) ||
      matchesText(e.summary) ||
      matchesText(e.description) ||
      matchesText(e.category) ||
      matchesText(e.venue) ||
      matchesText(e.academic_year)
  );

  const media = SAMPLE_MEDIA.filter(
    (m) =>
      matchesText(m.title) ||
      matchesText(m.caption) ||
      matchesText(m.alt_text) ||
      matchesText(m.category_slug) ||
      matchesText(m.academic_year)
  );

  return {
    query,
    albums,
    events,
    media,
    total: albums.length + events.length + media.length,
  };
}

export async function getAcademicYears(): Promise<string[]> {
  const years = new Set<string>();
  SAMPLE_ALBUMS.forEach((a) => a.academic_year && years.add(a.academic_year));
  SAMPLE_EVENTS.forEach((e) => e.academic_year && years.add(e.academic_year));
  SAMPLE_MEDIA.forEach((m) => m.academic_year && years.add(m.academic_year));
  return Array.from(years).sort().reverse();
}
