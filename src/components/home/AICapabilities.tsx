"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MessageSquare, Cpu, FileSearch, AlertTriangle, BarChart2, Check, X } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";

const capabilities = [
  {
    icon: MessageSquare,
    title: "AI Loan Agent",
    model: "GPT-4o",
    desc: "Borrower-facing chat assistant handles pre-qualification, answers questions, and collects documentation 24/7 — zero LO involvement required for initial engagement.",
    color: "text-teal-400",
    bg: "bg-teal-400/10",
  },
  {
    icon: Cpu,
    title: "AI Processor Engine",
    model: "LLM + RAG + Rules",
    desc: "Autonomously manages processing workflow: orders vendors, parses documents, and clears 60–75% of standard conditions without human intervention. Integrated into Azure AI Foundry.",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  },
  {
    icon: FileSearch,
    title: "Document Intelligence",
    model: "Azure Form Recognizer",
    desc: "Computer vision + NLP classifies uploaded documents at ≥93% accuracy. Extracts key fields with confidence scores and auto-satisfies conditions against document rule criteria.",
    color: "text-purple-400",
    bg: "bg-purple-400/10",
  },
  {
    icon: AlertTriangle,
    title: "Fraud Sentinel",
    model: "Anomaly Detection Ensemble",
    desc: "Monitors 300+ fraud indicators across identity, income, collateral, and transaction patterns in real time. SHAP-value explainability for ECOA compliance.",
    color: "text-red-400",
    bg: "bg-red-400/10",
  },
  {
    icon: BarChart2,
    title: "Secondary Market AI",
    model: "Time-Series Forecasting",
    desc: "Pipeline hedge advisor calculates MBS hedge ratios, recommends optimal lock timing, SRP maximization, and identifies loans at risk of GSE delivery rejection before commitment.",
    color: "text-gold",
    bg: "bg-gold/10",
  },
];

const comparison = [
  { metric: "Cycle Time", legacy: "35–45 days", ai: "12–18 days", aiGood: true },
  { metric: "Cost / Loan", legacy: "$8,500–$12K", ai: "$2,800–$4,200", aiGood: true },
  { metric: "Processor Ratio", legacy: "1:50 loans", ai: "1:200+ loans", aiGood: true },
  { metric: "Condition Auto-Clear", legacy: "0%", ai: "60–75%", aiGood: true },
  { metric: "Compliance Errors", legacy: "Manual audit", ai: "Real-time block", aiGood: true },
  { metric: "GSE Delivery", legacy: "5–10 days", ai: "24–48 hours", aiGood: true },
  { metric: "Borrower NPS", legacy: "Industry avg. 42", ai: "Target: 72+", aiGood: true },
];

export function AICapabilities() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="AI Architecture"
          title="Not AI as a Feature. AI as the Operating System."
          subtitle="Every workflow stage is orchestrated by an embedded AI model — from lead scoring through secondary market delivery."
        />

        <div className="mt-16 grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: AI capabilities */}
          <div className="space-y-4">
            {capabilities.map((cap, i) => (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, x: -24 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-4 p-4 bg-blue-deep/60 border border-steel/30 rounded-xl hover:border-gold/30 transition-all"
              >
                <div className={`w-11 h-11 rounded-xl ${cap.bg} flex items-center justify-center flex-shrink-0`}>
                  <cap.icon className={`w-5 h-5 ${cap.color}`} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-sora font-bold text-sm text-off-white">{cap.title}</h3>
                    <span className="text-xs px-2 py-0.5 bg-steel/30 text-muted rounded-full font-mono">{cap.model}</span>
                  </div>
                  <p className="text-xs text-off-white/60 leading-relaxed">{cap.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: comparison table */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-blue-deep/60 border border-steel/30 rounded-2xl overflow-hidden"
          >
            <div className="grid grid-cols-3 bg-navy/80 border-b border-steel/30 text-xs font-bold uppercase tracking-wider text-muted px-4 py-3">
              <span>Metric</span>
              <span className="text-center">Legacy LOS</span>
              <span className="text-center text-gold">MortgageCore AI</span>
            </div>
            {comparison.map((row, i) => (
              <div
                key={row.metric}
                className={`grid grid-cols-3 px-4 py-3.5 text-sm border-b border-steel/20 last:border-0 ${
                  i % 2 === 0 ? "bg-transparent" : "bg-navy/20"
                }`}
              >
                <span className="text-off-white/70 font-medium text-xs">{row.metric}</span>
                <span className="text-center text-red-400/80 text-xs flex items-center justify-center gap-1">
                  <X className="w-3 h-3" />{row.legacy}
                </span>
                <span className="text-center text-emerald-400 text-xs font-semibold flex items-center justify-center gap-1">
                  <Check className="w-3 h-3" />{row.ai}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
