"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Bot, Shield, Database, Palette } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";

const stages = [
  "Lead Capture",
  "Digital Application",
  "AI Processing",
  "AUS & Underwriting",
  "Closing & Funding",
  "Secondary Market",
];

const pillars = [
  {
    icon: Bot,
    title: "AI Processor",
    desc: "Replaces manual processing. Autonomously clears 60–75% of conditions, chases documents, and manages vendor orders without human intervention.",
    color: "text-teal-400",
    bg: "bg-teal-400/10",
  },
  {
    icon: Shield,
    title: "Compliance Guard",
    desc: "Real-time TRID, HMDA, and ATR/QM enforcement. Zero manual compliance review for routine loans. Automated adverse action notices.",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  },
  {
    icon: Database,
    title: "Unified Data Layer",
    desc: "Single source of truth across LendingQB, Insellerate, LoanPass, GSE systems, and all third-party vendors. No more siloed data.",
    color: "text-purple-400",
    bg: "bg-purple-400/10",
  },
  {
    icon: Palette,
    title: "White-Label SaaS",
    desc: "Banking partners deploy under their own brand with full multi-tenant isolation. Deploy in days, not months. Full data sovereignty.",
    color: "text-gold",
    bg: "bg-gold/10",
  },
];

export function SolutionOverview() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="The Solution"
          title="One Platform. Every Stage. Powered by AI."
          subtitle="MortgageCore AI orchestrates the entire mortgage lifecycle within a single API-native intelligence layer."
        />

        {/* Pipeline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 relative"
        >
          <div className="flex flex-wrap justify-center items-center gap-2 mb-2">
            {stages.map((stage, i) => (
              <div key={stage} className="flex items-center gap-2">
                <div className="px-4 py-3 rounded-xl bg-blue-deep border border-steel/40 text-sm font-semibold text-off-white text-center min-w-[120px]">
                  {stage}
                </div>
                {i < stages.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-gold flex-shrink-0" />
                )}
              </div>
            ))}
          </div>

          {/* Intelligence layer banner */}
          <div className="mt-4 px-6 py-3 bg-gold text-navy font-bold text-sm text-center rounded-xl">
            ⚡ MortgageCore AI Intelligence Layer — Active at Every Stage
          </div>
        </motion.div>

        {/* Pillars */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
              className="bg-blue-deep/60 border border-steel/30 rounded-2xl p-6 hover:border-gold/30 transition-all hover:-translate-y-1"
            >
              <div className={`w-11 h-11 rounded-xl ${p.bg} flex items-center justify-center mb-4`}>
                <p.icon className={`w-6 h-6 ${p.color}`} />
              </div>
              <h3 className="font-sora font-bold text-off-white mb-2">{p.title}</h3>
              <p className="text-sm text-off-white/60 leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
