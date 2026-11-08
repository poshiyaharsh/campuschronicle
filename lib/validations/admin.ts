import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const albumSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  category_slug: z.string().min(1, "Please select a category"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  academic_year: z.string().regex(/^\d{4}-\d{2}$/, "Format must be YYYY-YY (e.g. 2024-25)"),
  cover_image_url: z.string().url("Must be a valid image URL"),
  event_date: z.string().min(1, "Please provide an event date"),
  is_published: z.boolean().default(true),
});

export const eventSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  category: z.string().min(2, "Category required (e.g. Hackathon, Workshop)"),
  summary: z.string().min(10, "Summary must be at least 10 characters"),
  description: z.string().min(20, "Detailed description must be at least 20 characters"),
  event_date: z.string().min(1, "Event date required"),
  academic_year: z.string().regex(/^\d{4}-\d{2}$/, "Format must be YYYY-YY (e.g. 2024-25)"),
  venue: z.string().min(2, "Venue required"),
  cover_image_url: z.string().url("Must be a valid image URL"),
  is_featured: z.boolean().default(false),
  is_published: z.boolean().default(true),
});

export const mediaSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  category_slug: z.string().min(1, "Category is required"),
  media_type: z.enum(["image", "video"]),
  source_type: z.enum(["cloudinary", "supabase", "mp4", "hls"]),
  url: z.string().url("Must be a valid URL"),
  caption: z.string().min(3, "Caption is required"),
  alt_text: z.string().min(3, "Alt text is required for accessibility"),
  academic_year: z.string().regex(/^\d{4}-\d{2}$/, "Format must be YYYY-YY (e.g. 2024-25)"),
  duration: z.number().optional(),
});

export const siteSettingsSchema = z.object({
  department_name: z.string().min(3, "Department name is required"),
  college_name: z.string().min(3, "College name is required"),
  tagline: z.string().min(5, "Tagline is required"),
  address: z.string().optional(),
  contact_email: z.string().email("Must be a valid email").or(z.literal("")),
  contact_phone: z.string().optional(),
  linkedin: z.string().url("Must be a valid URL").or(z.literal("")),
  youtube: z.string().url("Must be a valid URL").or(z.literal("")),
  twitter: z.string().url("Must be a valid URL").or(z.literal("")),
  github: z.string().url("Must be a valid URL").or(z.literal("")),
});
