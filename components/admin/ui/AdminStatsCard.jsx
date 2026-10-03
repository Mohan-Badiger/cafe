"use client";

import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function AdminStatsCard({
  title,
  value,
  trend,
  trendLabel = "vs yesterday",
  isPositive = true,
  icon: Icon,
  badgeText,
  accentColor = "gold", // gold, emerald, amber, purple, sky
  className = "",
}) {
  const accentStyles = {
    gold: {
      border: "border-[#3A3022]",
      glow: "hover:border-[#D4A853]/40",
      iconBg: "bg-[#D4A853]/15 text-[#E6BC65]",
    },
    emerald: {
      border: "border-[#1E3A2B]",
      glow: "hover:border-emerald-500/40",
      iconBg: "bg-emerald-500/15 text-emerald-400",
    },
    amber: {
      border: "border-[#3D2512]",
      glow: "hover:border-[#D97200]/40",
      iconBg: "bg-[#D97200]/15 text-[#FFA043]",
    },
    purple: {
      border: "border-[#311E3F]",
      glow: "hover:border-purple-500/40",
      iconBg: "bg-purple-500/15 text-purple-400",
    },
    sky: {
      border: "border-[#162D3D]",
      glow: "hover:border-sky-500/40",
      iconBg: "bg-sky-500/15 text-sky-400",
    },
  };

  const style = accentStyles[accentColor] || accentStyles.gold;

  return (
    <div
      className={`relative bg-[#161412] border ${style.border} ${style.glow} rounded-2xl p-5 shadow-lg transition-all duration-200 group overflow-hidden ${className}`}
    >
      {/* Background ambient radial highlight */}
      <div className="absolute top-0 right-0 -mr-8 -mt-8 w-28 h-28 rounded-full bg-white/2 blur-2xl pointer-events-none group-hover:bg-[#D4A853]/5 transition-colors" />

      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-[#A89F91] tracking-wider uppercase">
            {title}
          </p>
          <h4 suppressHydrationWarning className="text-2xl sm:text-3xl font-bold text-[#FAF5EF] mt-1.5 font-sans tracking-tight">
            {value}
          </h4>
        </div>

        {Icon && (
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${style.iconBg} shadow-inner transition-transform group-hover:scale-105`}
          >
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>

      {(trend !== undefined || badgeText) && (
        <div suppressHydrationWarning className="mt-4 pt-3 border-t border-[#25201B] flex items-center justify-between text-xs">
          {trend !== undefined ? (
            <div suppressHydrationWarning className="flex items-center gap-1.5 font-medium">
              <span
                suppressHydrationWarning
                className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md text-[11px] font-semibold ${
                  isPositive
                    ? "bg-emerald-500/15 text-emerald-400"
                    : "bg-rose-500/15 text-rose-400"
                }`}
              >
                {isPositive ? (
                  <ArrowUpRight className="w-3.5 h-3.5" />
                ) : (
                  <ArrowDownRight className="w-3.5 h-3.5" />
                )}
                {trend}
              </span>
              <span suppressHydrationWarning className="text-[#8E867B]">{trendLabel}</span>
            </div>
          ) : (
            <span suppressHydrationWarning className="text-[#8E867B]">{trendLabel}</span>
          )}

          {badgeText && (
            <span suppressHydrationWarning className="text-[11px] font-medium text-[#D4A853] bg-[#D4A853]/10 px-2 py-0.5 rounded-md">
              {badgeText}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
