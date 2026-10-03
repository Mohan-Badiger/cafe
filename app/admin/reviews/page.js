"use client";

import { useState } from "react";
import { useAdmin } from "@/lib/admin/adminStore";
import AdminCard from "@/components/admin/ui/AdminCard";
import AdminBadge from "@/components/admin/ui/AdminBadge";
import AdminButton from "@/components/admin/ui/AdminButton";
import AdminModal from "@/components/admin/ui/AdminModal";
import {
  MessageSquare,
  Star,
  Sparkles,
  Check,
  Send,
  CornerDownRight,
  Filter,
  CheckCircle2,
} from "lucide-react";

export default function AdminReviewsPage() {
  const {
    reviews,
    selectedOutlet,
    replyToReview,
    addToast,
  } = useAdmin();

  const [ratingFilter, setRatingFilter] = useState("all");
  const [selectedReviewForReply, setSelectedReviewForReply] = useState(null);
  const [replyText, setReplyText] = useState("");

  const filteredReviews = reviews.filter((r) => {
    const matchesOutlet = selectedOutlet === "ALL" || r.outlet === selectedOutlet;
    const matchesRating = ratingFilter === "all" || r.rating.toString() === ratingFilter;
    return matchesOutlet && matchesRating;
  });

  const avgRating = (
    reviews.reduce((sum, r) => sum + r.rating, 0) / (reviews.length || 1)
  ).toFixed(1);

  const fiveStarCount = reviews.filter((r) => r.rating === 5).length;

  const handleOpenReplyModal = (rev) => {
    setSelectedReviewForReply(rev);
    setReplyText(
      rev.reply ||
        `Namaskara ${rev.customer}! Heartfelt gratitude for your warm feedback. Our café is our temple and crafting authentic pure ghee dishes is our sacred joy. See you again soon!`
    );
  };

  const handleSaveReply = (e) => {
    e.preventDefault();
    if (!selectedReviewForReply) return;
    replyToReview(selectedReviewForReply.id, replyText);
    setSelectedReviewForReply(null);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-google-sans font-bold tracking-tight text-cream">
            Guest Reviews & Reputation Management
          </h1>
          <p className="text-xs sm:text-sm text-[#A89F91] mt-0.5">
            Monitor patron dining experiences, Google Reviews, in-store QR codes, and smart replies.
          </p>
        </div>
      </div>

      {/* Rating overview strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#161412] border border-gold/20 p-5 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-[10px] text-[#A89F91] uppercase font-bold tracking-wider">
              Overall Guest Score
            </p>
            <p className="text-3xl font-bold font-mono text-[#E6BC65] mt-1 flex items-baseline gap-1">
              {avgRating} <span className="text-sm text-[#8E867B]">/ 5.0</span>
            </p>
            <div className="flex items-center gap-1 mt-1 text-gold">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-gold" />
              ))}
            </div>
          </div>
          <Sparkles className="w-8 h-8 text-gold/40" />
        </div>

        <div className="bg-[#161412] border border-[#2A241F] p-5 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-[10px] text-[#A89F91] uppercase font-bold tracking-wider">
              5-Star Compliments
            </p>
            <p className="text-3xl font-bold font-mono text-cream mt-1">
              {fiveStarCount} Reviews
            </p>
            <p className="text-[11px] text-emerald-400 mt-1">
              92% positive sentiment
            </p>
          </div>
          <CheckCircle2 className="w-8 h-8 text-emerald-400/40" />
        </div>

        <div className="bg-[#161412] border border-[#2A241F] p-5 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-[10px] text-[#A89F91] uppercase font-bold tracking-wider">
              Response Rate
            </p>
            <p className="text-3xl font-bold font-mono text-cream mt-1">
              100%
            </p>
            <p className="text-[11px] text-[#8E867B] mt-1">
              All reviews responded to
            </p>
          </div>
          <MessageSquare className="w-8 h-8 text-[#8E867B]/40" />
        </div>
      </div>

      {/* Filter */}
      <AdminCard noPadding className="p-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-cream">
            Filter Reviews by Rating:
          </span>
          <div className="flex items-center gap-1.5">
            {["all", "5", "4", "3"].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRatingFilter(star)}
                className={`px-3 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                  ratingFilter === star
                    ? "bg-gold text-[#141210] font-bold"
                    : "bg-[#1C1814] text-[#A89F91] hover:text-cream"
                }`}
              >
                {star === "all" ? "All Stars" : `${star} Stars`}
              </button>
            ))}
          </div>
        </div>
      </AdminCard>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.map((rev) => (
          <AdminCard key={rev.id} className="space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-sm text-cream">
                    {rev.customer}
                  </h3>
                  <span className="text-[11px] text-[#8E867B]">
                    via {rev.source}
                  </span>
                  <span className="text-[10px] text-gold bg-gold/10 px-1.5 py-0.5 rounded font-medium">
                    {rev.outlet}
                  </span>
                </div>

                <div className="flex items-center gap-1 mt-1 text-amber-400">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                  <span className="text-xs font-bold text-cream ml-1.5">
                    {rev.title}
                  </span>
                </div>
              </div>

              <span className="text-[11px] text-[#7E7568]">{rev.date}</span>
            </div>

            <p className="text-xs text-[#D8CEBF] leading-relaxed">
              &ldquo;{rev.comment}&rdquo;
            </p>

            {/* Existing Reply if any */}
            {rev.reply && (
              <div className="p-3 rounded-xl bg-[#141210] border border-[#25201B] text-xs space-y-1">
                <div className="flex items-center gap-1.5 text-[10px] text-gold font-bold uppercase tracking-wider">
                  <CornerDownRight className="w-3 h-3" />
                  <span>Management Response</span>
                </div>
                <p className="text-[#A89F91] italic pl-4">
                  &ldquo;{rev.reply}&rdquo;
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="pt-2 border-t border-[#25201B] flex items-center justify-between text-xs">
              <span className="text-[11px] text-[#8E867B]">
                {rev.featured ? "★ Featured on Website" : "Standard Review"}
              </span>

              <AdminButton
                variant="outlineGold"
                size="xs"
                icon={MessageSquare}
                onClick={() => handleOpenReplyModal(rev)}
              >
                {rev.reply ? "Edit Response" : "Smart Reply"}
              </AdminButton>
            </div>
          </AdminCard>
        ))}
      </div>

      {/* Reply Modal */}
      <AdminModal
        isOpen={Boolean(selectedReviewForReply)}
        onClose={() => setSelectedReviewForReply(null)}
        title="Compose Official Guest Response"
        subtitle={`Replying to: ${selectedReviewForReply?.customer} (${selectedReviewForReply?.source})`}
        footer={
          <div className="flex justify-end gap-2.5">
            <AdminButton
              variant="dark"
              size="sm"
              onClick={() => setSelectedReviewForReply(null)}
            >
              Cancel
            </AdminButton>
            <AdminButton
              variant="primary"
              size="sm"
              icon={Send}
              onClick={handleSaveReply}
            >
              Publish Response
            </AdminButton>
          </div>
        }
      >
        {selectedReviewForReply && (
          <form onSubmit={handleSaveReply} className="space-y-4">
            <div className="p-3 bg-espresso border border-[#2E2721] rounded-xl text-xs space-y-1">
              <p className="font-semibold text-cream">
                Guest Review: &ldquo;{selectedReviewForReply.title}&rdquo;
              </p>
              <p className="text-[#A89F91]">
                &ldquo;{selectedReviewForReply.comment}&rdquo;
              </p>
            </div>

            <div>
              <label className="text-xs font-semibold text-cream">
                Management Response Message *
              </label>
              <textarea
                rows={4}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                required
                className="w-full mt-1.5 bg-[#1C1814] border border-white/10 rounded-xl p-3 text-xs text-cream focus:outline-none leading-relaxed"
              />
            </div>
          </form>
        )}
      </AdminModal>
    </div>
  );
}
