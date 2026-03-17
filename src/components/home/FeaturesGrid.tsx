"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import {
  Users, FileText, Tag, Cpu, CreditCard, Scale, ShieldCheck,
  FolderOpen, Home, TrendingUp, Handshake, BarChart3, ArrowRight
} from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";

const modules = [
  {
    num: "01", icon: Users, title: "Lead Management & CRM",
    desc: "AI lead scoring, Insellerate integration, TCPA-compliant nurture workflows, and pre-qualification AI that scores leads 0–100 before LO contact.",
    href: "/platform#lead-management",
  },
  {
    num: "02", icon: FileText, title: "Loan Application & 1003",
    desc: "Digital URLA 2020 with AI document intake, OCR field population, co-borrower workflow, and automatic LendingQB record creation on submission.",
    href: "/platform#application",
  },
  {
    num: "03", icon: Tag, title: "Product & Pricing Engine",
    desc: "Real-time LoanPass integration with rate quotes in under 3 seconds. LLPA auto-calculation, multi-investor best-execution, and rate lock management.",
    href: "/platform#pricing",
  },
  {
    num: "04", icon: Cpu, title: "AI Processor Engine",
    desc: "The heart of MortgageCore AI. Autonomously manages condition ordering, document chasing, vendor coordination, and clears 60–75% of conditions without humans.",
    href: "/platform#ai-processor",
    featured: true,
  },
  {
    num: "05", icon: CreditCard, title: "Credit & AUS",
    desc: "Automated DU/LPA/GUS submission, tri-merge credit ordering, AUS findings parsing, and credit improvement recommendations for failed AUS scenarios.",
    href: "/platform#aus",
  },
  {
    num: "06", icon: Scale, title: "Underwriting Support",
    desc: "AI underwriter briefings, risk layer analysis with SHAP explainability, exception workflows, ECOA adverse action automation, and full audit trail.",
    href: "/platform#underwriting",
  },
  {
    num: "07", icon: ShieldCheck, title: "Compliance Automation",
    desc: "Real-time TRID engine, HMDA LAR auto-population, ATR/QM analysis at every stage, OFAC checks, fair lending monitoring, and HOEPA testing.",
    href: "/platform#compliance",
  },
  {
    num: "08", icon: FolderOpen, title: "Document Vault",
    desc: "SOC 2 Type II compliant repository with AI document classification at ≥93% accuracy, OCR extraction, eNote support, and automated retention schedules.",
    href: "/platform#documents",
  },
  {
    num: "09", icon: Home, title: "Closing & Funding",
    desc: "CTC issuance, TRID-compliant closing disclosure generation, hybrid eClosing and RON support, warehouse line management, and MERS auto-registration.",
    href: "/platform#closing",
  },
  {
    num: "10", icon: TrendingUp, title: "Secondary Market",
    desc: "ULDD Phase 3 compliance, automated FNMA/FHLMC delivery, best-execution analytics, MBS hedge advisor, and GSE delivery exception prediction.",
    href: "/platform#secondary",
  },
  {
    num: "11", icon: Handshake, title: "Servicing Handoff & QC",
    desc: "AI-driven post-closing QC risk stratification, MERS TBR/TSR automation, trailing document tracking, and repurchase demand management.",
    href: "/platform#servicing",
  },
  {
    num: "12", icon: BarChart3, title: "Reporting & Analytics",
    desc: "Real-time executive dashboards, LO performance metrics, compliance report suite, secondary market analytics, and AI-generated weekly narrative insights.",
    href: "/platform#analytics",
  },
];

export function FeaturesGrid() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-[#080D1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Platform Modules"
          title="12 Modules. Zero Gaps."
          subtitle="Every stage of the mortgage lifecycle — from top of funnel to secondary market — covered by an independently deployable microservice with its own AI component."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {modules.map((mod, i) => (
            <motion.div
              key={mod.num}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <Link
                href={mod.href}
                className={`group flex flex-col h-full bg-[#0D1F3C] rounded-2xl border p-6 transition-all hover:-translate-y-1 hover:shadow-xl hover:border-gold/40 ${
                  mod.featured ? "border-gold/30 ring-1 ring-gold/20" : "border-white/10"
                }`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                    <mod.icon className="w-5 h-5 text-gold" />
                  </div>
                  <div className="text-4xl font-sora font-bold text-white/10 leading-none">{mod.num}</div>
                </div>
                <h3 className="font-sora font-bold text-white mb-2 group-hover:text-gold transition-colors">
                  {mod.title}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed flex-1">{mod.desc}</p>
                <div className="flex items-center gap-1 mt-4 text-xs font-semibold text-[#C8A951] opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
