"use client";

export default function AdminBadge({
  children,
  variant = "default",
  size = "md",
  dot = false,
  className = "",
  suppressHydrationWarning = true,
  ...props
}) {
  const variants = {
    default: "bg-[#25201B] text-[#D8CEBF] border-[#362D24]",
    gold: "bg-[#D4A853]/15 text-[#E6BC65] border-[#D4A853]/30",
    amber: "bg-[#D97200]/15 text-[#FFA043] border-[#D97200]/30",
    success: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    danger: "bg-rose-500/15 text-rose-400 border-rose-500/30",
    warning: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    info: "bg-sky-500/15 text-sky-300 border-sky-500/30",
    purple: "bg-purple-500/15 text-purple-300 border-purple-500/30",
  };

  const sizes = {
    sm: "text-[10px] px-2 py-0.5 tracking-wider uppercase font-semibold",
    md: "text-xs px-2.5 py-1 font-medium",
    lg: "text-sm px-3 py-1.5 font-medium",
  };

  const dotColors = {
    default: "bg-[#A89F91]",
    gold: "bg-[#D4A853]",
    amber: "bg-[#D97200]",
    success: "bg-emerald-400",
    danger: "bg-rose-400",
    warning: "bg-amber-400",
    info: "bg-sky-400",
    purple: "bg-purple-400",
  };

  return (
    <span
      suppressHydrationWarning={suppressHydrationWarning}
      className={`inline-flex items-center gap-1.5 rounded-full border shadow-sm ${variants[variant] || variants.default} ${sizes[size]} ${className}`}
      {...props}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full animate-pulse ${
            dotColors[variant] || dotColors.default
          }`}
        />
      )}
      {children}
    </span>
  );
}
