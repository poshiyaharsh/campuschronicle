"use client";

import * as React from "react";
import Image from "next/image";
import { FolderPlus, Trash2, Eye, EyeOff, Plus, CheckCircle2, AlertCircle } from "lucide-react";
import { SAMPLE_ALBUMS, Album } from "@/lib/data/mock-data";
import { albumSchema } from "@/lib/validations/admin";

export default function AdminAlbumsPage() {
  const [albums, setAlbums] = React.useState<Album[]>(SAMPLE_ALBUMS);

  const [title, setTitle] = React.useState("");
  const [category, setCategory] = React.useState("classroom");
  const [description, setDescription] = React.useState("");
  const [academicYear, setAcademicYear] = React.useState("2024-25");
  const [coverUrl, setCoverUrl] = React.useState("");
  const [eventDate, setEventDate] = React.useState(new Date().toISOString().split("T")[0]);

  const [notification, setNotification] = React.useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleCreateAlbum = (e: React.FormEvent) => {
    e.preventDefault();
    setNotification(null);

    const payload = {
      title,
      category_slug: category,
      description,
      academic_year: academicYear,
      cover_image_url: coverUrl || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
      event_date: eventDate,
      is_published: true,
    };

    const validation = albumSchema.safeParse(payload);
    if (!validation.success) {
      setNotification({
        type: "error",
        message: validation.error.issues[0]?.message || "Validation failed",
      });
      return;
    }

    const newAlbum: Album = {
      id: `alb-${Date.now()}`,
      category_id: category === "classroom" ? "cat-1" : "cat-2",
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      photo_count: 0,
      ...payload,
    };

    setAlbums([newAlbum, ...albums]);
    setNotification({
      type: "success",
      message: `Album "${title}" created successfully!`,
    });

    setTitle("");
    setDescription("");
    setCoverUrl("");
  };

  const togglePublished = (id: string) => {
    setAlbums(
      albums.map((a) => (a.id === id ? { ...a, is_published: !a.is_published } : a))
    );
  };

  const handleDelete = (id: string, albumTitle: string) => {
    if (confirm(`Delete album "${albumTitle}"?`)) {
      setAlbums(albums.filter((a) => a.id !== id));
      setNotification({
        type: "success",
        message: `Deleted album "${albumTitle}".`,
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

      {/* Form */}
      <form
        onSubmit={handleCreateAlbum}
        className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-6 shadow-sm"
      >
        <h3 className="text-lg font-bold font-display text-foreground">
          Create New Photo Album
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground">Album Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Distributed Systems Lab Practice"
              required
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground">Category *</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <option value="classroom">Classroom Activities</option>
              <option value="technical-visits">Technical & Industrial Visits</option>
            </select>
          </div>

          <div className="space-y-1.5">
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
            <label className="text-xs font-medium text-foreground">Description *</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief summary of activities conducted in this album"
              required
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            />
          </div>
        </div>

        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <Plus className="h-4 w-4" />
          <span>Save & Publish Album</span>
        </button>
      </form>

      {/* Album List */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
        <h3 className="text-lg font-bold font-display text-foreground">
          Existing Department Albums ({albums.length})
        </h3>

        <div className="divide-y divide-border">
          {albums.map((alb) => (
            <div key={alb.id} className="py-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative h-12 w-20 shrink-0 overflow-hidden rounded-md bg-muted border border-border">
                  <Image src={alb.cover_image_url} alt={alb.title} fill className="object-cover" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-semibold text-foreground truncate">{alb.title}</h4>
                  <p className="text-xs text-muted-foreground">
                    {alb.category_slug} • AY {alb.academic_year} • {alb.photo_count} photos
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => togglePublished(alb.id)}
                  className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-semibold ${
                    alb.is_published
                      ? "bg-primary/10 text-primary border border-primary/20"
                      : "bg-secondary text-muted-foreground"
                  }`}
                  title={alb.is_published ? "Unpublish" : "Publish"}
                >
                  {alb.is_published ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                  <span className="hidden sm:inline">{alb.is_published ? "Published" : "Draft"}</span>
                </button>

                <button
                  onClick={() => handleDelete(alb.id, alb.title)}
                  className="p-1.5 text-muted-foreground hover:text-destructive transition-colors"
                  aria-label={`Delete ${alb.title}`}
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
