"use client";
import Link from "next/link";
import { BookOpen, Code2, Package, Zap, Terminal, ArrowRight, Lock } from "lucide-react";

export default function DevelopersPage() {
  // Hero section: dark navy bg, "Build on MortgageCore AI" headline, subtitle about REST API + webhooks + SDKs, two CTAs (View API Reference, Browse SDKs)
  // Base URL section: dark card with monospace code block showing:
  //   Base URL: https://api.mortgagecoreai.com/v1
  // Auth section: code block showing Bearer token auth:
  //   Authorization: Bearer mk_live_xxxxxxxxxxxxxxxxxxxx
  // 4 quick-start cards linking to sub-pages:
  //   1. API Reference (BookOpen) - link to /developers/api-reference
  //   2. Integration Guides (Code2) - link to /developers/guides
  //   3. SDKs & Libraries (Package) - link to /developers/sdks
  //   4. Changelog (Zap) - link to /developers/changelog (external-style, just link)
  // Featured endpoints section: 3 preview cards for key endpoints
  //   - POST /v1/loans - Submit new loan application
  //   - POST /v1/aus/submit - Run AUS decision
  //   - POST /v1/ai/income-analysis - AI income analysis
  // Each shows method badge, path, short description, "View docs →" link
  // Bottom CTA: "Need help? Contact our developer support"

  return (
    <div className="min-h-screen bg-[#0A0F1E]">
      {/* Hero */}
      <section className="bg-[#0D1F3C] pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A5F]/40 to-transparent" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#C8A951]/10 border border-[#C8A951]/30 rounded-full px-4 py-1.5 mb-6">
            <Terminal className="w-4 h-4 text-[#C8A951]" />
            <span className="text-[#C8A951] text-sm font-medium">Developer Documentation</span>
          </div>
          <h1 className="font-sora text-5xl md:text-6xl font-bold text-white mb-6">
            Build on <span className="text-[#C8A951]">MortgageCore AI</span>
          </h1>
          <p className="text-white/70 text-xl max-w-2xl mx-auto mb-8">
            Integrate the full AI-powered mortgage origination stack into your platform. REST API, webhooks, real-time events, and native SDKs for Node.js, Python, and Java.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/developers/api-reference" className="bg-[#C8A951] text-[#0D1F3C] font-semibold px-6 py-3 rounded-lg hover:bg-[#E8C96A] transition-colors">
              View API Reference
            </Link>
            <Link href="/developers/sdks" className="border border-white/30 text-white px-6 py-3 rounded-lg hover:border-white/60 transition-colors">
              Browse SDKs
            </Link>
          </div>
        </div>
      </section>

      {/* Base URL + Auth */}
      <section className="py-16 px-6 bg-[#080D1A]">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-[#0D1F3C] rounded-xl p-6 border border-white/10">
            <h3 className="font-sora text-white font-semibold text-lg mb-4 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              Base URL
            </h3>
            <div className="bg-[#080D1A] rounded-lg p-4 font-mono text-sm">
              <span className="text-white/40">// Production</span>
              <br />
              <span className="text-[#C8A951]">https://api.mortgagecoreai.com/v1</span>
              <br /><br />
              <span className="text-white/40">// Sandbox</span>
              <br />
              <span className="text-[#2E5F9A]">https://sandbox.mortgagecoreai.com/v1</span>
            </div>
          </div>
          <div className="bg-[#0D1F3C] rounded-xl p-6 border border-white/10">
            <h3 className="font-sora text-white font-semibold text-lg mb-4 flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#C8A951]" />
              Authentication
            </h3>
            <div className="bg-[#080D1A] rounded-lg p-4 font-mono text-sm">
              <span className="text-white/40">// Bearer token auth</span>
              <br />
              <span className="text-white/60">Authorization: </span>
              <span className="text-emerald-400">Bearer</span>
              <span className="text-white"> mk_live_xxxx...</span>
            </div>
            <p className="text-white/50 text-xs mt-3">Generate API keys in your dashboard under Settings → API Keys</p>
          </div>
        </div>
      </section>

      {/* Quick start cards */}
      <section className="py-16 px-6 bg-[#0A0F1E]">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-sora text-white text-3xl font-bold text-center mb-12">Get Started</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: BookOpen, title: "API Reference", desc: "Complete endpoint documentation for all 12 BRD modules", href: "/developers/api-reference", color: "text-[#C8A951]" },
              { icon: Code2, title: "Integration Guides", desc: "Step-by-step walkthroughs for common integration scenarios", href: "/developers/guides", color: "text-[#2E5F9A]" },
              { icon: Package, title: "SDKs & Libraries", desc: "Official SDKs for Node.js, Python, and Java", href: "/developers/sdks", color: "text-emerald-400" },
              { icon: Zap, title: "Changelog", desc: "Latest API updates, new endpoints, and breaking changes", href: "#", color: "text-purple-400" },
            ].map((card) => (
              <Link key={card.title} href={card.href} className="bg-[#0D1F3C] border border-white/10 rounded-xl p-6 hover:border-[#C8A951]/40 transition-all group">
                <card.icon className={`w-8 h-8 ${card.color} mb-4`} />
                <h3 className="font-sora text-white font-semibold mb-2 group-hover:text-[#C8A951] transition-colors">{card.title}</h3>
                <p className="text-white/50 text-sm">{card.desc}</p>
                <div className="flex items-center gap-1 mt-4 text-[#C8A951] text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Explore</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured endpoints */}
      <section className="py-16 px-6 bg-[#080D1A]">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-sora text-white text-3xl font-bold text-center mb-4">Popular Endpoints</h2>
          <p className="text-white/50 text-center mb-12">The most frequently used API endpoints by our integration partners</p>
          <div className="space-y-4">
            {[
              { method: "POST", path: "/v1/loans", desc: "Submit a new loan application with full borrower data, property details, and loan parameters. Returns loan ID and initial AI assessment." },
              { method: "POST", path: "/v1/aus/submit", desc: "Submit a loan to Fannie Mae DU or Freddie Mac LPA for automated underwriting. Returns recommendation and condition list." },
              { method: "POST", path: "/v1/ai/income-analysis", desc: "AI-powered income analysis from paystubs, W-2s, and bank statements. Returns verified income with confidence score." },
              { method: "GET", path: "/v1/loans/{loan_id}", desc: "Retrieve full loan record including current status, AI decisions, conditions, and audit trail." },
              { method: "POST", path: "/v1/compliance/trid-check", desc: "Validate TRID compliance for Loan Estimate and Closing Disclosure. Returns pass/fail with specific violation details." },
            ].map((ep) => (
              <div key={ep.path} className="bg-[#0D1F3C] border border-white/10 rounded-xl p-5 flex items-start gap-4 hover:border-[#C8A951]/30 transition-colors">
                <span className={`text-xs font-bold px-2 py-1 rounded font-mono flex-shrink-0 mt-0.5 ${ep.method === "GET" ? "bg-emerald-500/20 text-emerald-400" : "bg-[#2E5F9A]/30 text-[#7BA7D4]"}`}>
                  {ep.method}
                </span>
                <div className="flex-1 min-w-0">
                  <code className="text-white font-mono text-sm">{ep.path}</code>
                  <p className="text-white/50 text-sm mt-1">{ep.desc}</p>
                </div>
                <Link href="/developers/api-reference" className="text-[#C8A951] text-sm flex-shrink-0 hover:underline">
                  Docs →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support CTA */}
      <section className="py-16 px-6 bg-[#0D1F3C]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-sora text-white text-3xl font-bold mb-4">Need Help?</h2>
          <p className="text-white/60 mb-8">Our developer support team typically responds within 2 hours during business hours.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="mailto:developers@mortgagecoreai.com" className="bg-[#C8A951] text-[#0D1F3C] font-semibold px-6 py-3 rounded-lg hover:bg-[#E8C96A] transition-colors">
              Contact Support
            </a>
            <a href="#" className="border border-white/30 text-white px-6 py-3 rounded-lg hover:border-white/60 transition-colors">
              Join Developer Slack
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
