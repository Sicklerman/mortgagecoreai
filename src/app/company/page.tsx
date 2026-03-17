"use client";

import { useState } from "react";
import { Brain, Target, Users, Zap, ArrowRight, Globe, Shield, TrendingUp } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ScheduleDemoModal } from "@/components/shared/ScheduleDemoModal";

const values = [
  {
    icon: Brain,
    title: "AI at the Core",
    desc: "Artificial intelligence embedded in every workflow stage — not bolted on as an afterthought. Every feature starts with the question: how does AI make this better?",
  },
  {
    icon: Shield,
    title: "Regulatory-First",
    desc: "TRID, HMDA, ATR/QM, RESPA, Reg B, and GSE guidelines baked into workflow. Compliance is not post-hoc audited — it's enforced in real time at every step.",
  },
  {
    icon: Users,
    title: "Banking Partner Centric",
    desc: "Multi-tenant by design. Each banking partner maintains data isolation, branding, and rule customization. Your data is yours — always.",
  },
  {
    icon: Globe,
    title: "Platform Interoperability",
    desc: "MISMO 3.4/ULDD, FNMA/FHLMC integrations, DU/LP direct submission, MERS, flood, title, and appraisal vendor mesh — all via a unified API gateway.",
  },
  {
    icon: TrendingUp,
    title: "Continuous Learning",
    desc: "AI models retrain on production outcomes — loan performance, underwriter overrides, secondary market bids — to continuously improve accuracy and automation rates.",
  },
  {
    icon: Zap,
    title: "Human-in-the-Loop",
    desc: "AI augments human decision-makers. All AI recommendations surfaced with explainability scores and override capability. Humans always have final authority.",
  },
];

type RoadmapStatus = "done" | "active" | "upcoming";

interface RoadmapPhase {
  quarter: string;
  phase: string;
  status: RoadmapStatus;
  items: string[];
}

const roadmap: RoadmapPhase[] = [
  {
    quarter: "Q1–Q2 2025",
    phase: "Foundation",
    status: "done",
    items: [
      "Core LOS architecture",
      "LendingQB API integration",
      "LoanPass pricing engine live",
    ],
  },
  {
    quarter: "Q3–Q4 2025",
    phase: "AI Core",
    status: "done",
    items: [
      "AI Processor Engine v1",
      "Document Intelligence live",
      "Compliance Engine v1",
      "Beta with Anchor Partner 1",
    ],
  },
  {
    quarter: "Q1–Q2 2026",
    phase: "Ecosystem",
    status: "active",
    items: [
      "Insellerate CRM sync",
      "Full AUS automation",
      "eClosing + RON",
      "Secondary Market module",
    ],
  },
  {
    quarter: "Q3–Q4 2026",
    phase: "Scale",
    status: "upcoming",
    items: [
      "5 banking partners live",
      "$2.1M ARR",
      "Series A preparation",
      "Non-QM AI engine",
    ],
  },
];

const budgetAllocations = [
  { pct: "52%", label: "Engineering & Product" },
  { pct: "18%", label: "Sales & Go-to-Market" },
  { pct: "15%", label: "Infrastructure & Security" },
  { pct: "15%", label: "G&A / Legal & Compliance" },
];

const statusStyles: Record<RoadmapStatus, { card: string; title: string; badge: string; dot: string; label: string }> = {
  done: {
    card: "bg-emerald-500/5 border-emerald-500/30",
    title: "text-emerald-600",
    badge: "bg-emerald-100 text-emerald-700",
    dot: "bg-emerald-500",
    label: "Complete",
  },
  active: {
    card: "bg-gold/5 border-gold/30",
    title: "text-[#C8A951]",
    badge: "bg-yellow-100 text-yellow-700",
    dot: "bg-yellow-500",
    label: "In Progress",
  },
  upcoming: {
    card: "bg-[#0D1F3C] border-white/10",
    title: "text-white/70",
    badge: "bg-white/10 text-white/50",
    dot: "bg-white/30",
    label: "Upcoming",
  },
};

