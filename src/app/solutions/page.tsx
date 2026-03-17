"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  CreditCard,
  Briefcase,
  Check,
  ArrowRight,
  TrendingDown,
  Clock,
  Shield,
} from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ScheduleDemoModal } from "@/components/shared/ScheduleDemoModal";

const solutions = [
  {
    id: "banks",
    icon: Building2,
    title: "Community Banks",
    subtitle: "$250M – $5B Annual Origination",
    desc: "Community banks face the same regulatory complexity as the largest lenders but with a fraction of the staff. MortgageCore AI levels the playing field with enterprise-grade AI at community bank economics.",
    benefits: [
      "Deploy full LOS + AI stack in 30 days vs. 12+ months for legacy alternatives",
      "Reduce processor headcount from 3–5 FTEs per 100 loans to 0.5–1 FTE",
      "Automated HMDA LAR, CRA reporting, and fair lending monitoring",
      "White-label under your bank brand with full data sovereignty",
      "Integrated LendingQB + LoanPass + Insellerate — no custom build required",
      "SOC 2 Type II + GLBA Safeguards Rule compliance out of the box",
    ],
    stats: [
      { label: "Cost Reduction", value: "68%", sub: "vs. legacy ops" },
      { label: "Days to Close", value: "17", sub: "avg vs. 42 industry" },
      { label: "Deployment", value: "30 days", sub: "to first live loan" },
    ],
    icp: "10–100 LOs | LendingQB or similar LOS | $250M–$5B origination",
  },
  {
    id: "credit-unions",
    icon: CreditCard,
    title: "Credit Unions",
    subtitle: "CUSO-Ready Architecture",
    desc: "Credit unions prioritize member experience and cost efficiency. MortgageCore AI's AI Loan Agent delivers 24/7 member engagement while dramatically reducing origination costs — improving both mission alignment and financial performance.",
    benefits: [
      "AI Loan Agent handles member pre-qualification 24/7 without staff involvement",
      "CUSO-compatible multi-tenant architecture for shared services",
      "Member-facing portal with white-label branding and mobile-first UX",
      "Competitive rate pricing via LoanPass with best-execution analytics",
      "Automated NCUA-compliant adverse action notices and fair lending reports",
      "6-month ROI guarantee — measurable cost savings within first 180 days",
    ],
    stats: [
      { label: "Member NPS", value: "72+", sub: "vs. industry avg 42" },
      { label: "Auto-Clear Rate", value: "68%", sub: "AI condition clearing" },
      { label: "Staff Ratio", value: "1:190", sub: "loans per processor" },
    ],
    icp: "5–50 LOs | $50M–$1B origination | CU or CUSO structure",
  },
  {
    id: "imbs",
    icon: Briefcase,
    title: "Independent Mortgage Bankers",
    subtitle: "Scale Without Headcount",
    desc: "IMBs live and die by their cost structure. MortgageCore AI gives IMBs the operational leverage to compete with the mega-lenders — without the legacy system spend or processor army.",
    benefits: [
      "Reduce cost per loan from $10,500 to $2,800–$4,200 — immediately impacting margin",
      "Secondary Market AI maximizes SRP and identifies optimal lock timing windows",
      "GSE delivery in 24–48 hours vs. 5–10 business days with legacy systems",
      "Multi-branch, multi-state support with state-specific compliance automation",
      "Non-QM AI Decision Engine for proprietary product expansion",
      "API-first architecture integrates into your existing tech stack if needed",
    ],
    stats: [
      { label: "Gain on Sale", value: "+22bps", sub: "SRP optimization" },
      { label: "GSE Delivery", value: "24–48h", sub: "automated ULDD" },
      { label: "Pipeline Cost", value: "$3,240", sub: "per funded loan" },
    ],
    icp: "15–200 LOs | $250M–$3B origination | FNMA/FHLMC seller-servicer",
  },
];

