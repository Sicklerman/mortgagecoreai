"use client";

import { useState } from "react";
import { Check, ArrowRight, Zap } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ScheduleDemoModal } from "@/components/shared/ScheduleDemoModal";

const plans = [
  {
    name: "Foundation",
    price: "$15,000",
    period: "/month",
    desc: "Core LOS + AI processing for community banks and credit unions getting started with AI origination.",
    highlight: false,
    badge: null as string | null,
    features: [
      "Core LOS engine (LendingQB integration)",
      "Digital 1003 / URLA 2020",
      "LoanPass pricing engine",
      "Document Vault (SOC 2 Type II)",
      "Basic compliance engine (TRID, HMDA)",
      "Up to 50 active loans/month",
      "Standard AI condition clearing",
      "Email + portal support",
      "30-day onboarding SLA",
    ],
    cta: "Get Started",
    perLoan: "$85–$100",
  },
  {
    name: "AI Core",
    price: "$30,000",
    period: "/month",
    desc: "Full AI Processor Engine, Document Intelligence, AUS automation, and Compliance Sentinel for high-volume lenders.",
    highlight: true,
    badge: "Most Popular" as string | null,
    features: [
      "Everything in Foundation",
      "AI Processor Engine (60–75% auto-clear)",
      "Document Intelligence (≥93% accuracy)",
      "AUS automation (DU/LPA/GUS)",
      "AI Underwriter Briefings",
      "Fraud Detection AI (300+ indicators)",
      "Income Analysis AI (91% accuracy)",
      "VOE/VVOE automation (Truework, Argyle)",
      "Up to 300 active loans/month",
      "Insellerate CRM bi-directional sync",
      "Dedicated customer success manager",
    ],
    cta: "Schedule a Demo",
    perLoan: "$100–$130",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "Full platform with Secondary Market AI, white-label deployment, multi-branch support, and unlimited volume.",
    highlight: false,
    badge: null as string | null,
    features: [
      "Everything in AI Core",
      "Secondary Market AI (hedge advisor, SRP optimizer)",
      "ULDD delivery (FNMA/FHLMC/GNMA)",
      "eClosing + RON integration",
      "Non-QM AI Decision Engine",
      "White-label multi-tenant deployment",
      "Multi-branch / Multi-AOR support",
      "Unlimited loan volume",
      "API access + developer sandbox",
      "Fair Lending Analytics dashboard",
      "Custom SFTP / data integrations",
      "24/7 priority support + SLA",
    ],
    cta: "Talk to Sales",
    perLoan: "$120–$215",
  },
];

const addons = [
  {
    name: "AI Processing Add-On",
    price: "$35–$65 /loan",
    desc: "Full AI Processor Engine, Document Intelligence, Compliance Sentinel",
  },
  {
    name: "Secondary Market AI",
    price: "$0.10–$0.20 /$1K UPB",
    desc: "Hedge advisor, SRP optimizer, GSE delivery exception predictor",
  },
  {
    name: "Onboarding & Professional Services",
    price: "$50K–$150K",
    desc: "One-time: implementation, data migration, staff training, custom config",
  },
];

const unitEconomics = [
  { label: "Break-Even", value: "~40K loans", sub: "on platform" },
  { label: "Target Partner", value: "$500M–$5B", sub: "annual origination" },
  { label: "LTV/CAC Target", value: "8:1", sub: "lifetime value ratio" },
  { label: "Gross Margin", value: "72–78%", sub: "at steady-state SaaS" },
];

export default function PricingPage() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Pricing"
            title="Transparent Pricing. Measurable ROI."
            subtitle="Every plan includes all core integrations (LendingQB, LoanPass, GSE) via the MortgageCore AI API Gateway. No custom build required."
          />
          <div className="flex justify-center mt-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/20 rounded-full text-sm text-gold">
              <Zap className="w-4 h-4 flex-shrink-0" />
              Combined blended revenue: $120–$215 per closed loan · Target gross margin: 72–78%
            </div>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="py-16 bg-[#080D1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-8 flex flex-col ${
                  plan.highlight
                    ? "bg-navy border-2 border-gold text-off-white shadow-2xl shadow-gold/10"
                    : "bg-[#0D1F3C] border border-white/10 text-white"
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gold text-navy text-xs font-bold rounded-full whitespace-nowrap">
                    {plan.badge}
                  </div>
                )}

                <div className="mb-6">
                  <h3
                    className={`font-sora font-bold text-xl mb-2 ${
                      plan.highlight ? "text-gold" : "text-white"
                    }`}
                  >
                    {plan.name}
                  </h3>
                  <div className="flex items-end gap-1 mb-3">
                    <span
                      className={`font-sora font-bold text-4xl ${
                        plan.highlight ? "text-off-white" : "text-white"
                      }`}
                    >
                      {plan.price}
                    </span>
                    <span
                      className={`text-sm pb-1 ${
                        plan.highlight ? "text-off-white/50" : "text-muted"
                      }`}
                    >
                      {plan.period}
                    </span>
                  </div>
                  <p
                    className={`text-sm leading-relaxed ${
                      plan.highlight ? "text-off-white/60" : "text-muted"
                    }`}
                  >
                    {plan.desc}
                  </p>
                  <div
                    className={`mt-3 text-xs ${
                      plan.highlight ? "text-gold/60" : "text-muted"
                    }`}
                  >
                    ~{plan.perLoan} per closed loan
                  </div>
                </div>

                <ul className="space-y-2.5 flex-1 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check
                        className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                          plan.highlight ? "text-gold" : "text-emerald-500"
                        }`}
                      />
                      <span
                        className={`text-sm ${
                          plan.highlight ? "text-off-white/80" : "text-white/80"
                        }`}
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => setDemoOpen(true)}
                  className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                    plan.highlight
                      ? "bg-gold text-navy hover:bg-gold-lt"
                      : "bg-navy text-off-white hover:bg-blue-deep border border-navy"
                  }`}
                >
                  {plan.cta} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Add-ons */}
          <div className="mt-16">
            <h2 className="font-sora font-bold text-2xl text-dark-text mb-6 text-center">
              Add-Ons &amp; Professional Services
            </h2>
            <div className="grid md:grid-cols-3 gap-5">
              {addons.map((addon) => (
                <div
                  key={addon.name}
                  className="bg-[#0D1F3C] border border-white/10 rounded-2xl p-6"
                >
                  <div className="font-sora font-bold text-dark-text mb-1">{addon.name}</div>
                  <div className="text-gold font-bold text-lg mb-2">{addon.price}</div>
                  <p className="text-sm text-muted">{addon.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Unit economics */}
          <div className="mt-16 bg-navy border border-steel/30 rounded-2xl p-8">
            <h2 className="font-sora font-bold text-2xl text-off-white mb-8 text-center">
              Unit Economics at Scale
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {unitEconomics.map((stat) => (
                <div key={stat.label}>
                  <div className="text-xs font-bold text-muted uppercase tracking-widest mb-2">
                    {stat.label}
                  </div>
                  <div className="font-sora font-bold text-3xl text-gold mb-1">{stat.value}</div>
                  <div className="text-xs text-off-white/40">{stat.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ScheduleDemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </>
  );
}
