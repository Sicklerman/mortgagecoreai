"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, BookOpen, Code2, Package, FileText, Brain } from "lucide-react";
import { ScheduleDemoModal } from "@/components/shared/ScheduleDemoModal";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { cn } from "@/lib/utils";

const devLinks = [
  { href: "/developers/api-reference", label: "API Reference", icon: Code2, desc: "Full REST API docs" },
  { href: "/developers/guides", label: "Integration Guides", icon: BookOpen, desc: "Step-by-step walkthroughs" },
  { href: "/developers/sdks", label: "SDKs & Tools", icon: Package, desc: "Node.js, Python, Java" },
  { href: "/developers/changelog", label: "Changelog", icon: FileText, desc: "What's new in the API" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [devOpen, setDevOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-navy/95 backdrop-blur-md border-b border-steel/30 shadow-lg"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gold/20 flex items-center justify-center group-hover:bg-gold/30 transition-colors">
                <Brain className="w-5 h-5 text-gold" />
              </div>
              <span className="font-sora font-bold text-sm tracking-widest text-gold uppercase">
                MortgageCore AI
              </span>
            </Link>

            {/* Center Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {["Platform", "Solutions", "Pricing"].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="px-3 py-2 text-sm text-off-white/70 hover:text-gold transition-colors rounded-md hover:bg-blue-deep/50"
                >
                  {item}
                </Link>
              ))}

              {/* Developers dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setDevOpen(true)}
                onMouseLeave={() => setDevOpen(false)}
              >
                <button className="flex items-center gap-1 px-3 py-2 text-sm text-off-white/70 hover:text-gold transition-colors rounded-md hover:bg-blue-deep/50">
                  Developers
                  <ChevronDown
                    className={cn(
                      "w-3.5 h-3.5 transition-transform duration-200",
                      devOpen && "rotate-180"
                    )}
                  />
                </button>

                <AnimatePresence>
                  {devOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-1 w-64 bg-blue-deep border border-steel/40 rounded-xl shadow-2xl overflow-hidden"
                    >
                      {devLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="flex items-start gap-3 p-3 hover:bg-steel/20 transition-colors group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors mt-0.5">
                            <link.icon className="w-4 h-4 text-gold" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-off-white group-hover:text-gold transition-colors">
                              {link.label}
                            </div>
                            <div className="text-xs text-muted mt-0.5">{link.desc}</div>
                          </div>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                href="/company"
                className="px-3 py-2 text-sm text-off-white/70 hover:text-gold transition-colors rounded-md hover:bg-blue-deep/50"
              >
                Company
              </Link>
            </nav>

            {/* Right side */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/login"
                className="px-4 py-2 text-sm text-off-white/70 hover:text-gold border border-steel/40 rounded-lg transition-colors hover:border-gold/40"
              >
                Sign In
              </Link>
              <button
                onClick={() => setDemoOpen(true)}
                className="px-4 py-2 text-sm font-semibold bg-gold text-navy rounded-lg hover:bg-gold-lt transition-colors"
              >
                Schedule a Demo
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 text-off-white/70 hover:text-gold"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onDemo={() => { setMobileOpen(false); setDemoOpen(true); }}
      />

      <ScheduleDemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </>
  );
}
