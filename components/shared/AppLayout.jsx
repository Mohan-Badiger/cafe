"use client";

import { usePathname } from "next/navigation";
import { BookingProvider } from "@/lib/BookingContext";
import LenisProvider from "@/components/shared/LenisProvider";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import ReservationModal from "@/components/shared/ReservationModal";

export default function AppLayout({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return (
      <BookingProvider>
        <div className="admin-root min-h-screen bg-[#0E0C0A] text-[#EDE8E1] font-sans antialiased selection:bg-[#D4A853] selection:text-[#1a1714]">
          {children}
        </div>
      </BookingProvider>
    );
  }

  return (
    <BookingProvider>
      <LenisProvider>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <ReservationModal />
      </LenisProvider>
    </BookingProvider>
  );
}
