"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight, Phone } from "lucide-react";
import { ScheduleDemoModal } from "@/components/shared/ScheduleDemoModal";

export function CTASection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <>
      <section ref={ref} className="py-24 bg-blue-deep relative overflow-hidden">
        <div className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(ellipse at 30% 50%, #C8A95133 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, #2E5F9A33 0%, transparent 60%)`,
          }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-sora font-bold text-4xl md:text-5xl lg:text-6xl text-gradient-gold mb-6">
              Ready to Cut Your Cost Per Loan by 68%?
            </h2>
            <p className="text-lg text-off-white/60 leading-relaxed mb-10 max-w-2xl mx-auto">
              Join forward-thinking banking partners who&apos;ve made the switch to AI-native origination. Average time to deploy: 30 days.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setDemoOpen(true)}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-navy font-bold rounded-xl hover:bg-gold-lt transition-all hover:scale-105 shadow-xl shadow-gold/20 text-base"
              >
                Schedule a Demo
                <ArrowRight className="w-5 h-5" />
              </button>
              <a
                href="mailto:sales@mortgagecoreai.com"
                className="inline-flex items-center gap-2 px-8 py-4 border border-off-white/30 text-off-white/80 rounded-xl hover:border-gold/50 hover:text-gold transition-all text-base"
              >
                <Phone className="w-5 h-5" />
                Talk to Sales
              </a>
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-off-white/40">
              <span>✓ 30-day onboarding SLA</span>
              <span>✓ 6-month ROI guarantee</span>
              <span>✓ SOC 2 Type II certified</span>
              <span>✓ No custom integration build required</span>
            </div>
          </motion.div>
        </div>
      </section>

      <ScheduleDemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </>
  );
}
