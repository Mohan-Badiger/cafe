"use client";

import { useState } from "react";
import { useAdmin } from "@/lib/admin/adminStore";
import AdminCard from "@/components/admin/ui/AdminCard";
import AdminBadge from "@/components/admin/ui/AdminBadge";
import AdminButton from "@/components/admin/ui/AdminButton";
import AdminDrawer from "@/components/admin/ui/AdminDrawer";
import AdminModal from "@/components/admin/ui/AdminModal";
import {
  Users,
  Search,
  Phone,
  Mail,
  Coins,
  Award,
  Calendar,
  MessageSquare,
  Sparkles,
  ShoppingBag,
  Send,
} from "lucide-react";

export default function AdminCustomersPage() {
  const { customers, orders, addToast } = useAdmin();

  const [searchTerm, setSearchTerm] = useState("");
  const [tierFilter, setTierFilter] = useState("all");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isPromoModalOpen, setIsPromoModalOpen] = useState(false);
  const [promoMessage, setPromoMessage] = useState(
    "Namaskara! We miss seeing you at Chaat & Chill. Enjoy a complimentary Degree Filter Coffee on your next visit with code FILTERGOLD!"
  );

  const filteredCustomers = customers.filter((c) => {
    const matchesTier = tierFilter === "all" || c.tier.toLowerCase().includes(tierFilter.toLowerCase());
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTier && matchesSearch;
  });

  const handleSendPromo = (e) => {
    e.preventDefault();
    if (!selectedCustomer) return;
    addToast(`SMS Promo dispatched to ${selectedCustomer.name} (${selectedCustomer.phone})!`, "success");
    setIsPromoModalOpen(false);
  };

  // Find customer's orders
  const customerOrders = selectedCustomer
    ? orders.filter((o) => o.customer?.phone === selectedCustomer.phone)
    : [];

  return (
    <div className="space-y-6">
      {/* Title & Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-google-sans font-bold tracking-tight text-cream">
            Customer CRM & Patron Loyalty
          </h1>
          <p className="text-xs sm:text-sm text-[#A89F91] mt-0.5">
            Track frequent diners, Chaat Club loyalty coins, spending history, and favorite dishes.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <AdminCard noPadding className="p-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="relative flex-1 max-w-sm w-full">
            <Search className="w-3.5 h-3.5 text-[#7E7568] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by patron name, phone, or email..."
              className="w-full bg-espresso border border-[#2E2721] rounded-xl pl-9 pr-3 py-2 text-xs text-cream placeholder:text-[#7E7568] focus:border-gold focus:outline-hidden"
            />
          </div>

          <select
            value={tierFilter}
            onChange={(e) => setTierFilter(e.target.value)}
            className="bg-espresso border border-[#2E2721] rounded-xl px-3 py-2 text-xs text-cream focus:outline-hidden"
          >
            <option value="all">All Loyalty Tiers</option>
            <option value="vip">VIP Patrons Only</option>
            <option value="platinum">Platinum Members</option>
            <option value="gold">Gold Members</option>
            <option value="silver">Silver Members</option>
          </select>
        </div>
      </AdminCard>

      {/* Customer Directory Table */}
      <AdminCard noPadding>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#181512] text-[#8E867B] uppercase font-bold text-[10px] tracking-wider border-b border-[#25201B]">
              <tr>
                <th className="py-3 px-4">Patron Details</th>
                <th className="py-3 px-4">Loyalty Tier</th>
                <th className="py-3 px-4">Chaat Coins</th>
                <th className="py-3 px-4">Total Visits</th>
                <th className="py-3 px-4">Lifetime Spend</th>
                <th className="py-3 px-4">Favorite Dish</th>
                <th className="py-3 px-4">Last Visit</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#231E19]">
              {filteredCustomers.map((c) => (
                <tr
                  key={c.id}
                  className="hover:bg-espresso transition-colors"
                >
                  <td className="py-3.5 px-4">
                    <p className="font-semibold text-cream text-sm">
                      {c.name}
                    </p>
                    <p className="text-[11px] text-[#A89F91]">
                      {c.phone} • {c.city}
                    </p>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        c.tier.includes("VIP")
                          ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
                          : c.tier.includes("Platinum")
                          ? "bg-purple-500/20 text-purple-300 border-purple-500/30"
                          : "bg-gold/15 text-[#E6BC65] border-gold/30"
                      }`}
                    >
                      {c.tier}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-emerald-400">
                    <span className="inline-flex items-center gap-1.5">
                      <Coins className="w-3.5 h-3.5 text-gold shrink-0" />
                      <span>{c.loyaltyCoins}</span>
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-cream">
                    {c.totalVisits} visits
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-sm text-[#E6BC65]">
                    ₹{c.totalSpent.toLocaleString("en-IN")}
                  </td>
                  <td className="py-3.5 px-4 text-[#D8CEBF] max-w-xs truncate">
                    {c.favoriteDish}
                  </td>
                  <td className="py-3.5 px-4 text-[#8E867B]">
                    {c.lastVisit}
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-2">
                    <button
                      type="button"
                      onClick={() => setSelectedCustomer(c)}
                      className="text-xs text-gold hover:underline cursor-pointer font-medium"
                    >
                      Profile
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCustomer(c);
                        setIsPromoModalOpen(true);
                      }}
                      className="text-xs text-emerald-400 hover:underline cursor-pointer"
                    >
                      Send Promo
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminCard>

      {/* Customer Profile Drawer */}
      <AdminDrawer
        isOpen={Boolean(selectedCustomer) && !isPromoModalOpen}
        onClose={() => setSelectedCustomer(null)}
        title="Patron Profile & Dining Insights"
        subtitle={selectedCustomer ? `${selectedCustomer.name} • ${selectedCustomer.phone}` : ""}
      >
        {selectedCustomer && (
          <div className="space-y-6">
            {/* Header info */}
            <div className="p-4 rounded-xl bg-espresso border border-[#2A241F] space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base text-cream">
                    {selectedCustomer.name}
                  </h3>
                  <p className="text-xs text-[#8E867B]">{selectedCustomer.email}</p>
                </div>
                <span className="text-xs font-bold text-gold bg-gold/15 px-2.5 py-1 rounded-full border border-gold/30">
                  {selectedCustomer.tier}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#26201B] text-center text-xs">
                <div>
                  <span className="text-[10px] text-[#7E7568] uppercase font-bold">Coins</span>
                  <p className="font-mono font-bold text-emerald-400 mt-0.5">
                    {selectedCustomer.loyaltyCoins}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] text-[#7E7568] uppercase font-bold">Visits</span>
                  <p className="font-mono text-cream mt-0.5">
                    {selectedCustomer.totalVisits}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] text-[#7E7568] uppercase font-bold">Total Spent</span>
                  <p className="font-mono font-bold text-[#E6BC65] mt-0.5">
                    ₹{selectedCustomer.totalSpent}
                  </p>
                </div>
              </div>
            </div>

            {/* Favorite tags */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-cream block">
                Patron Preferences & Traits
              </label>
              <div className="flex flex-wrap gap-1.5">
                {selectedCustomer.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] bg-[#221D18] border border-[#342C23] text-[#D8CEBF] px-2.5 py-1 rounded-lg"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Favorite dish */}
            <div className="p-3 bg-[#141210] border border-[#25201B] rounded-xl text-xs space-y-1">
              <span className="text-[10px] text-[#7E7568] uppercase font-bold">
                Most Frequently Ordered
              </span>
              <p className="font-semibold text-cream">
                ★ {selectedCustomer.favoriteDish}
              </p>
            </div>

            <AdminButton
              variant="primary"
              size="sm"
              className="w-full"
              icon={Send}
              onClick={() => setIsPromoModalOpen(true)}
            >
              Send Personalized SMS Offer
            </AdminButton>
          </div>
        )}
      </AdminDrawer>

      {/* Send Personalized SMS Offer Modal */}
      <AdminModal
        isOpen={isPromoModalOpen}
        onClose={() => setIsPromoModalOpen(false)}
        title="Dispatch Personalized Promo to Patron"
        subtitle={`Sending to: ${selectedCustomer?.name} (${selectedCustomer?.phone})`}
        footer={
          <div className="flex justify-end gap-2.5">
            <AdminButton
              variant="dark"
              size="sm"
              onClick={() => setIsPromoModalOpen(false)}
            >
              Cancel
            </AdminButton>
            <AdminButton
              variant="primary"
              size="sm"
              icon={Send}
              onClick={handleSendPromo}
            >
              Send SMS Dispatches
            </AdminButton>
          </div>
        }
      >
        <form onSubmit={handleSendPromo} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-cream">
              SMS / WhatsApp Message Body
            </label>
            <textarea
              rows={4}
              value={promoMessage}
              onChange={(e) => setPromoMessage(e.target.value)}
              className="w-full mt-1.5 bg-[#1C1814] border border-[#2E2721] rounded-xl p-3 text-xs text-cream placeholder:text-[#7E7568] focus:border-gold focus:outline-hidden"
            />
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
