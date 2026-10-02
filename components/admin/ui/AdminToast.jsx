"use client";

import { useAdmin } from "@/lib/admin/adminStore";
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from "lucide-react";

export default function AdminToast() {
  const { toasts, removeToast } = useAdmin();

  if (!toasts || toasts.length === 0) return null;

  const icons = {
    success: <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />,
    error: <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />,
    warning: <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />,
    info: <Info className="w-4 h-4 text-sky-400 shrink-0" />,
  };

  const borderColors = {
    success: "border-emerald-500/40 bg-[#121E17]",
    error: "border-rose-500/40 bg-[#211415]",
    warning: "border-amber-500/40 bg-[#231A12]",
    info: "border-sky-500/40 bg-[#121B23]",
  };

  return (
    <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 rounded-xl border shadow-2xl backdrop-blur-md text-sm text-[#FAF5EF] animate-in slide-in-from-bottom-3 duration-200 ${
            borderColors[toast.type] || borderColors.info
          }`}
        >
          <div className="flex items-center gap-2.5">
            {icons[toast.type] || icons.info}
            <span className="font-medium text-xs sm:text-sm">{toast.message}</span>
          </div>
          <button
            type="button"
            onClick={() => removeToast(toast.id)}
            className="p-1 rounded-md text-[#A89F91] hover:text-[#FAF5EF] hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}
