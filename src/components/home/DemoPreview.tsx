"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScheduleDemoModal } from "@/components/shared/ScheduleDemoModal";
import { SectionHeader } from "@/components/shared/SectionHeader";

export function DemoPreview() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <>
      <section ref={ref} className="py-24 bg-[#080D1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Live Demo"
            title="See It Live"
            subtitle="Explore the full loan lifecycle — from AI processing to securitization — in our interactive platform demo."
          />

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-12 relative"
          >
            {/* Glow */}
            <div className="absolute -inset-2 bg-gold/5 rounded-3xl blur-xl" />

            {/* Browser frame */}
            <div className="relative bg-navy border-2 border-steel/40 rounded-2xl shadow-2xl overflow-hidden">
              {/* Browser chrome */}
              <div className="flex items-center gap-3 px-5 py-3 bg-[#0D1F3C] border-b border-steel/30">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <div className="bg-[#1E3A5F]/80 rounded-md px-4 py-1.5 text-xs text-[#64748B] font-mono flex items-center gap-2">
                    <span className="text-emerald-400">🔒</span>
                    app.mortgagecoreai.com
                  </div>
                </div>
                <div className="w-16" />
              </div>

              {/* iframe */}
              <div className="relative w-full" style={{ height: "600px" }}>
                <iframe
                  src="/demo.html"
                  className="w-full h-full border-0"
                  title="MortgageCore AI Platform Demo"
                  sandbox="allow-scripts allow-same-origin"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-center mt-8"
          >
            <p className="text-white/50 text-sm mb-4">
              Want a live walkthrough with your own loan data?
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setDemoOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-navy font-bold rounded-xl hover:bg-gold-lt transition-colors text-sm"
              >
                Schedule a Demo <ArrowRight className="w-4 h-4" />
              </button>
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 px-6 py-3 border border-steel/40 text-off-white/70 rounded-xl hover:border-gold/40 hover:text-gold transition-colors text-sm"
              >
                Full-Screen Demo
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <ScheduleDemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </>
  );
}
