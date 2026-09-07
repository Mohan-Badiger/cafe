"use client";

import { BookingProvider } from "@/lib/BookingContext";
import LenisProvider from "@/components/shared/LenisProvider";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import ReservationModal from "@/components/shared/ReservationModal";

export default function AppLayout({ children }) {
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
