import { Playfair_Display, Inter } from "next/font/google";
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

export const metadata = {
  title: "Chaat & Chill Café — Sip. Snack. Smile.",
  description:
    "Where India's vibrant street food culture meets modern café vibes. Every bite tells a story, every sip sparks a smile. Visit us in Bangalore, Mumbai, Delhi & Hyderabad.",
  keywords: [
    "chaat",
    "Indian street food",
    "café",
    "masala chai",
    "pani puri",
    "samosa",
    "Bangalore café",
    "Mumbai café",
  ],
  openGraph: {
    title: "Chaat & Chill Café — Sip. Snack. Smile.",
    description:
      "Where India's vibrant street food culture meets modern café vibes.",
    url: "https://chaatandchill.cafe",
    siteName: "Chaat & Chill Café",
    images: [
      {
        url: "/images/hero-chai.jpg",
        width: 1200,
        height: 630,
        alt: "Chaat & Chill Café — Masala Chai and Samosas",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chaat & Chill Café — Sip. Snack. Smile.",
    description:
      "Where India's vibrant street food culture meets modern café vibes.",
    images: ["/images/hero-chai.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable}`}
    >
      <body className="antialiased">
        {children}
        {/* Grain overlay for premium print-like feel */}
        <div className="grain-overlay" aria-hidden="true" />
      </body>
    </html>
  );
}
