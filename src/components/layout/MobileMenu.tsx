"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { X, Brain, Code2, BookOpen, Package } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  onDemo: () => void;
}

const links = [
  { href: "/platform", label: "Platform" },
  { href: "/solutions", label: "Solutions" },
  { href: "/pricing", label: "Pricing" },
  { href: "/company", label: "Company" },
  { href: "/demo", label: "Live Demo" },
];

const devLinks = [
  { href: "/developers/api-reference", label: "API Reference", icon: Code2 },
  { href: "/developers/guides", label: "Integration Guides", icon: BookOpen },
  { href: "/developers/sdks", label: "SDKs & Tools", icon: Package },
];

export function MobileMenu({ open, onClose, onDemo }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 lg:hidden"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-72 bg-blue-deep border-l border-steel/30 z-50 lg:hidden overflow-y-auto"
          >
            <div className="p-5">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-gold" />
                  <span className="font-sora font-bold text-gold text-sm tracking-wider uppercase">
                    MortgageCore AI
                  </span>
                </div>
                <button onClick={onClose} className="p-2 text-off-white/60 hover:text-gold">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="space-y-1 mb-6">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={onClose}
                    className="block px-3 py-3 text-off-white/80 hover:text-gold hover:bg-steel/20 rounded-lg transition-colors font-medium"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="border-t border-steel/30 pt-5 mb-6">
                <div className="text-xs font-bold text-muted uppercase tracking-widest mb-3 px-3">
                  Developers
                </div>
                {devLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={onClose}
                    className="flex items-center gap-3 px-3 py-3 text-off-white/70 hover:text-gold hover:bg-steel/20 rounded-lg transition-colors"
                  >
                    <link.icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{link.label}</span>
                  </Link>
                ))}
              </div>

              <div className="space-y-3">
                <Link
                  href="/login"
                  onClick={onClose}
                  className="block w-full text-center px-4 py-2.5 text-sm border border-steel/40 rounded-lg text-off-white/70 hover:border-gold/40 hover:text-gold transition-colors"
                >
                  Sign In
                </Link>
                <button
                  onClick={onDemo}
                  className="w-full px-4 py-2.5 text-sm font-semibold bg-gold text-navy rounded-lg hover:bg-gold-lt transition-colors"
                >
                  Schedule a Demo
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
