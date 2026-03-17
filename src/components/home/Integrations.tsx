"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SectionHeader } from "@/components/shared/SectionHeader";

const row1 = ["LendingQB", "Insellerate", "LoanPass", "Fannie Mae DU", "Freddie Mac LPA", "MERS"];
const row2 = ["DocuSign", "Plaid", "Truework", "Socure", "CoreLogic", "Qualia"];

export function Integrations() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Integrations"
          title="Connects to Your Entire Ecosystem"
          subtitle="MortgageCore AI delivers all integrations via its API Gateway — no custom build required by banking partners."
        />

        <div className="mt-12 space-y-4">
          {[row1, row2].map((row, ri) => (
            <motion.div
              key={ri}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: ri * 0.15 }}
              className="flex flex-wrap justify-center gap-3"
            >
              {row.map((name, i) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: ri * 0.15 + i * 0.05 }}
                  className="flex items-center gap-2 px-5 py-2.5 bg-blue-deep border border-steel/40 rounded-full hover:border-gold/40 hover:bg-steel/20 transition-all cursor-default"
                >
                  <div className="w-2 h-2 rounded-full bg-gold" />
                  <span className="text-sm font-semibold text-off-white/80">{name}</span>
                </motion.div>
              ))}
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center text-muted text-xs mt-8"
        >
          All integrations delivered via MortgageCore AI API Gateway — no custom build required by banking partners
        </motion.p>
      </div>
    </section>
  );
}
