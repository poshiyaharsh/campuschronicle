/**
 * CampusChronicle - Sample Mock Data
 *
 * Used for offline development and local previews when Supabase is not connected.
 * All entries are labeled with TODO_VERIFY for real departmental facts.
 */

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  sort_order: number;
}

export interface Album {
  id: string;
  category_id: string;
  category_slug: string;
  title: string;
  slug: string;
  description: string;
  academic_year: string;
  cover_image_url: string;
  event_date: string;
  photo_count: number;
  is_published: boolean;
}

export interface EventItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  event_date: string;
  academic_year: string;
  venue: string;
  summary: string;
  description: string;
  cover_image_url: string;
  is_featured: boolean;
  is_published: boolean;
  highlights?: string[];
}

export interface MediaItem {
  id: string;
  album_id?: string;
  event_id?: string;
  title: string;
  category_slug: string;
  media_type: "image" | "video";
  source_type: "cloudinary" | "supabase" | "mp4" | "hls";
  url: string;
  thumbnail_url: string;
  caption: string;
  alt_text: string;
  academic_year: string;
  width?: number;
  height?: number;
  duration?: number;
}

export interface SiteSettings {
  department_name: string;
  college_name: string;
  tagline: string;
  address: string;
  contact_email: string;
  contact_phone: string;
  social_links: {
    linkedin?: string;
    youtube?: string;
    twitter?: string;
    github?: string;
  };
}

export const SAMPLE_CATEGORIES: Category[] = [
  {
    id: "cat-1",
    name: "Classroom Activities",
    slug: "classroom",
    description: "Lectures, hands-on labs, presentations, and student workshops.",
    sort_order: 1,
  },
  {
    id: "cat-2",
    name: "Technical Visits",
    slug: "technical-visits",
    description: "Industrial immersion trips, corporate tours, and industry insights.",
    sort_order: 2,
  },
  {
    id: "cat-3",
    name: "IT Events",
    slug: "events",
    description: "Hackathons, technical symposiums, and student achievements.",
    sort_order: 3,
  },
  {
    id: "cat-4",
    name: "Video Archives",
    slug: "videos",
    description: "Video recordings of keynote addresses, webinars, and demonstrations.",
    sort_order: 4,
  },
];

export const SAMPLE_ALBUMS: Album[] = [
  {
    id: "alb-1",
    category_id: "cat-1",
    category_slug: "classroom",
    title: "Cloud Computing & DevOps Lab Session",
    slug: "cloud-computing-devops-lab",
    description: "Students designing CI/CD pipelines and deploying microservices on Kubernetes.",
    academic_year: "2024-25",
    cover_image_url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
    event_date: "2024-10-15",
    photo_count: 14,
    is_published: true,
  },
  {
    id: "alb-2",
    category_id: "cat-1",
    category_slug: "classroom",
    title: "Advanced Data Structures & Algorithms Workshop",
    slug: "advanced-algorithms-workshop",
    description: "Interactive problem solving, algorithm visualization, and competitive coding practice.",
    academic_year: "2024-25",
    cover_image_url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    event_date: "2024-09-20",
    photo_count: 18,
    is_published: true,
  },
  {
    id: "alb-3",
    category_id: "cat-2",
    category_slug: "technical-visits",
    title: "Industrial Immersion at Cyber Security Center",
    slug: "industrial-visit-cyber-security",
    description: "Exposure to enterprise security operations, SOC environments, and incident response frameworks.",
    academic_year: "2024-25",
    cover_image_url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
    event_date: "2024-11-04",
    photo_count: 22,
    is_published: true,
  },
  {
    id: "alb-4",
    category_id: "cat-2",
    category_slug: "technical-visits",
    title: "Technical Tour of Data Center Infrastructure",
    slug: "data-center-technical-tour",
    description: "First-hand inspection of server rack architecture, thermal management, and power redundancy.",
    academic_year: "2023-24",
    cover_image_url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    event_date: "2024-02-18",
    photo_count: 16,
    is_published: true,
  },
];

export const SAMPLE_EVENTS: EventItem[] = [
  {
    id: "evt-1",
    title: "InnovateX 24-Hour Department Hackathon",
    slug: "innovatex-hackathon-2024",
    category: "Hackathon",
    event_date: "2024-10-28",
    academic_year: "2024-25",
    venue: "Main Computing Center & Auditorium",
    summary: "Over 120 student coders competed to prototype innovative AI and web solutions under 24 hours.",
    description: "InnovateX 2024 brought together talented engineering minds to solve real-world problems in Healthcare, FinTech, and Smart Campus automation. Industry mentors provided live architecture reviews and code evaluations.",
    cover_image_url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
    is_featured: true,
    is_published: true,
    highlights: [
      "120+ active participants across 30 teams",
      "Keynote address by industry cloud architects",
      "Live project demonstrations and evaluation round",
    ],
  },
  {
    id: "evt-2",
    title: "National Tech Symposium & Paper Presentation",
    slug: "tech-symposium-2024",
    category: "Symposium",
    event_date: "2024-08-14",
    academic_year: "2024-25",
    venue: "Department Seminar Hall",
    summary: "Annual research presentation conference showcasing peer-reviewed student research projects.",
    description: "The National Tech Symposium featured research tracks covering Quantum Computing algorithms, Natural Language Processing, and Distributed Ledger systems.",
    cover_image_url: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80",
    is_featured: true,
    is_published: true,
    highlights: [
      "24 research papers presented and reviewed",
      "Distinguished faculty chair panel",
      "Cash awards for best technical paper",
    ],
  },
  {
    id: "evt-3",
    title: "Open Source Code Camp & Git Immersion",
    slug: "open-source-code-camp",
    category: "Workshop",
    event_date: "2024-03-12",
    academic_year: "2023-24",
    venue: "Software Engineering Laboratory 3",
    summary: "Hands-on student boot camp on Git workflows, pull requests, and contributing to open-source software.",
    description: "A fast-paced collaborative workshop teaching Git branch workflows, conflict resolution, GitHub actions, and licensing.",
    cover_image_url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
    is_featured: false,
    is_published: true,
    highlights: [
      "100% hands-on CLI practice",
      "Every attendee authored their first open PR",
    ],
  },
];

