"use client";

import { useState } from "react";
import { useAdmin } from "@/lib/admin/adminStore";
import AdminCard from "@/components/admin/ui/AdminCard";
import AdminBadge from "@/components/admin/ui/AdminBadge";
import AdminButton from "@/components/admin/ui/AdminButton";
import AdminModal from "@/components/admin/ui/AdminModal";
import {
  Sparkles,
  Plus,
  Copy,
  Calendar,
  Percent,
  IndianRupee,
  Check,
  Tag,
  Zap,
} from "lucide-react";

export default function AdminOffersPage() {
  const {
    offers,
    selectedOutlet,
    toggleOfferStatus,
    addOffer,
    addToast,
  } = useAdmin();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    code: "",
    title: "",
    description: "",
    discountType: "percentage",
    value: 20,
    minOrder: 299,
    maxDiscount: 100,
    validUntil: "2026-11-30",
    outlet: "ALL",
  });

  const filteredOffers = offers.filter(
    (o) => selectedOutlet === "ALL" || o.outlet === "ALL" || o.outlet === selectedOutlet
  );

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    addToast(`Coupon code ${code} copied to clipboard!`, "success");
  };

  const handleCreateOffer = (e) => {
    e.preventDefault();
    if (!formData.code || !formData.title) return;

    addOffer({
      ...formData,
      code: formData.code.toUpperCase().trim(),
      value: Number(formData.value),
      minOrder: Number(formData.minOrder),
      maxDiscount: Number(formData.maxDiscount),
    });

    setIsAddModalOpen(false);
    setFormData({
      code: "",
      title: "",
      description: "",
      discountType: "percentage",
      value: 20,
      minOrder: 299,
      maxDiscount: 100,
      validUntil: "2026-11-30",
      outlet: "ALL",
    });
  };

  return (
    <div className="space-y-6">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-google-sans font-bold tracking-tight text-cream">
            Offers, Coupons & Loyalty Campaigns
          </h1>
          <p className="text-xs sm:text-sm text-[#A89F91] mt-0.5">
            Configure automated cart discounts, festive promotions, and branch-specific vouchers.
          </p>
        </div>

        <AdminButton
          variant="primary"
          size="sm"
          icon={Plus}
          onClick={() => setIsAddModalOpen(true)}
        >
          Create New Voucher
        </AdminButton>
      </div>

      {/* Offer Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filteredOffers.map((ofr) => (
          <AdminCard
            key={ofr.id}
            className={`transition-all flex flex-col justify-between ${
              !ofr.isActive ? "opacity-60 bg-[#141210]" : "hover:border-[#3E342A]"
            }`}
          >
            <div className="space-y-3">
              {/* Header code */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-base font-bold text-cream bg-[#1E1914] border border-[#3C3227] px-3 py-1 rounded-xl">
                    {ofr.code}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopyCode(ofr.code)}
                    className="p-1.5 rounded-lg text-[#8E867B] hover:text-cream hover:bg-white/5 cursor-pointer"
                    title="Copy Code"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>

                <AdminBadge variant={ofr.isActive ? "gold" : "default"} size="sm">
                  {ofr.isActive ? "ACTIVE" : "PAUSED"}
                </AdminBadge>
              </div>

              <div>
                <h3 className="font-semibold text-sm text-cream">
                  {ofr.title}
                </h3>
                <p className="text-xs text-[#A89F91] mt-1 leading-relaxed">
                  {ofr.description}
                </p>
              </div>

              {/* Stats & Discount Details */}
              <div className="p-3 rounded-xl bg-[#141210] border border-[#25201B] grid grid-cols-3 gap-2 text-center text-xs">
                <div>
                  <span className="text-[10px] text-[#7E7568] uppercase font-bold">
                    Benefit
                  </span>
                  <p className="font-mono font-bold text-[#E6BC65] mt-0.5">
                    {ofr.discountType === "percentage" ? `${ofr.value}% OFF` : `₹${ofr.value} FLAT`}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] text-[#7E7568] uppercase font-bold">
                    Min Order
                  </span>
                  <p className="font-mono text-cream mt-0.5">
                    ₹{ofr.minOrder}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] text-[#7E7568] uppercase font-bold">
                    Redeemed
                  </span>
                  <p className="font-mono text-emerald-400 mt-0.5">
                    {ofr.usageCount} times
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#7E7568] pt-1">
                <span>Valid until: {ofr.validUntil}</span>
                <span>Branch: {ofr.outlet}</span>
              </div>
            </div>

            {/* Toggle Status Footer */}
            <div className="mt-4 pt-3 border-t border-[#25201B] flex items-center justify-between">
              <button
                type="button"
                onClick={() => toggleOfferStatus(ofr.id)}
                className={`text-xs font-semibold cursor-pointer ${
                  ofr.isActive
                    ? "text-rose-400 hover:underline"
                    : "text-emerald-400 hover:underline"
                }`}
              >
                {ofr.isActive ? "Pause Campaign" : "Resume Campaign"}
              </button>

              <span className="text-[10px] text-[#8E867B] font-mono">
                Max cap: ₹{ofr.maxDiscount}
              </span>
            </div>
          </AdminCard>
        ))}
      </div>

      {/* Create Offer Modal */}
      <AdminModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Create New Promotional Voucher"
        subtitle="Set discount rules, minimum order caps and validity"
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
              onClick={handleCreateOffer}
            >
              Launch Offer
            </AdminButton>
          </div>
        }
      >
        <form onSubmit={handleCreateOffer} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-cream">
                Coupon Code *
              </label>
              <input
                type="text"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                placeholder="e.g. DIWALI50"
                required
                className="w-full mt-1.5 bg-[#1C1814] border border-[#2E2721] rounded-xl px-3 py-2 text-xs font-mono uppercase text-cream placeholder:text-[#7E7568] focus:border-gold focus:outline-hidden"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-cream">
                Campaign Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Festival Season Pure Ghee Special"
                required
                className="w-full mt-1.5 bg-[#1C1814] border border-[#2E2721] rounded-xl px-3 py-2 text-xs text-cream placeholder:text-[#7E7568] focus:border-gold focus:outline-hidden"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-semibold text-cream">
                Discount Type
              </label>
              <select
                value={formData.discountType}
                onChange={(e) => setFormData({ ...formData, discountType: e.target.value })}
                className="w-full mt-1.5 bg-[#1C1814] border border-[#2E2721] rounded-xl px-3 py-2 text-xs text-cream focus:outline-hidden"
              >
                <option value="percentage">Percentage (%) Off</option>
                <option value="flat">Flat Cash (₹) Off</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-cream">
                Value ({formData.discountType === "percentage" ? "%" : "₹"}) *
              </label>
              <input
                type="number"
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: Number(e.target.value) })}
                required
                className="w-full mt-1.5 bg-[#1C1814] border border-[#2E2721] rounded-xl px-3 py-2 text-xs text-cream font-mono focus:border-gold focus:outline-hidden"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-cream">
                Min Order (₹)
              </label>
              <input
                type="number"
                value={formData.minOrder}
                onChange={(e) => setFormData({ ...formData, minOrder: Number(e.target.value) })}
                className="w-full mt-1.5 bg-[#1C1814] border border-[#2E2721] rounded-xl px-3 py-2 text-xs text-cream font-mono focus:border-gold focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-cream">
              Short Description / Fine Print
            </label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="e.g. Valid on all dosas and thatte idlis above ₹299 order."
              className="w-full mt-1.5 bg-[#1C1814] border border-[#2E2721] rounded-xl px-3 py-2 text-xs text-cream placeholder:text-[#7E7568] focus:border-gold focus:outline-hidden"
            />
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
