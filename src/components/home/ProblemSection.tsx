"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { DollarSign, Clock, Puzzle } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";

const problems = [
  {
    icon: DollarSign,
    stat: "$10,500",
    title: "Avg Cost Per Loan",
    desc: "Industry average cost to originate a single mortgage has nearly doubled in a decade, driven by manual processes, duplicative systems, and excessive headcount.",
    color: "from-red-500",
    accent: "border-red-500/40",
    iconColor: "text-red-400",
  },
  {
    icon: Clock,
    stat: "45+ Days",
    title: "Average Time to Close",
    desc: "Fragmented vendor ecosystems, siloed LOS platforms, and manual document chasing create unavoidable delays that frustrate borrowers and bleed revenue.",
    color: "from-amber-500",
    accent: "border-amber-500/40",
    iconColor: "text-amber-400",
  },
  {
    icon: Puzzle,
    stat: "$500K+",
    title: "Integration Cost",
    desc: "Banking partners spend enormous sums stitching together legacy LOS, CRM, PPE, and compliance tools — only to achieve partial automation and zero AI intelligence.",
    color: "from-blue-500",
    accent: "border-blue-500/40",
    iconColor: "text-blue-400",
  },
];

export function ProblemSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-[#080D1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="The Problem"
          title="Legacy Mortgage Tech Is Costing You"
          subtitle="Every day on a legacy LOS is a day of lost revenue, frustrated borrowers, and competitive disadvantage."
        />

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {problems.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className={`bg-[#0D1F3C] rounded-2xl border-t-4 ${p.accent} p-8 hover:border-opacity-80 transition-all`}
            >
              <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6`}>
                <p.icon className={`w-6 h-6 ${p.iconColor}`} />
              </div>
              <div className="font-sora font-bold text-5xl text-white mb-2">{p.stat}</div>
              <div className="font-semibold text-white mb-3">{p.title}</div>
              <p className="text-sm text-white/50 leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center text-white/40 text-sm italic mt-10"
        >
          Legacy systems weren&apos;t built for AI. They weren&apos;t built for speed. And they certainly weren&apos;t built for the modern borrower.
        </motion.p>
      </div>
    </section>
  );
}
