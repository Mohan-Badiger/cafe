"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAdmin, MASTER_ADMIN } from "@/lib/admin/adminStore";
import {
  Coffee,
  Mail,
  ArrowRight,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
} from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const { loginUser } = useAdmin();

  const [email, setEmail] = useState("admin@cafe.com");
  const [password, setPassword] = useState("admin@123");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleManualLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    setTimeout(() => {
      if (
        email.toLowerCase().trim() === MASTER_ADMIN.email.toLowerCase() &&
        (password === MASTER_ADMIN.password || password === MASTER_ADMIN.pin || password === "admin@123")
      ) {
        loginUser(MASTER_ADMIN);
        router.push("/admin");
      } else {
        setError("Invalid administrator credentials. Use admin@cafe.com with password admin@123.");
        setLoading(false);
      }
    }, 400);
  };

  const handleQuickLogin = () => {
    loginUser(MASTER_ADMIN);
    router.push("/admin");
  };

  return (
    <div className="min-h-screen bg-[#0E0C0A] text-[#EDE8E1] flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden admin-scope">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-125 h-125 bg-gold/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-md space-y-6 relative z-10">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-linear-to-br from-gold to-[#B3832B] shadow-xl shadow-gold/20 mb-2">
            <Coffee className="w-8 h-8 text-[#141210]" />
          </div>
          <h1 className="font-google-sans font-bold text-2xl sm:text-3xl text-cream tracking-tight">
            Chaat & Chill Café
          </h1>
          <p className="text-xs text-[#A89F91]">
            Centralized Restaurant Operations & Management Suite
          </p>
        </div>

        {/* Login Box */}
        <div className="bg-[#161412] border border-[#2E2721] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
          <div>
            <div className="flex items-center gap-1.5 text-gold text-xs font-semibold uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Administrator Portal</span>
            </div>
            <h2 className="font-semibold text-lg text-cream">
              Sign In to Admin Console
            </h2>
            <p className="text-xs text-[#8E867B] mt-0.5">
              Admin access for Mohan (admin@cafe.com)
            </p>
          </div>

          {error && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs text-rose-300">
              {error}
            </div>
          )}

          <form onSubmit={handleManualLogin} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-cream block">
                Administrator Email
              </label>
              <div className="relative mt-1.5">
                <Mail className="w-4 h-4 text-[#7E7568] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@cafe.com"
                  required
                  className="w-full bg-[#1C1814] border rounded-xl pl-10 pr-3 py-2.5 text-xs text-cream focus:outline-none focus:border-gold/50"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-cream block">
                  Password
                </label>
                <span className="text-[10px] text-gold/80 font-mono">
                  Default: admin@123
                </span>
              </div>
              <div className="relative mt-1.5">
                <Lock className="w-4 h-4 text-[#7E7568] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="admin@123"
                  required
                  className="w-full bg-[#1C1814] border border-white/10 rounded-xl pl-10 pr-10 py-2.5 text-xs text-cream focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7E7568] hover:text-cream cursor-pointer p-1"
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-xl bg-linear-to-r from-gold to-[#E6BC65] hover:from-[#E6BC65] hover:to-[#F3CF7A] text-[#141210] font-semibold text-xs shadow-lg shadow-gold/10 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98]"
            >
              <span>{loading ? "Authenticating..." : "Sign In as Administrator"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo 1-Click Access */}
          <div className="pt-3 border-t border-[#25201B]">
            <button
              type="button"
              onClick={handleQuickLogin}
              className="w-full p-2.5 rounded-xl bg-[#1C1814] border border-[#2A241F] hover:border-gold/40 text-center transition-all cursor-pointer group flex items-center justify-center gap-2"
            >
              <span className="text-xs font-semibold text-cream group-hover:text-gold transition-colors">
                ⚡ 1-Click Administrator Instant Access
              </span>
            </button>
          </div>
        </div>

        {/* Footer links */}
        <div className="text-center text-xs text-[#8E867B]">
          <Link
            href="/"
            className="hover:text-cream transition-colors underline"
          >
            ← Return to Public Café Website
          </Link>
        </div>
      </div>
    </div>
  );
}
