"use client";

import { useState } from "react";
import { useAdmin } from "@/lib/admin/adminStore";
import AdminCard from "@/components/admin/ui/AdminCard";
import AdminBadge from "@/components/admin/ui/AdminBadge";
import AdminButton from "@/components/admin/ui/AdminButton";
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Trash2,
  Check,
  ShoppingBag,
  Package,
  CalendarCheck,
  CreditCard,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

export default function AdminNotificationsPage() {
  const {
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    clearNotifications,
  } = useAdmin();

  const [typeFilter, setTypeFilter] = useState("all");

  const filteredNotifs = notifications.filter(
    (n) => typeFilter === "all" || n.type === typeFilter
  );

  const icons = {
    order: <ShoppingBag className="w-4 h-4 text-[#D4A853]" />,
    inventory: <Package className="w-4 h-4 text-rose-400" />,
    reservation: <CalendarCheck className="w-4 h-4 text-sky-400" />,
    payment: <CreditCard className="w-4 h-4 text-emerald-400" />,
  };

  return (
    <div className="space-y-6">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-google-sans font-bold tracking-tight text-[#FAF5EF]">
            Notifications & System Audit Trail
          </h1>
          <p className="text-xs sm:text-sm text-[#A89F91] mt-0.5">
            Real-time operational alerts: KDS order fires, low inventory warnings, and payment credits.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <AdminButton
            variant="secondary"
            size="sm"
            icon={Check}
            onClick={markAllNotificationsRead}
            disabled={notifications.length === 0}
          >
            Mark All Read
          </AdminButton>

          <AdminButton
            variant="danger"
            size="sm"
            icon={Trash2}
            onClick={clearNotifications}
            disabled={notifications.length === 0}
          >
            Clear All
          </AdminButton>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 menu-scroll text-xs">
        {["all", "order", "inventory", "reservation", "payment"].map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setTypeFilter(type)}
            className={`px-3.5 py-1.5 rounded-xl capitalize font-medium transition-colors cursor-pointer ${
              typeFilter === type
                ? "bg-[#D4A853] text-[#141210] font-bold"
                : "bg-[#181512] border border-[#2A241F] text-[#A89F91] hover:text-[#FAF5EF]"
            }`}
          >
            {type === "all" ? `All Alerts (${notifications.length})` : `${type}s`}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifs.length === 0 ? (
          <AdminCard>
            <div className="py-12 text-center text-xs text-[#7E7568] space-y-2">
              <ShieldCheck className="w-8 h-8 mx-auto opacity-30 text-emerald-400" />
              <p>Everything is running smoothly. No active alerts.</p>
            </div>
          </AdminCard>
        ) : (
          filteredNotifs.map((n) => (
            <div
              key={n.id}
              onClick={() => markNotificationRead(n.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                !n.read
                  ? "bg-[#1C1814] border-[#D4A853]/40 shadow-md"
                  : "bg-[#141210] border-[#25201B] hover:bg-[#181512]"
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#25201B] flex items-center justify-center shrink-0 border border-[#362D24]">
                  {icons[n.type] || <Bell className="w-4 h-4 text-[#D4A853]" />}
                </div>

                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <h3 className={`text-sm font-semibold ${!n.read ? "text-[#FAF5EF]" : "text-[#D8CEBF]"}`}>
                      {n.title}
                    </h3>
                    <AdminBadge
                      variant={
                        n.priority === "urgent"
                          ? "danger"
                          : n.priority === "success"
                          ? "success"
                          : "default"
                      }
                      size="sm"
                    >
                      {n.priority}
                    </AdminBadge>
                  </div>
                  <p className="text-xs text-[#A89F91] leading-relaxed">
                    {n.message}
                  </p>
                </div>
              </div>

              <span className="text-[11px] text-[#7E7568] whitespace-nowrap">
                {n.time}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
