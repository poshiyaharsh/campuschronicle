"use client";

import * as React from "react";
import Image from "next/image";
import { Calendar, Trash2, Eye, EyeOff, Plus, CheckCircle2, AlertCircle, Star } from "lucide-react";
import { SAMPLE_EVENTS, EventItem } from "@/lib/data/mock-data";
import { eventSchema } from "@/lib/validations/admin";

export default function AdminEventsPage() {
  const [events, setEvents] = React.useState<EventItem[]>(SAMPLE_EVENTS);

  const [title, setTitle] = React.useState("");
  const [category, setCategory] = React.useState("Hackathon");
  const [summary, setSummary] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [venue, setVenue] = React.useState("Department Auditorium");
  const [academicYear, setAcademicYear] = React.useState("2024-25");
  const [eventDate, setEventDate] = React.useState(new Date().toISOString().split("T")[0]);
  const [coverUrl, setCoverUrl] = React.useState("");
  const [isFeatured, setIsFeatured] = React.useState(false);

  const [notification, setNotification] = React.useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    setNotification(null);

    const payload = {
      title,
      category,
      summary,
      description,
      venue,
      academic_year: academicYear,
      event_date: eventDate,
      cover_image_url: coverUrl || "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
      is_featured: isFeatured,
      is_published: true,
    };

    const validation = eventSchema.safeParse(payload);
    if (!validation.success) {
      setNotification({
        type: "error",
        message: validation.error.issues[0]?.message || "Validation failed",
      });
      return;
    }

    const newEvent: EventItem = {
      id: `evt-${Date.now()}`,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      ...payload,
    };

    setEvents([newEvent, ...events]);
    setNotification({
      type: "success",
      message: `Event "${title}" published successfully!`,
    });

    setTitle("");
    setSummary("");
    setDescription("");
    setCoverUrl("");
  };

  const togglePublished = (id: string) => {
    setEvents(
      events.map((e) => (e.id === id ? { ...e, is_published: !e.is_published } : e))
    );
  };

  const toggleFeatured = (id: string) => {
    setEvents(
      events.map((e) => (e.id === id ? { ...e, is_featured: !e.is_featured } : e))
    );
  };

  const handleDelete = (id: string, eventTitle: string) => {
    if (confirm(`Delete event "${eventTitle}"?`)) {
      setEvents(events.filter((e) => e.id !== id));
      setNotification({
        type: "success",
        message: `Deleted event "${eventTitle}".`,
      });
    }
  };

  return (
    <div className="space-y-10">
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

      {/* Create Event Form */}
      <form
        onSubmit={handleCreateEvent}
        className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-6 shadow-sm"
      >
        <h3 className="text-lg font-bold font-display text-foreground">
          Publish Department Event Record
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground">Event Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. InnovateX 24h Hackathon 2025"
              required
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground">Category *</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Hackathon, Symposium, Workshop"
              required
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground">Venue *</label>
            <input
              type="text"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              placeholder="Auditorium / Lab 3"
              required
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground">Academic Year *</label>
            <input
              type="text"
              value={academicYear}
              onChange={(e) => setAcademicYear(e.target.value)}
              placeholder="2024-25"
              required
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            />
          </div>

          <div className="sm:col-span-2 space-y-1.5">
            <label className="text-xs font-medium text-foreground">Cover Image URL *</label>
            <input
              type="url"
              value={coverUrl}
              onChange={(e) => setCoverUrl(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              required
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            />
          </div>

          <div className="sm:col-span-2 space-y-1.5">
            <label className="text-xs font-medium text-foreground">Short Summary *</label>
            <input
              type="text"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="1–2 sentence overview for card display"
              required
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            />
          </div>

          <div className="sm:col-span-2 space-y-1.5">
            <label className="text-xs font-medium text-foreground">Full Event Narrative *</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Comprehensive writeup of keynote speakers, tracks, and competitions"
              required
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="isFeatured"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
            />
            <label htmlFor="isFeatured" className="text-xs text-foreground font-medium">
              Feature on Home Page Spotlight
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <Plus className="h-4 w-4" />
          <span>Publish Event</span>
        </button>
      </form>

      {/* Events Table */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
        <h3 className="text-lg font-bold font-display text-foreground">
          Existing IT Events ({events.length})
        </h3>

        <div className="divide-y divide-border">
          {events.map((evt) => (
            <div key={evt.id} className="py-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative h-12 w-20 shrink-0 overflow-hidden rounded-md bg-muted border border-border">
                  <Image src={evt.cover_image_url} alt={evt.title} fill className="object-cover" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-semibold text-foreground truncate">{evt.title}</h4>
                  <p className="text-xs text-muted-foreground">
                    {evt.category} • {evt.venue} • AY {evt.academic_year}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => toggleFeatured(evt.id)}
                  className={`p-1.5 rounded-md transition-colors ${
                    evt.is_featured
                      ? "bg-primary/20 text-primary border border-primary/30"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  title={evt.is_featured ? "Remove featured" : "Set featured"}
                >
                  <Star className="h-4 w-4" />
                </button>

                <button
                  onClick={() => togglePublished(evt.id)}
                  className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-semibold ${
                    evt.is_published
                      ? "bg-primary/10 text-primary border border-primary/20"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {evt.is_published ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                  <span className="hidden sm:inline">{evt.is_published ? "Published" : "Draft"}</span>
                </button>

                <button
                  onClick={() => handleDelete(evt.id, evt.title)}
                  className="p-1.5 text-muted-foreground hover:text-destructive transition-colors"
                  aria-label={`Delete ${evt.title}`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
