"use client";
import { useState } from "react";
import { Monitor, ExternalLink } from "lucide-react";
import { ScheduleDemoModal } from "@/components/shared/ScheduleDemoModal";

export default function DemoPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0A0F1E] flex flex-col pt-16">
      {/* Top bar */}
      <div className="bg-[#0D1F3C] border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Monitor className="w-5 h-5 text-gold" />
          <div>
            <h1 className="font-sora font-semibold text-white text-lg leading-tight">
              MortgageCore AI — Platform Demo
            </h1>
            <p className="text-muted text-sm">Interactive platform walkthrough</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Open full screen
          </a>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-gold text-navy font-semibold px-5 py-2.5 rounded-lg text-sm hover:bg-gold-lt transition-colors"
          >
            Schedule Live Demo
          </button>
        </div>
      </div>

      {/* Browser chrome frame */}
      <div className="flex-1 flex flex-col p-4 md:p-6">
        <div className="flex-1 rounded-xl overflow-hidden border border-white/10 shadow-2xl flex flex-col">
          {/* Browser chrome top bar */}
          <div className="bg-[#1a1a2e] border-b border-white/10 px-4 py-3 flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <div className="flex-1 bg-[#0D1F3C] rounded-md px-3 py-1.5 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-white/50 text-xs font-mono">app.mortgagecoreai.com/dashboard</span>
            </div>
          </div>
          {/* iframe */}
          <div className="flex-1 bg-[#0D1F3C]">
            <iframe
              src="/demo.html"
              className="w-full h-full min-h-[700px]"
              sandbox="allow-scripts allow-same-origin"
              title="MortgageCore AI Platform Demo"
            />
          </div>
        </div>
      </div>

      <ScheduleDemoModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
