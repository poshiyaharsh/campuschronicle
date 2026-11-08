"use client";

import * as React from "react";
import Image from "next/image";
import {
  UploadCloud,
  Video,
  CheckCircle2,
  AlertCircle,
  Trash2,
  Plus,
} from "lucide-react";
import { mediaSchema } from "@/lib/validations/admin";
import { SAMPLE_MEDIA, MediaItem } from "@/lib/data/mock-data";

export default function AdminMediaPage() {
  const [mediaList, setMediaList] = React.useState<MediaItem[]>(SAMPLE_MEDIA);
  const [activeTab, setActiveTab] = React.useState<"photos" | "video">("photos");

  // Photo upload form state
  const [photoTitle, setPhotoTitle] = React.useState("");
  const [photoUrl, setPhotoUrl] = React.useState("");
  const [photoCategory, setPhotoCategory] = React.useState("classroom");
  const [photoCaption, setPhotoCaption] = React.useState("");
  const [photoAlt, setPhotoAlt] = React.useState("");
  const [photoYear, setPhotoYear] = React.useState("2024-25");

  // Video form state
  const [videoTitle, setVideoTitle] = React.useState("");
  const [videoUrl, setVideoUrl] = React.useState("");
  const [videoType, setVideoType] = React.useState<"mp4" | "hls">("hls");
  const [videoCaption, setVideoCaption] = React.useState("");
  const [videoYear, setVideoYear] = React.useState("2024-25");

  // Notifications
  const [notification, setNotification] = React.useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const [uploadProgress, setUploadProgress] = React.useState<number | null>(null);

  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    setNotification(null);

    const payload = {
      title: photoTitle,
      category_slug: photoCategory,
      media_type: "image" as const,
      source_type: "cloudinary" as const,
      url: photoUrl || "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
      caption: photoCaption,
      alt_text: photoAlt || photoTitle,
      academic_year: photoYear,
    };

    const validation = mediaSchema.safeParse(payload);
    if (!validation.success) {
      setNotification({
        type: "error",
        message: validation.error.issues[0]?.message || "Validation failed",
      });
      return;
    }

    // Simulate upload progress
    setUploadProgress(20);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (!prev || prev >= 100) {
          clearInterval(interval);
          const newItem: MediaItem = {
            id: `med-${Date.now()}`,
            thumbnail_url: payload.url,
            ...payload,
          };
          setMediaList([newItem, ...mediaList]);
          setNotification({
            type: "success",
            message: `Photo "${photoTitle}" uploaded successfully to Cloudinary!`,
          });
          setPhotoTitle("");
          setPhotoUrl("");
          setPhotoCaption("");
          setPhotoAlt("");
          return null;
        }
        return prev + 40;
      });
    }, 200);
  };

  const handleAddVideo = (e: React.FormEvent) => {
    e.preventDefault();
    setNotification(null);

    const payload = {
      title: videoTitle,
      category_slug: "videos",
      media_type: "video" as const,
      source_type: videoType,
      url: videoUrl,
      caption: videoCaption,
      alt_text: videoTitle,
      academic_year: videoYear,
    };

    const validation = mediaSchema.safeParse(payload);
    if (!validation.success) {
      setNotification({
        type: "error",
        message: validation.error.issues[0]?.message || "Validation failed",
      });
      return;
    }

    const newItem: MediaItem = {
      id: `vid-${Date.now()}`,
      thumbnail_url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80",
      duration: 300,
      ...payload,
    };

    setMediaList([newItem, ...mediaList]);
    setNotification({
      type: "success",
      message: `Video stream "${videoTitle}" registered successfully!`,
    });
    setVideoTitle("");
    setVideoUrl("");
    setVideoCaption("");
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      setMediaList(mediaList.filter((m) => m.id !== id));
      setNotification({
        type: "success",
        message: `Deleted "${title}".`,
      });
    }
  };

  return (
    <div className="space-y-10">
      {/* Notifications */}
      {notification && (
        <div
          className={`rounded-xl border p-4 text-xs font-semibold flex items-center gap-2.5 ${
            notification.type === "success"
              ? "border-primary/40 bg-primary/10 text-primary"
              : "border-destructive/40 bg-destructive/10 text-destructive"
          }`}
        >
          {notification.type === "success" ? (
            <CheckCircle2 className="h-4 w-4 shrink-0" />
          ) : (
            <AlertCircle className="h-4 w-4 shrink-0" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab("photos")}
          className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold ${
            activeTab === "photos"
              ? "bg-primary text-primary-foreground"
              : "border border-border bg-card text-muted-foreground hover:bg-secondary"
          }`}
        >
          <UploadCloud className="h-4 w-4" />
          <span>Upload New Photos</span>
        </button>

        <button
          onClick={() => setActiveTab("video")}
          className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold ${
            activeTab === "video"
              ? "bg-primary text-primary-foreground"
              : "border border-border bg-card text-muted-foreground hover:bg-secondary"
          }`}
        >
          <Video className="h-4 w-4" />
          <span>Add Video Stream URL</span>
        </button>
      </div>

      {/* Photo Form */}
      {activeTab === "photos" && (
        <form
          onSubmit={handleAddPhoto}
          className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-6 shadow-sm"
        >
          <h3 className="text-lg font-bold font-display text-foreground">
            Upload & Tag Photo
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">
                Photo Title *
              </label>
              <input
                type="text"
                value={photoTitle}
                onChange={(e) => setPhotoTitle(e.target.value)}
                placeholder="e.g. AI Lab Demonstration"
                required
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">
                Target Category *
              </label>
              <select
                value={photoCategory}
                onChange={(e) => setPhotoCategory(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <option value="classroom">Classroom Activities</option>
                <option value="technical-visits">Technical Visits</option>
                <option value="events">IT Events</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">
                Image URL (or Cloudinary destination) *
              </label>
              <input
                type="url"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                required
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">
                Academic Year *
              </label>
              <input
                type="text"
                value={photoYear}
                onChange={(e) => setPhotoYear(e.target.value)}
                placeholder="2024-25"
                required
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              />
            </div>

            <div className="sm:col-span-2 space-y-1.5">
              <label className="text-xs font-medium text-foreground">
                Caption Description *
              </label>
              <input
                type="text"
                value={photoCaption}
                onChange={(e) => setPhotoCaption(e.target.value)}
                placeholder="Brief caption describing the session or attendees"
                required
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              />
            </div>
          </div>

          {/* Progress bar */}
          {uploadProgress !== null && (
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-primary font-mono font-semibold">
                <span>Uploading to Cloud CDN...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-secondary overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={uploadProgress !== null}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-60"
          >
            <Plus className="h-4 w-4" />
            <span>Upload Photo</span>
          </button>
        </form>
      )}

      {/* Video Form */}
      {activeTab === "video" && (
        <form
          onSubmit={handleAddVideo}
          className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-6 shadow-sm"
        >
          <h3 className="text-lg font-bold font-display text-foreground">
            Register Video Stream
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">
                Video Title *
              </label>
              <input
                type="text"
                value={videoTitle}
                onChange={(e) => setVideoTitle(e.target.value)}
                placeholder="e.g. Keynote: Future of Cloud Native Systems"
                required
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">
                Stream Protocol *
              </label>
              <select
                value={videoType}
                onChange={(e) => setVideoType(e.target.value as "mp4" | "hls")}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <option value="hls">HLS Adaptive Streaming (.m3u8)</option>
                <option value="mp4">Direct MP4 Video (.mp4)</option>
              </select>
            </div>

            <div className="sm:col-span-2 space-y-1.5">
              <label className="text-xs font-medium text-foreground">
                Stream / File URL *
              </label>
              <input
                type="url"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder={videoType === "hls" ? "https://stream.server.com/manifest.m3u8" : "https://cdn.server.com/video.mp4"}
                required
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">
                Academic Year *
              </label>
              <input
                type="text"
                value={videoYear}
                onChange={(e) => setVideoYear(e.target.value)}
                placeholder="2024-25"
                required
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">
                Description / Caption *
              </label>
              <input
                type="text"
                value={videoCaption}
                onChange={(e) => setVideoCaption(e.target.value)}
                placeholder="Session summary and speaker credentials"
                required
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              />
            </div>
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <Video className="h-4 w-4" />
            <span>Publish Video Stream</span>
          </button>
        </form>
      )}

      {/* Media Records Table */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm space-y-4 p-6">
        <h3 className="text-lg font-bold font-display text-foreground">
          Existing Media Assets ({mediaList.length})
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-border text-muted-foreground uppercase tracking-wider">
              <tr>
                <th className="pb-3 font-semibold">Preview</th>
                <th className="pb-3 font-semibold">Title</th>
                <th className="pb-3 font-semibold">Type</th>
                <th className="pb-3 font-semibold">Category</th>
                <th className="pb-3 font-semibold">Year</th>
                <th className="pb-3 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {mediaList.map((m) => (
                <tr key={m.id} className="hover:bg-secondary/40 transition-colors">
                  <td className="py-3">
                    <div className="relative h-10 w-16 overflow-hidden rounded bg-muted border border-border">
                      <Image
                        src={m.thumbnail_url || m.url}
                        alt={m.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </td>
                  <td className="py-3 font-medium text-foreground max-w-xs truncate">
                    {m.title}
                  </td>
                  <td className="py-3">
                    <span className="rounded bg-secondary px-2 py-0.5 font-mono uppercase text-[10px]">
                      {m.media_type}:{m.source_type}
                    </span>
                  </td>
                  <td className="py-3 text-muted-foreground">
                    {m.category_slug}
                  </td>
                  <td className="py-3 text-muted-foreground">
                    {m.academic_year}
                  </td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => handleDelete(m.id, m.title)}
                      className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                      title="Delete asset"
                      aria-label={`Delete ${m.title}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
