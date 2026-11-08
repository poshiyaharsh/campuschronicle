import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, CheckCircle2, MapPin, Share2 } from "lucide-react";
import { getEventBySlug, getEvents, getMediaByEventId } from "@/lib/data/api";

export async function generateStaticParams() {
  const events = await getEvents();
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const event = await getEventBySlug(params.slug);
  if (!event) return { title: "Event Not Found" };

  return {
    title: event.title,
    description: event.summary,
    openGraph: {
      title: `${event.title} | CampusChronicle`,
      description: event.summary,
      images: [
        {
          url: event.cover_image_url,
          width: 1200,
          height: 675,
          alt: event.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: event.title,
      description: event.summary,
      images: [event.cover_image_url],
    },
  };
}

export default async function EventDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const event = await getEventBySlug(params.slug);

  if (!event) {
    notFound();
  }

  const attachedMedia = await getMediaByEventId(event.id);

  const eventJsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.summary,
    startDate: event.event_date,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: event.venue,
      address: {
        "@type": "PostalAddress",
        addressLocality: "College Campus",
      },
    },
    image: [event.cover_image_url],
    organizer: {
      "@type": "Organization",
      name: "Department of Information Technology",
      url: "https://campuschronicle.vercel.app",
    },
  };

  return (
    <article className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />
      {/* Back button */}
      <div>
        <Link
          href="/events"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Events Archive</span>
        </Link>
      </div>

      {/* Header Info */}
      <div className="space-y-4 border-b border-border pb-8">
        <div className="flex flex-wrap items-center gap-2.5 text-xs">
          <span className="rounded-md bg-primary px-2.5 py-1 font-semibold text-primary-foreground">
            {event.category}
          </span>
          <span className="rounded-md bg-secondary px-2.5 py-1 font-medium text-foreground">
            AY {event.academic_year}
          </span>
          <span className="flex items-center gap-1 text-muted-foreground">
            <Calendar className="h-3.5 w-3.5 text-primary" />
            {new Date(event.event_date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <span className="flex items-center gap-1 text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 text-primary" />
            {event.venue}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground font-display">
          {event.title}
        </h1>

        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          {event.summary}
        </p>
      </div>

      {/* Cover Image */}
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border bg-muted shadow-lg">
        <Image
          src={event.cover_image_url}
          alt={event.title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 1024px"
          className="object-cover"
        />
      </div>

      {/* Narrative & Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-foreground font-display">
            Event Overview & Chronicle
          </h2>
          <div className="prose dark:prose-invert text-sm sm:text-base text-muted-foreground leading-relaxed space-y-4">
            <p>{event.description}</p>
            <p>
              Students demonstrated technical rigor, problem-solving speed, and effective collaboration.
              Department faculty mentors and industry experts actively guided rounds, fostering
              practical exposure and industry-standard best practices.
            </p>
          </div>
        </div>

        {/* Highlights Sidebar */}
        {event.highlights && event.highlights.length > 0 && (
          <div className="rounded-xl border border-border bg-card p-6 space-y-4 h-fit">
            <h3 className="text-sm font-bold uppercase tracking-wider text-primary font-display">
              Key Highlights
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-foreground">
              {event.highlights.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Attached Media Photo Reel */}
      {attachedMedia.length > 0 && (
        <section className="space-y-6 pt-6 border-t border-border">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-foreground font-display">
              Event Media Reel
            </h3>
            <p className="text-xs text-muted-foreground">
              Captured moments and snapshots from this event.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {attachedMedia.map((media) => (
              <div
                key={media.id}
                className="group relative aspect-video overflow-hidden rounded-lg border border-border bg-muted"
              >
                <Image
                  src={media.url}
                  alt={media.alt_text}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                  <p className="text-[11px] text-foreground font-medium line-clamp-1">
                    {media.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
