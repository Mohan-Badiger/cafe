"use client";

import { useState } from "react";
import Link from "next/link";
import { siteConfig, navLinks } from "@/lib/content";
import SectionReveal from "@/components/shared/SectionReveal";
import MagneticButton from "@/components/shared/MagneticButton";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmail("");
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
    }, 5000);
  };

  return (
    <footer id="footer" className="bg-espresso-deep pt-20 pb-8 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Top area */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-white/10">
          {/* Brand */}
          <SectionReveal className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4 group">
              <span className="text-3xl font-serif font-bold text-cream group-hover:text-gold transition-colors">
                Chaat<span className="text-gold">&nbsp;&&nbsp;</span>Chill
              </span>
            </Link>
            <p className="text-muted text-sm leading-relaxed mb-6">
              {siteConfig.description}
            </p>
            {/* Social icons */}
            <div className="flex gap-4">
              {[
                { href: siteConfig.socials.instagram, label: "Instagram", icon: "M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 01-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 017.8 2zm-.2 2A3.6 3.6 0 004 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 003.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6zm9.65 1.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6z" },
                { href: siteConfig.socials.twitter, label: "Twitter", icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
                { href: siteConfig.socials.facebook, label: "Facebook", icon: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" },
                { href: siteConfig.socials.youtube, label: "YouTube", icon: "M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.43zM9.75 15.02V8.48l5.75 3.27-5.75 3.27z" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-muted hover:text-gold hover:border-gold/30 transition-all"
                  aria-label={social.label}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </SectionReveal>

          {/* Quick Links */}
          <SectionReveal delay={0.1}>
            <h4 className="text-cream font-semibold text-sm uppercase tracking-wider mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted text-sm hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </SectionReveal>

          {/* Hours */}
          <SectionReveal delay={0.2}>
            <h4 className="text-cream font-semibold text-sm uppercase tracking-wider mb-6">
              Hours
            </h4>
            <ul className="space-y-3 text-muted text-sm">
              <li>
                <span className="text-cream/70">Mon - Fri:</span> 8:00 AM – 11:00 PM
              </li>
              <li>
                <span className="text-cream/70">Saturday:</span> 9:00 AM – 12:00 AM
              </li>
              <li>
                <span className="text-cream/70">Sunday:</span> 9:00 AM – 11:00 PM
              </li>
            </ul>
          </SectionReveal>

          {/* Newsletter */}
          <SectionReveal delay={0.3}>
            <h4 className="text-cream font-semibold text-sm uppercase tracking-wider mb-6">
              Stay Updated
            </h4>
            <p className="text-muted text-sm mb-4">
              Get the latest on new dishes, events, and special offers.
            </p>
            {subscribed ? (
              <div className="bg-gold/10 border border-gold/20 rounded-xl p-4 text-gold font-medium text-sm text-center">
                Thanks for subscribing! 🎉
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-cream text-sm focus:outline-none transition-colors"
                />
                <MagneticButton
                  type="submit"
                  className="px-5 py-2.5 bg-gold text-espresso rounded-full text-sm font-semibold hover:bg-amber transition-colors cursor-pointer"
                >
                  Join
                </MagneticButton>
              </form>
            )}
          </SectionReveal>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} Chaat & Chill Café. All rights reserved.
          </p>
          <div className="flex gap-6 text-white/30 text-xs">
            <a href="#" className="hover:text-gold transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gold transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
