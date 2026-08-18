import dynamic from "next/dynamic";

// Client components - lazy loaded for performance
const LenisProvider = dynamic(
  () => import("@/components/shared/LenisProvider"),
  { ssr: false }
);
const Navbar = dynamic(() => import("@/components/sections/Navbar"), {
  ssr: false,
});
const Hero = dynamic(() => import("@/components/sections/Hero"), {
  ssr: false,
});
const BrandStory = dynamic(
  () => import("@/components/sections/BrandStory"),
  { ssr: false }
);
const Philosophy = dynamic(
  () => import("@/components/sections/Philosophy"),
  { ssr: false }
);
const MenuShowcase = dynamic(
  () => import("@/components/sections/MenuShowcase"),
  { ssr: false }
);
const Awards = dynamic(() => import("@/components/sections/Awards"), {
  ssr: false,
});
const Press = dynamic(() => import("@/components/sections/Press"), {
  ssr: false,
});
const Timeline = dynamic(
  () => import("@/components/sections/Timeline"),
  { ssr: false }
);
const Locations = dynamic(
  () => import("@/components/sections/Locations"),
  { ssr: false }
);
const Testimonials = dynamic(
  () => import("@/components/sections/Testimonials"),
  { ssr: false }
);
const Footer = dynamic(() => import("@/components/sections/Footer"), {
  ssr: false,
});

export default function Home() {
  return (
    <LenisProvider>
      <Navbar />
      <main>
        <Hero />
        <BrandStory />
        <Philosophy />
        <MenuShowcase />
        <Awards />
        <Press />
        <Timeline />
        <Locations />
        <Testimonials />
      </main>
      <Footer />
    </LenisProvider>
  );
}
