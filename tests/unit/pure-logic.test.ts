import { describe, it, expect } from "vitest";
import {
  loginSchema,
  albumSchema,
  eventSchema,
  mediaSchema,
  siteSettingsSchema,
} from "@/lib/validations/admin";
import { searchContent, getAcademicYears } from "@/lib/data/api";

describe("Video Stream Type & URL Utilities", () => {
  const detectVideoType = (url: string): "hls" | "mp4" | "unknown" => {
    if (url.includes(".m3u8") || url.includes("/manifest/")) return "hls";
    if (url.match(/\.(mp4|webm|ogg)$/i) || url.includes("cloudinary.com")) return "mp4";
    return "unknown";
  };

  it("correctly identifies HLS .m3u8 streaming playlist URLs", () => {
    expect(detectVideoType("https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8")).toBe("hls");
    expect(detectVideoType("https://video.example.com/live/manifest/index.m3u8")).toBe("hls");
  });

  it("correctly identifies MP4 video URLs", () => {
    expect(detectVideoType("https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4")).toBe("mp4");
    expect(detectVideoType("https://res.cloudinary.com/demo/video/upload/sample.mp4")).toBe("mp4");
  });

  it("handles unknown video extensions safely", () => {
    expect(detectVideoType("https://example.com/video/stream-blob")).toBe("unknown");
  });
});

describe("Slug and Filename Sanitization", () => {
  const slugify = (text: string): string => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  it("converts mixed titles into URL-safe slugs", () => {
    expect(slugify("InnovateX Hackathon 2024!")).toBe("innovatex-hackathon-2024");
    expect(slugify("  National Science Day -- Day #1  ")).toBe("national-science-day-day-1");
    expect(slugify("AI & Machine Learning: Future of Computing")).toBe("ai-machine-learning-future-of-computing");
  });
});

describe("Zod Validation Schemas", () => {
  describe("loginSchema", () => {
    it("accepts valid email and password", () => {
      const result = loginSchema.safeParse({
        email: "admin@college.edu",
        password: "secretpassword123",
      });
      expect(result.success).toBe(true);
    });

    it("rejects invalid email addresses", () => {
      const result = loginSchema.safeParse({
        email: "not-an-email",
        password: "secretpassword123",
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toContain("valid email");
      }
    });

    it("rejects passwords under 6 characters", () => {
      const result = loginSchema.safeParse({
        email: "admin@college.edu",
        password: "123",
      });
      expect(result.success).toBe(false);
    });
  });

  describe("albumSchema", () => {
    it("validates valid album attributes", () => {
      const result = albumSchema.safeParse({
        title: "Annual Hackathon Memories",
        category_slug: "events",
        description: "Capturing 24 hours of innovation and teamwork.",
        academic_year: "2024-25",
        cover_image_url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b",
        event_date: "2024-10-25",
        is_published: true,
      });
      expect(result.success).toBe(true);
    });

    it("rejects missing title or invalid cover URL", () => {
      const result = albumSchema.safeParse({
        title: "",
        category_slug: "events",
        description: "Short",
        academic_year: "2024-25",
        cover_image_url: "not-a-url",
        event_date: "2024-10-25",
        is_published: true,
      });
      expect(result.success).toBe(false);
    });
  });

  describe("eventSchema", () => {
    it("validates complete event records", () => {
      const result = eventSchema.safeParse({
        title: "National Coding Challenge 2025",
        category: "Hackathon",
        summary: "Inter-college 36-hour code sprint",
        description: "Comprehensive software challenge bringing 500+ student coders together.",
        event_date: "2025-02-15",
        academic_year: "2024-25",
        venue: "Central Auditorium",
        cover_image_url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
        is_featured: true,
        is_published: true,
      });
      expect(result.success).toBe(true);
    });
  });

  describe("mediaSchema", () => {
    it("validates image and video media records", () => {
      const imageResult = mediaSchema.safeParse({
        title: "Lab Session Snapshot",
        category_slug: "classroom",
        media_type: "image",
        source_type: "cloudinary",
        url: "https://images.unsplash.com/photo-1531482615713-2afd69097998",
        caption: "Students configuring servers",
        alt_text: "Group of students at workstation",
        academic_year: "2024-25",
      });
      expect(imageResult.success).toBe(true);

      const videoResult = mediaSchema.safeParse({
        title: "Keynote Address Stream",
        category_slug: "events",
        media_type: "video",
        source_type: "hls",
        url: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
        caption: "Opening address",
        alt_text: "Speaker on stage",
        academic_year: "2024-25",
        duration: 180,
      });
      expect(videoResult.success).toBe(true);
    });
  });

  describe("siteSettingsSchema", () => {
    it("validates official college and social settings", () => {
      const result = siteSettingsSchema.safeParse({
        department_name: "Information Technology",
        college_name: "Engineering Institute",
        tagline: "Preserving Every Memory",
        contact_email: "it.dept@college.edu",
        linkedin: "https://linkedin.com/school/college",
        youtube: "https://youtube.com/@college",
        twitter: "https://twitter.com/college",
        github: "https://github.com/college",
      });
      expect(result.success).toBe(true);
    });
  });
});

describe("Search & Filter Logic", () => {
  it("returns relevant results for existing keywords", async () => {
    const results = await searchContent("hackathon");
    expect(results.total).toBeGreaterThan(0);
    expect(results.events.length).toBeGreaterThan(0);
    expect(results.events[0].title.toLowerCase()).toContain("hackathon");
  });

  it("handles multi-term queries across albums and media", async () => {
    const results = await searchContent("cloud infrastructure");
    expect(results.total).toBeGreaterThan(0);
    expect(results.media.some((m) => m.title.toLowerCase().includes("cloud"))).toBe(true);
  });

  it("gracefully returns zero results for nonexistent queries", async () => {
    const results = await searchContent("non_existent_memory_query_9999");
    expect(results.total).toBe(0);
    expect(results.albums.length).toBe(0);
    expect(results.events.length).toBe(0);
    expect(results.media.length).toBe(0);
  });

  it("extracts distinct academic years sorted descending", async () => {
    const years = await getAcademicYears();
    expect(years.length).toBeGreaterThan(0);
    expect(years).toContain("2024-25");
    expect(years).toContain("2023-24");
    expect(years[0] >= years[1]).toBe(true);
  });
});
