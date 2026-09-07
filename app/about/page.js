import AboutView from "@/components/sections/about/AboutView";

export const metadata = {
  title: "About Us",
  description:
    "Discover the story of Chaat & Chill Café. Where India's vibrant street food soul meets modern café vibes — crafted with love, zero compromise, and authentic recipes.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Us — Chaat & Chill Café | Soulful Street Food, Modern Vibe",
    description:
      "Crafted with love, served with a smile, and spiced with memories of bustling bazaars. Meet our founders and explore our culinary journey.",
    url: "https://chaatandchill.cafe/about",
    images: ["/images/brand-story.jpg"],
  },
};

export default function AboutPage() {
  return <AboutView />;
}
