import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://campuschronicle.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "CampusChronicle | IT Department Memory Showcase",
    template: "%s | CampusChronicle",
  },
  description:
    "Every Event. Every Experience. Every Memory: Preserved Forever. A centralized digital showcase and media archive for the Information Technology department.",
  keywords: [
    "Information Technology",
    "Campus Chronicle",
    "College IT Department",
    "Hackathons",
    "Industrial Visits",
    "Technical Symposium",
    "Student Achievements",
    "Media Archive",
  ],
  authors: [{ name: "Department of Information Technology" }],
  creator: "IT Department",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "CampusChronicle",
    title: "CampusChronicle | IT Department Memory Showcase",
    description:
      "Every Event. Every Experience. Every Memory: Preserved Forever. Centralized digital showcase and media archive.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CampusChronicle - IT Department Memory Showcase",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CampusChronicle | IT Department Memory Showcase",
    description:
      "Every Event. Every Experience. Every Memory: Preserved Forever. Centralized digital showcase and media archive.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Department of Information Technology",
  alternateName: "CampusChronicle",
  url: siteUrl,
  description:
    "Digital memory, event showcase, and media archiving platform for the Information Technology Department.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
