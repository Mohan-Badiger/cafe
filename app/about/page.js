import AboutView from "@/components/sections/about/AboutView";

export const metadata = {
  title: "About Us — The Rameshwaram Cafe | South Indian Soul, Modern Bite",
  description:
    "Discover the story of The Rameshwaram Cafe. Inspired by Dr. A.P.J. Abdul Kalam, serving authentic South Indian cuisine made with pure Nandini cow ghee, zero chillers, and timeless prasadam philosophy.",
  openGraph: {
    title: "About Us — The Rameshwaram Cafe | South Indian Soul, Modern Bite",
    description:
      "Our Cafe is our Temple, Our Customers are Gods, & What we serve, is Prasadam. Meet our founders and explore our culinary journey.",
    images: ["/images/outlet-ambiance.jpg"],
  },
};

export default function AboutPage() {
  return <AboutView />;
}