const whyItems = [
  {
    icon: TrendingDown,
    title: "68% Cost Reduction",
    desc: "From $10,500 to $2,800–$4,200 per funded loan. Processor ratio improves from 1:50 to 1:200+.",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
  },
  {
    icon: Clock,
    title: "17-Day Average Close",
    desc: "From 35–45 days to 12–18 days. AI automation eliminates the bottlenecks that cause delays.",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  },
  {
    icon: Shield,
    title: "Zero TRID Violations",
    desc: "Real-time compliance enforcement at every workflow stage. Automated LE/CD delivery. Immutable audit trail.",
    color: "text-gold",
    bg: "bg-gold/10",
  },
];

export default function SolutionsPage() {
  const [demoOpen, setDemoOpen] = useState(false);
  const [active, setActive] = useState("banks");
  const sol = solutions.find((s) => s.id === active) || solutions[0];

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Solutions"
            title="Built for Banking Partners. Every Type."
            subtitle="Whether you're a community bank, credit union, or IMB — MortgageCore AI adapts to your institution's scale, regulatory requirements, and growth goals."
          />
        </div>
      </section>

      {/* Solution detail */}
      <section className="py-16 bg-[#080D1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Solution tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {solutions.map((s) => (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all ${
                  active === s.id
                    ? "bg-navy text-gold border-2 border-gold/30"
                    : "bg-[#0D1F3C] border border-white/10 text-white/60 hover:border-gold/30 hover:text-white"
                }`}
              >
                <s.icon className="w-4 h-4" />
                {s.title}
              </button>
            ))}
          </div>

          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid lg:grid-cols-5 gap-10"
          >
            {/* Left: details */}
            <div className="lg:col-span-3">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                  <sol.icon className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h2 className="font-sora font-bold text-2xl text-white">{sol.title}</h2>
                  <div className="text-sm text-white/50">{sol.subtitle}</div>
                </div>
              </div>
              <p className="text-white/60 leading-relaxed mb-8">{sol.desc}</p>

              <div className="space-y-3 mb-8">
                {sol.benefits.map((b) => (
                  <div
                    key={b}
                    className="flex items-start gap-3 p-3 bg-[#0D1F3C] border border-white/10 rounded-lg"
                  >
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white/80">{b}</span>
                  </div>
                ))}
              </div>

              <div className="text-xs text-white/40 bg-[#0D1F3C] border border-white/10 rounded-lg px-4 py-2.5">
                <strong>Target ICP:</strong> {sol.icp}
              </div>
            </div>

            {/* Right: stats + CTA */}
            <div className="lg:col-span-2 space-y-5">
              {sol.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-[#0D1F3C] border border-white/10 rounded-2xl p-6 text-center"
                >
                  <div className="text-xs font-bold text-white/40 uppercase tracking-widest mb-2">
                    {stat.label}
                  </div>
                  <div className="font-sora font-bold text-5xl text-gold mb-1">{stat.value}</div>
                  <div className="text-sm text-white/50">{stat.sub}</div>
                </div>
              ))}

              <div className="bg-navy border border-steel/30 rounded-2xl p-6">
                <div className="text-sm font-semibold text-off-white mb-4">Ready to get started?</div>
                <button
                  onClick={() => setDemoOpen(true)}
                  className="w-full py-3 bg-gold text-navy font-bold rounded-xl hover:bg-gold-lt transition-colors text-sm flex items-center justify-center gap-2"
                >
                  Schedule a Demo <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why MortgageCore */}
      <section className="py-16 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Why MortgageCore AI"
            title="The Complete Picture"
            subtitle="Compared to building your own or buying legacy tools."
          />
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {whyItems.map((item) => (
              <div
                key={item.title}
                className="bg-blue-deep border border-steel/30 rounded-2xl p-6"
              >
                <div
                  className={`w-11 h-11 rounded-xl ${item.bg} flex items-center justify-center mb-4`}
                >
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <h3 className="font-sora font-bold text-off-white mb-2">{item.title}</h3>
                <p className="text-sm text-off-white/60 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ScheduleDemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </>
  );
}
