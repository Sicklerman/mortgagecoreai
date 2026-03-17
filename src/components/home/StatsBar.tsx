"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { value: "$1.7T", label: "U.S. Mortgage Market", source: "2024 Origination Volume" },
  { value: "45+ Days", label: "Eliminated from Cycle", source: "vs. legacy LOS avg" },
  { value: "68%", label: "Auto-Clear Rate", source: "AI-driven conditions" },
  { value: "$7,260", label: "Savings Per Loan", source: "vs. $10,500 industry avg" },
];

export function StatsBar() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="bg-navy border-y border-steel/20 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="font-sora font-bold text-4xl text-gold mb-1">{stat.value}</div>
              <div className="text-sm font-semibold text-off-white mb-1">{stat.label}</div>
              <div className="text-xs text-muted">{stat.source}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
