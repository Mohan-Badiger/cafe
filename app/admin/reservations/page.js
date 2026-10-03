"use client";

import { useState } from "react";
import { useAdmin } from "@/lib/admin/adminStore";
import AdminCard from "@/components/admin/ui/AdminCard";
import AdminBadge from "@/components/admin/ui/AdminBadge";
import AdminButton from "@/components/admin/ui/AdminButton";
import AdminModal from "@/components/admin/ui/AdminModal";
import {
  CalendarCheck,
  Plus,
  Search,
  Phone,
  Mail,
  Users,
  Clock,
  Calendar,
  CheckCircle2,
  XCircle,
  MessageCircle,
  AlertCircle,
  UserCheck,
} from "lucide-react";

export default function AdminReservationsPage() {
  const {
    reservations,
    selectedOutlet,
    updateReservationStatus,
    addReservation,
    addToast,
  } = useAdmin();

  const [dateFilter, setDateFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New reservation form state
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    outlet: selectedOutlet === "ALL" ? "Jamakhandi" : selectedOutlet,
    guests: 2,
    date: new Date().toISOString().split("T")[0],
    time: "7:30 PM",
    tableAssigned: "T-02",
    notes: "",
    source: "Front Desk Phone",
  });

  const todayStr = new Date().toISOString().split("T")[0];

  const filteredReservations = reservations.filter((res) => {
    const matchesOutlet = selectedOutlet === "ALL" || res.outlet === selectedOutlet;
    const matchesStatus = statusFilter === "all" || res.status === statusFilter;
    const matchesDate =
      dateFilter === "all"
        ? true
        : dateFilter === "today"
        ? res.date === todayStr
        : res.date > todayStr;
    const matchesSearch =
      res.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.phone.includes(searchTerm) ||
      res.bookingCode?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesOutlet && matchesStatus && matchesDate && matchesSearch;
  });

  const handleCreateReservation = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert("Name and phone are required.");
      return;
    }
    addReservation(formData);
    setIsAddModalOpen(false);
    setFormData({
      name: "",
      phone: "",
      email: "",
      outlet: selectedOutlet === "ALL" ? "Jamakhandi" : selectedOutlet,
      guests: 2,
      date: new Date().toISOString().split("T")[0],
      time: "7:30 PM",
      tableAssigned: "T-02",
      notes: "",
      source: "Front Desk Phone",
    });
  };

  const handleSendWhatsAppReminder = (res) => {
    addToast(
      `💬 WhatsApp confirmation dispatched to ${res.name} (${res.phone}) for ${res.time} booking!`,
      "success"
    );
  };

  const timeSlots = [
    "8:30 AM", "9:30 AM", "11:00 AM", "12:30 PM",
    "4:00 PM", "6:00 PM", "7:30 PM", "8:30 PM", "9:30 PM",
  ];

  return (
    <div className="space-y-6">
      {/* Title & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-google-sans font-bold tracking-tight text-cream">
            Table Reservations & Guest Concierge
          </h1>
          <p className="text-xs sm:text-sm text-[#A89F91] mt-0.5">
            Synchronized with public café booking requests, advance tables, and family gatherings.
          </p>
        </div>

        <AdminButton
          variant="primary"
          size="sm"
          icon={Plus}
          onClick={() => setIsAddModalOpen(true)}
        >
          Book Advance Table
        </AdminButton>
      </div>

      {/* Filter and Search Bar */}
      <AdminCard noPadding className="p-4">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 text-xs">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search className="w-3.5 h-3.5 text-[#7E7568] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by guest name, phone, or code (CC-xxxx)..."
              className="w-full bg-espresso border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-cream focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="bg-espresso border border-white/10 rounded-xl px-3 py-2 text-xs text-cream focus:outline-none"
            >
              <option value="all">All Dates</option>
              <option value="today">Today&apos;s Bookings</option>
              <option value="upcoming">Future Dates</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-espresso border border-white/10 rounded-xl px-3 py-2 text-xs text-cream focus:outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="confirmed">Confirmed</option>
              <option value="seated">Seated</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </AdminCard>

      {/* Reservations List */}
      <div className="space-y-4">
        {filteredReservations.length === 0 ? (
          <AdminCard>
            <div className="py-12 text-center text-xs text-[#7E7568] space-y-2">
              <CalendarCheck className="w-8 h-8 mx-auto opacity-30 text-gold" />
              <p>No reservations found matching your criteria.</p>
            </div>
          </AdminCard>
        ) : (
          filteredReservations.map((res) => (
            <AdminCard
              key={res.id}
              className="hover:border-[#3E342A] transition-all"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Guest info & slot */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gold/15 text-[#E6BC65] flex flex-col items-center justify-center font-bold shrink-0">
                    <span className="text-[10px] uppercase font-mono tracking-tighter">
                      {res.time.split(" ")[1]}
                    </span>
                    <span className="text-xs">
                      {res.time.split(" ")[0]}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h3 className="font-semibold text-base text-cream">
                        {res.name}
                      </h3>
                      <span className="font-mono text-xs font-bold text-gold bg-gold/10 px-2 py-0.5 rounded">
                        {res.bookingCode}
                      </span>
                      <AdminBadge
                        variant={
                          res.status === "seated"
                            ? "gold"
                            : res.status === "confirmed"
                            ? "success"
                            : "danger"
                        }
                        size="sm"
                      >
                        {res.status.toUpperCase()}
                      </AdminBadge>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-[#A89F91]">
                      <span className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-[#8E867B]" />
                        {res.guests} Guests
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#8E867B]" />
                        {res.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-[#8E867B]" />
                        {res.phone}
                      </span>
                      <span className="text-[11px] text-gold">
                        Outlet: {res.outlet}
                      </span>
                    </div>

                    {res.notes && (
                      <p className="text-xs text-amber-300/90 italic pt-1">
                        Special Request: &ldquo;{res.notes}&rdquo;
                      </p>
                    )}
                  </div>
                </div>

                {/* Right Actions */}
                <div className="flex flex-wrap items-center gap-2 pt-2 lg:pt-0 border-t lg:border-t-0 border-[#25201B]">
                  <button
                    type="button"
                    onClick={() => handleSendWhatsAppReminder(res)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-medium cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </button>

                  {res.status === "confirmed" && (
                    <AdminButton
                      variant="primary"
                      size="xs"
                      icon={UserCheck}
                      onClick={() => updateReservationStatus(res.id, "seated")}
                    >
                      Seat at Table
                    </AdminButton>
                  )}

                  {res.status === "seated" && (
                    <span className="text-xs text-emerald-400 font-semibold px-2.5 py-1 bg-emerald-500/10 rounded-lg">
                      ✓ Currently Dining
                    </span>
                  )}

                  {res.status !== "cancelled" && (
                    <button
                      type="button"
                      onClick={() => updateReservationStatus(res.id, "cancelled")}
                      className="px-2.5 py-1 text-xs text-rose-400 hover:bg-rose-500/10 rounded-lg cursor-pointer transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </AdminCard>
          ))
        )}
      </div>

      {/* Manual Booking Modal */}
      <AdminModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Reserve Table (Phone / Walk-in VIP)"
        subtitle="Direct front-desk reservation entry"
        footer={
          <div className="flex justify-end gap-2.5">
            <AdminButton
              variant="dark"
              size="sm"
              onClick={() => setIsAddModalOpen(false)}
            >
              Cancel
            </AdminButton>
            <AdminButton
              variant="primary"
              size="sm"
              onClick={handleCreateReservation}
            >
              Confirm Booking
            </AdminButton>
          </div>
        }
      >
        <form onSubmit={handleCreateReservation} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-cream">
                Guest Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Ramesh Kulkarni"
                required
                className="w-full mt-1.5 bg-[#1C1814] border border-white/10 rounded-xl px-3 py-2 text-xs text-cream focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-cream">
                Phone Number *
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98800 00000"
                required
                className="w-full mt-1.5 bg-[#1C1814] border border-white/10 rounded-xl px-3 py-2 text-xs text-cream focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-semibold text-cream">
                Outlet
              </label>
              <select
                value={formData.outlet}
                onChange={(e) => setFormData({ ...formData, outlet: e.target.value })}
                className="w-full mt-1.5 bg-[#1C1814] border border-white/10 rounded-xl px-3 py-2 text-xs text-cream focus:outline-none"
              >
                <option value="Jamakhandi">Jamakhandi</option>
                <option value="Rabakavi">Rabakavi</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-cream">
                Party Size (Pax)
              </label>
              <input
                type="number"
                min="1"
                max="25"
                value={formData.guests}
                onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                className="w-full mt-1.5 bg-[#1C1814] border border-white/10 rounded-xl px-3 py-2 text-xs text-cream font-mono focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-cream">
                Time Slot
              </label>
              <select
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full mt-1.5 bg-[#1C1814] border border-white/10 rounded-xl px-3 py-2 text-xs text-cream focus:outline-none"
              >
                {timeSlots.map((ts) => (
                  <option key={ts} value={ts}>
                    {ts}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-cream">
              Special Requests & Dining Preferences
            </label>
            <textarea
              rows={2}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="e.g. Birthday celebration, corner quiet booth, wheelchair access..."
              className="w-full mt-1.5 bg-[#1C1814] border border-white/10 rounded-xl p-3 text-xs text-cream focus:outline-none"
            />
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
