import { Playfair_Display, Inter } from "next/font/google";
import AppLayout from "@/components/shared/AppLayout";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const viewport = {
  themeColor: "#1a1714",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata = {
  metadataBase: new URL("https://chaatandchill.cafe"),
  title: {
    default: "Chaat & Chill Café — Sip. Snack. Smile.",
    template: "%s | Chaat & Chill Café",
  },
  description:
    "Where India's vibrant street food culture meets modern café vibes. Every bite tells a story, every sip sparks a smile. Artisanal chaats, dosas, and masala chai.",
  keywords: [
    "chaat",
    "Indian street food",
    "café",
    "masala chai",
    "pani puri",
    "samosa",
    "dosa",
    "Jamakhandi café",
    "Rabakavi café",
    "Chaat and Chill",
    "The Shreeshailam Cafe",
    "artisanal street food",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Chaat & Chill Café — Sip. Snack. Smile.",
    description:
      "Where India's vibrant street food culture meets modern café vibes. Artisanal chaats, dosas, and masala chai in Jamakhandi & Rabakavi.",
    url: "https://chaatandchill.cafe",
    siteName: "Chaat & Chill Café",
    images: [
      {
        url: "/images/hero-luxury.jpg",
        width: 1200,
        height: 630,
        alt: "Chaat & Chill Café — Artisanal Chai and Modern Gourmet Chaat",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chaat & Chill Café — Sip. Snack. Smile.",
    description:
      "Where India's vibrant street food culture meets modern café vibes in Jamakhandi & Rabakavi.",
    images: ["/images/hero-luxury.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Chaat & Chill Café",
  image: "https://chaatandchill.cafe/images/hero-luxury.jpg",
  description:
    "Where India's vibrant street food culture meets modern café vibes. Outlets in Jamakhandi and Rabakavi (The Shreeshailam Cafe).",
  url: "https://chaatandchill.cafe",
  servesCuisine: ["Indian", "Street Food", "Chaat", "Vegetarian", "South Indian"],
  priceRange: "₹₹",
  hasMenu: "https://chaatandchill.cafe/menu",
  department: [
    {
      "@type": "Restaurant",
      name: "Chaat and Chill, Jamakhandi",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Near KSRTC Bus Stand",
        addressLocality: "Jamakhandi",
        addressRegion: "Karnataka",
        postalCode: "587301",
        addressCountry: "IN",
      },
      telephone: "+91 8353 220123",
    },
    {
      "@type": "Restaurant",
      name: "The Shreeshailam Cafe, Rabakavi",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Main Road, Rabakavi Banhatti",
        addressLocality: "Rabakavi",
        addressRegion: "Karnataka",
        postalCode: "587311",
        addressCountry: "IN",
      },
      telephone: "+91 8351 230456",
    },
  ],
  sameAs: [
    "https://instagram.com/chaatandchill",
    "https://twitter.com/chaatandchill",
    "https://facebook.com/chaatandchill",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <AppLayout>{children}</AppLayout>
        {/* Grain overlay for premium print-like feel */}
        <div className="grain-overlay" aria-hidden="true" />
      </body>
    </html>
  );
}