export default function CompanyPage() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-20 bg-navy relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(ellipse at 30% 50%, #C8A95133 0%, transparent 60%)`,
          }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gold/20 flex items-center justify-center mx-auto mb-6">
            <Brain className="w-9 h-9 text-gold" />
          </div>
          <h1 className="font-sora font-bold text-4xl md:text-5xl text-off-white mb-6 leading-tight">
            We&apos;re Rebuilding Mortgage Origination{" "}
            <span className="text-gold">From the Ground Up</span>
          </h1>
          <p className="text-lg text-off-white/60 leading-relaxed mb-8 max-w-2xl mx-auto">
            MortgageCore AI was founded with a single conviction: mortgage origination is a
            technology problem masquerading as a staffing problem. With AI, you can originate more
            loans, at lower cost, with superior borrower experience — and zero compromise on
            compliance.
          </p>
          <button
            onClick={() => setDemoOpen(true)}
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-gold text-navy font-bold rounded-xl hover:bg-gold-lt transition-colors"
          >
            See the Platform <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="py-16 bg-blue-deep/30 border-y border-steel/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-xs font-bold text-gold uppercase tracking-widest mb-4">
            Our Vision
          </div>
          <blockquote className="font-sora font-bold text-xl md:text-2xl lg:text-3xl text-off-white leading-relaxed">
            &ldquo;To build the most intelligent, compliant, and operationally efficient mortgage
            origination platform in the industry — enabling banking partners to originate more loans,
            at lower cost, with superior borrower experience and zero compromise on regulatory
            compliance.&rdquo;
          </blockquote>
        </div>
      </section>

      {/* Values / Design Principles */}
      <section className="py-20 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Design Principles"
            title="How We Build"
            subtitle="Six principles guide every product decision at MortgageCore AI."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {values.map((v) => (
              <div
                key={v.title}
                className="bg-blue-deep border border-steel/30 rounded-2xl p-6 hover:border-gold/30 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center mb-4">
                  <v.icon className="w-5 h-5 text-gold" />
                </div>
                <h3 className="font-sora font-bold text-off-white mb-2">{v.title}</h3>
                <p className="text-sm text-off-white/60 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-20 bg-[#080D1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Traction & Roadmap"
            title="Where We Are. Where We're Going."
            subtitle="LOIs signed with 2 banking partners. LendingQB & LoanPass partnership discussions underway. Full MVP targeted Q3 2026."
          />
          <div className="grid md:grid-cols-4 gap-6 mt-12">
            {roadmap.map((phase) => {
              const styles = statusStyles[phase.status];
              return (
                <div
                  key={phase.quarter}
                  className={`rounded-2xl p-6 border ${styles.card}`}
                >
                  <div className="text-xs font-bold uppercase tracking-widest mb-1 text-white/40">
                    {phase.quarter}
                  </div>
                  <div className={`font-sora font-bold text-lg mb-2 ${styles.title}`}>
                    {phase.phase}
                  </div>
                  <span
                    className={`text-xs font-semibold mb-4 px-2 py-0.5 rounded-full inline-block ${styles.badge}`}
                  >
                    {phase.status === "done" ? "✓ " : ""}
                    {styles.label}
                  </span>
                  <ul className="space-y-2 mt-3">
                    {phase.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs text-white/50">
                        <span
                          className={`w-1.5 h-1.5 rounded-full mt-1 flex-shrink-0 ${styles.dot}`}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Investment */}
      <section className="py-16 bg-navy border-t border-steel/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-xs font-bold text-gold uppercase tracking-widest mb-4">
            Investment
          </div>
          <h2 className="font-sora font-bold text-3xl text-off-white mb-4">
            $6.5M Seed Round
          </h2>
          <p className="text-off-white/60 mb-8">
            18 months runway · MVP + 5 anchor partners · Series A trigger: $8M ARR
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {budgetAllocations.map((item) => (
              <div key={item.label} className="bg-blue-deep border border-steel/30 rounded-xl p-4">
                <div className="font-sora font-bold text-2xl text-gold mb-1">{item.pct}</div>
                <div className="text-xs text-muted">{item.label}</div>
              </div>
            ))}
          </div>
          <a
            href="mailto:invest@mortgagecoreai.com"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-navy font-bold rounded-xl hover:bg-gold-lt transition-colors text-sm"
          >
            Investor Inquiries <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      <ScheduleDemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </>
  );
}
