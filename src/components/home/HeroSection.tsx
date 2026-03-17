"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Zap, DollarSign, Bot, TrendingUp, CheckCircle, ArrowRight, Play } from "lucide-react";
import { ScheduleDemoModal } from "@/components/shared/ScheduleDemoModal";
import Link from "next/link";

const stats = [
  { icon: Zap, label: "17-Day Avg Close", color: "text-gold" },
  { icon: DollarSign, label: "$3,240 Cost/Loan", color: "text-emerald-400" },
  { icon: Bot, label: "68% AI Condition Clear", color: "text-blue-400" },
  { icon: TrendingUp, label: "74% Pull-Through", color: "text-purple-400" },
  { icon: CheckCircle, label: "0 TRID Violations", color: "text-green-400" },
];

export function HeroSection() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <>
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-blue-deep to-navy" />
        <div className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(ellipse at 20% 50%, #2E5F9A33 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, #C8A95122 0%, transparent 60%)`,
          }}
        />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(#2E5F9A 1px, transparent 1px), linear-gradient(90deg, #2E5F9A 1px, transparent 1px)`,
            backgroundSize: `60px 60px`,
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-gold/10 border border-gold/30 rounded-full text-xs font-bold text-gold uppercase tracking-widest mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              AI-Powered Mortgage Platform
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-sora font-bold text-5xl lg:text-6xl xl:text-7xl leading-[1.05] text-off-white mb-6"
            >
              The AI Brain{" "}
              <span className="text-gradient-gold">Behind Every</span>{" "}
              Mortgage
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-off-white/60 leading-relaxed mb-8 max-w-xl"
            >
              MortgageCore AI replaces legacy loan origination with a single intelligent platform — from lead capture to secondary market delivery. Powered by GPT-4o. Built for banking partners.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              <button
                onClick={() => setDemoOpen(true)}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-gold text-navy font-bold rounded-xl hover:bg-gold-lt transition-all hover:scale-105 shadow-lg shadow-gold/20"
              >
                Schedule a Demo
                <ArrowRight className="w-4 h-4" />
              </button>
              <Link
                href="/platform"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-steel/50 text-off-white/80 rounded-xl hover:border-gold/50 hover:text-gold transition-all"
              >
                <Play className="w-4 h-4" />
                Explore the Platform
              </Link>
            </motion.div>

            {/* Stats pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-2"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
                  className="flex items-center gap-2 px-3 py-2 bg-blue-deep/80 border border-steel/30 rounded-full backdrop-blur-sm"
                >
                  <stat.icon className={`w-3.5 h-3.5 ${stat.color}`} />
                  <span className="text-xs font-semibold text-off-white/80">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right: Dashboard mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Glow */}
              <div className="absolute -inset-4 bg-gold/10 rounded-3xl blur-2xl" />
              {/* Browser chrome */}
              <div className="relative bg-blue-deep border border-steel/40 rounded-2xl shadow-2xl overflow-hidden">
                {/* Fake browser bar */}
                <div className="flex items-center gap-2 px-4 py-3 bg-navy/80 border-b border-steel/30">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/70" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                    <div className="w-3 h-3 rounded-full bg-green-500/70" />
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="bg-navy/60 rounded-md px-3 py-1 text-xs text-muted font-mono">
                      app.mortgagecoreai.com/pipeline
                    </div>
                  </div>
                </div>

                {/* Dashboard preview */}
                <div className="p-5 space-y-3">
                  {/* KPI row */}
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { label: "Active Loans", val: "14", sub: "7 processing" },
                      { label: "Avg Days", val: "19", sub: "↓ 6 vs legacy" },
                      { label: "AI Cleared", val: "68%", sub: "Auto-cleared" },
                      { label: "Volume", val: "$8.4M", sub: "UPB this month" },
                    ].map((k) => (
                      <div key={k.label} className="bg-navy/60 rounded-lg p-2.5">
                        <div className="text-xs text-muted mb-1">{k.label}</div>
                        <div className="text-lg font-sora font-bold text-off-white">{k.val}</div>
                        <div className="text-xs text-emerald-400">{k.sub}</div>
                      </div>
                    ))}
                  </div>

                  {/* Loan rows */}
                  <div className="bg-navy/40 rounded-lg overflow-hidden">
                    <div className="px-3 py-2 border-b border-steel/20 text-xs font-bold text-muted uppercase tracking-wider flex gap-3">
                      <span className="w-24">Loan #</span>
                      <span className="flex-1">Borrower</span>
                      <span className="w-20">Amount</span>
                      <span className="w-20">Stage</span>
                      <span className="w-12 text-right">Health</span>
                    </div>
                    {[
                      { id: "MC-0847", name: "Martinez, C.", amt: "$425K", stage: "Processing", health: 72, color: "bg-emerald-500" },
                      { id: "MC-0851", name: "Chen, M.", amt: "$618K", stage: "Underwriting", health: 85, color: "bg-emerald-500" },
                      { id: "MC-0839", name: "Johnson, M.", amt: "$295K", stage: "CTC", health: 96, color: "bg-teal-500" },
                      { id: "MC-0853", name: "Thompson, D.", amt: "$510K", stage: "Processing", health: 44, color: "bg-amber-500" },
                    ].map((loan) => (
                      <div key={loan.id} className="px-3 py-2.5 flex items-center gap-3 border-b border-steel/10 hover:bg-steel/10">
                        <span className="w-24 text-xs text-blue-400 font-mono">{loan.id}</span>
                        <span className="flex-1 text-xs text-off-white/80">{loan.name}</span>
                        <span className="w-20 text-xs text-off-white/60">{loan.amt}</span>
                        <span className="w-20">
                          <span className="text-xs px-2 py-0.5 rounded-full bg-blue-deep text-blue-300">{loan.stage}</span>
                        </span>
                        <div className="w-12 flex items-center gap-1">
                          <div className="flex-1 h-1.5 bg-steel/30 rounded-full overflow-hidden">
                            <div className={`h-full ${loan.color} rounded-full`} style={{ width: `${loan.health}%` }} />
                          </div>
                          <span className="text-xs text-off-white/60">{loan.health}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* AI briefing */}
                  <div className="bg-gradient-to-r from-navy to-blue-deep border border-gold/20 rounded-lg p-3">
                    <div className="text-xs font-bold text-gold mb-1.5 tracking-wider">⚡ AI PROCESSOR BRIEFING</div>
                    <p className="text-xs text-off-white/70 leading-relaxed">
                      11 of 16 conditions auto-cleared on MC-0847. Estimated clear-to-close: <span className="text-gold font-semibold">4 business days</span>. No fraud indicators detected.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <ScheduleDemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </>
  );
}
