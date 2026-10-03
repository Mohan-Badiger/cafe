"use client";

export default function AdminCard({
  children,
  className = "",
  title,
  subtitle,
  action,
  headerBorder = true,
  noPadding = false,
  badge,
}) {
  return (
    <div
      className={`bg-[#161412] border border-[#2A241F] rounded-2xl shadow-xl overflow-hidden transition-all duration-200 ${className}`}
    >
      {(title || subtitle || action || badge) && (
        <div
          className={`px-5 py-4 flex flex-wrap items-center justify-between gap-3 ${
            headerBorder ? "border-b border-[#2A241F]" : ""
          }`}
        >
          <div>
            <div className="flex items-center gap-2.5">
              {title && (
                <h3 className="font-google-sans font-semibold text-base text-[#FAF5EF] tracking-tight">
                  {title}
                </h3>
              )}
              {badge && <div>{badge}</div>}
            </div>
            {subtitle && (
              <p suppressHydrationWarning className="text-xs text-[#A89F91] mt-0.5 font-normal">
                {subtitle}
              </p>
            )}
          </div>
          {action && <div className="flex items-center gap-2">{action}</div>}
        </div>
      )}
      <div className={noPadding ? "" : "p-5"}>{children}</div>
    </div>
  );
}