export const SAMPLE_MEDIA: MediaItem[] = [
  {
    id: "med-1",
    album_id: "alb-1",
    title: "Cloud Infrastructure Setup",
    category_slug: "classroom",
    media_type: "image",
    source_type: "cloudinary",
    url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
    thumbnail_url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80",
    caption: "Students configuring infrastructure as code (TODO_VERIFY)",
    alt_text: "Students collaborating on cloud architecture diagrams",
    academic_year: "2024-25",
    width: 1200,
    height: 800,
  },
  {
    id: "med-2",
    album_id: "alb-1",
    title: "Lab Code Review",
    category_slug: "classroom",
    media_type: "image",
    source_type: "cloudinary",
    url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    thumbnail_url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80",
    caption: "Peer code review in practical lab (TODO_VERIFY)",
    alt_text: "Group of students reviewing code on laptops",
    academic_year: "2024-25",
    width: 1200,
    height: 800,
  },
  {
    id: "med-3",
    album_id: "alb-3",
    title: "SOC Facility Briefing",
    category_slug: "technical-visits",
    media_type: "image",
    source_type: "cloudinary",
    url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
    thumbnail_url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80",
    caption: "Industrial cybersecurity briefing by lead engineers (TODO_VERIFY)",
    alt_text: "Students listening to briefing in modern tech office",
    academic_year: "2024-25",
    width: 1200,
    height: 800,
  },
  {
    id: "med-4",
    album_id: "alb-4",
    title: "Data Center Thermal Management",
    category_slug: "technical-visits",
    media_type: "image",
    source_type: "cloudinary",
    url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    thumbnail_url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80",
    caption: "High density server rack walkthrough (TODO_VERIFY)",
    alt_text: "Server racks in lighted data center corridor",
    academic_year: "2023-24",
    width: 1200,
    height: 800,
  },
  {
    id: "med-5",
    event_id: "evt-1",
    title: "Hackathon Midnight Hacking",
    category_slug: "events",
    media_type: "image",
    source_type: "cloudinary",
    url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80",
    thumbnail_url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=600&q=80",
    caption: "Teams iterating on final prototypes at 2 AM (TODO_VERIFY)",
    alt_text: "Hackathon participants gathered around tables working late",
    academic_year: "2024-25",
    width: 1200,
    height: 800,
  },
  {
    id: "med-6",
    event_id: "evt-2",
    title: "Symposium Keynote Address",
    category_slug: "events",
    media_type: "image",
    source_type: "cloudinary",
    url: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80",
    thumbnail_url: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=600&q=80",
    caption: "Distinguished guest presenting on future computing paradigms (TODO_VERIFY)",
    alt_text: "Auditorium stage with speaker giving presentation",
    academic_year: "2024-25",
    width: 1200,
    height: 800,
  },
  // Sample Videos
  {
    id: "med-7",
    title: "Annual Tech Fest 2024: Marquee Highlights",
    category_slug: "videos",
    media_type: "video",
    source_type: "mp4",
    url: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4",
    thumbnail_url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80",
    caption: "Recap reel of the 2024 departmental events and competitions (TODO_VERIFY)",
    alt_text: "Video thumbnail showing department event ceremony",
    academic_year: "2024-25",
    duration: 596,
  },
  {
    id: "med-8",
    title: "Keynote Lecture: Modern Distributed Systems",
    category_slug: "videos",
    media_type: "video",
    source_type: "hls",
    url: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    thumbnail_url: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=600&q=80",
    caption: "Adaptive bitrate HLS recording of guest lecture session (TODO_VERIFY)",
    alt_text: "Video thumbnail showing lecture presentation slide",
    academic_year: "2024-25",
    duration: 634,
  },
];

export const SAMPLE_SITE_SETTINGS: SiteSettings = {
  department_name: "Department of Information Technology",
  college_name: "TODO_VERIFY (College Name)",
  tagline: "Every Event. Every Experience. Every Memory: Preserved Forever.",
  address: "Block B, Department of IT, Campus Grounds (TODO_VERIFY)",
  contact_email: "it-dept@college.edu (TODO_VERIFY)",
  contact_phone: "+91 (0) 1234 567890 (TODO_VERIFY)",
  social_links: {
    linkedin: "https://linkedin.com",
    youtube: "https://youtube.com",
    twitter: "https://twitter.com",
    github: "https://github.com/poshiyaharsh/campuschronicle",
  },
};
