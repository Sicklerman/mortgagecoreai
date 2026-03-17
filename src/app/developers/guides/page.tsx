"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Clock, CheckCircle2, ChevronRight, Code2 } from "lucide-react";

const guides = [
  {
    id: "first-loan",
    title: "Submit Your First Loan Application",
    description: "End-to-end walkthrough of creating a loan, uploading documents, and getting an AI decision.",
    duration: "15 min",
    difficulty: "Beginner",
    steps: [
      {
        title: "Install the SDK",
        code: `npm install @mortgagecoreai/sdk`,
        lang: "bash",
        desc: "Start by installing the official Node.js SDK."
      },
      {
        title: "Initialize the Client",
        code: `import MortgageCoreAI from '@mortgagecoreai/sdk';\n\nconst client = new MortgageCoreAI({\n  apiKey: process.env.MORTGAGECORE_API_KEY,\n  environment: 'sandbox', // or 'production'\n});`,
        lang: "typescript",
        desc: "Create a client instance with your API key from environment variables."
      },
      {
        title: "Submit a Loan Application",
        code: `const loan = await client.loans.create({\n  borrower: {\n    firstName: 'Jane',\n    lastName: 'Smith',\n    ssn: '***-**-1234',\n    dateOfBirth: '1985-03-15',\n    annualIncome: 95000,\n    employmentStatus: 'EMPLOYED',\n  },\n  property: {\n    address: '123 Main St',\n    city: 'Austin',\n    state: 'TX',\n    zip: '78701',\n    estimatedValue: 450000,\n    propertyType: 'SINGLE_FAMILY',\n  },\n  loan: {\n    purpose: 'PURCHASE',\n    amount: 360000,\n    termMonths: 360,\n    type: 'CONVENTIONAL',\n  },\n});\n\nconsole.log('Loan ID:', loan.id);\n// Loan ID: loan_01HZXYZ123ABC`,
        lang: "typescript",
        desc: "Submit the full loan application. The API returns immediately with a loan ID."
      },
      {
        title: "Upload Documents",
        code: `import fs from 'fs';\n\n// Upload W-2\nawait client.loans.documents.upload(loan.id, {\n  documentType: 'W2',\n  year: 2023,\n  file: fs.createReadStream('./w2_2023.pdf'),\n});\n\n// Upload paystub\nawait client.loans.documents.upload(loan.id, {\n  documentType: 'PAYSTUB',\n  file: fs.createReadStream('./paystub.pdf'),\n});`,
        lang: "typescript",
        desc: "Upload supporting documents. The AI will automatically classify and extract data."
      },
      {
        title: "Get AI Decision",
        code: `// Poll for AI decision (or use webhooks)\nconst decision = await client.loans.aiDecision.get(loan.id);\n\nconsole.log('AI Score:', decision.score);       // 87\nconsole.log('Recommendation:', decision.recommendation); // 'APPROVE'\nconsole.log('Income Verified:', decision.incomeVerified);  // true\nconsole.log('Conditions:', decision.conditions);  // []\n\n// Submit to AUS\nconst aus = await client.aus.submit(loan.id, {\n  system: 'FANNIE_DU',\n});\nconsole.log('AUS Result:', aus.recommendation); // 'Approve/Eligible'`,
        lang: "typescript",
        desc: "Retrieve the AI assessment and submit to AUS for final underwriting decision."
      },
    ],
  },
  {
    id: "webhooks",
    title: "Setting Up Webhooks",
    description: "Configure real-time event notifications for loan status changes, AI decisions, and compliance alerts.",
    duration: "10 min",
    difficulty: "Intermediate",
    steps: [],
  },
  {
    id: "white-label",
    title: "White-Label Borrower Portal",
    description: "Embed and brand the borrower-facing portal in your existing digital banking or LOS interface.",
    duration: "25 min",
    difficulty: "Advanced",
    steps: [],
  },
  {
    id: "compliance",
    title: "TRID Compliance Automation",
    description: "Automate Loan Estimate and Closing Disclosure generation with TRID tolerance checking.",
    duration: "20 min",
    difficulty: "Intermediate",
    steps: [],
  },
];

export default function GuidesPage() {
  const [activeGuide, setActiveGuide] = useState(guides[0]);

  return (
    <div className="min-h-screen bg-[#0A0F1E]">
      {/* Header */}
      <div className="bg-[#0D1F3C] border-b border-white/10 pt-24 pb-12 px-6">
        <div className="max-w-6xl mx-auto">
          <Link href="/developers" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Developer Docs
          </Link>
          <h1 className="font-sora text-4xl font-bold text-white mb-3">Integration Guides</h1>
          <p className="text-white/60 text-lg">Step-by-step guides to integrate MortgageCore AI into your platform.</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-12 flex gap-8">
        {/* Guide list sidebar */}
        <div className="w-72 flex-shrink-0">
          <div className="space-y-2">
            {guides.map((guide) => (
              <button
                key={guide.id}
                onClick={() => setActiveGuide(guide)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${activeGuide.id === guide.id ? 'bg-[#0D1F3C] border-[#C8A951]/50' : 'bg-[#0D1F3C]/50 border-white/10 hover:border-white/30'}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="font-medium text-white text-sm">{guide.title}</span>
                  <ChevronRight className={`w-4 h-4 flex-shrink-0 mt-0.5 transition-colors ${activeGuide.id === guide.id ? 'text-[#C8A951]' : 'text-white/30'}`} />
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-white/40 text-xs flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {guide.duration}
                  </span>
                  <span className={`text-xs px-1.5 py-0.5 rounded ${guide.difficulty === 'Beginner' ? 'bg-emerald-500/20 text-emerald-400' : guide.difficulty === 'Advanced' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'}`}>
                    {guide.difficulty}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Guide content */}
        <div className="flex-1 min-w-0">
          <div className="mb-8">
            <h2 className="font-sora text-2xl font-bold text-white mb-2">{activeGuide.title}</h2>
            <p className="text-white/60">{activeGuide.description}</p>
          </div>

          {activeGuide.steps.length > 0 ? (
            <div className="space-y-8">
              {activeGuide.steps.map((step, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-[#C8A951] text-[#0D1F3C] font-bold text-sm flex items-center justify-center flex-shrink-0">
                      {i + 1}
                    </div>
                    {i < activeGuide.steps.length - 1 && <div className="w-px flex-1 bg-white/10 mt-2" />}
                  </div>
                  <div className="flex-1 pb-8">
                    <h3 className="font-sora text-white font-semibold text-lg mb-2">{step.title}</h3>
                    <p className="text-white/60 text-sm mb-4">{step.desc}</p>
                    <div className="bg-[#080D1A] rounded-xl border border-white/10 overflow-hidden">
                      <div className="flex items-center gap-2 px-4 py-2 border-b border-white/10">
                        <Code2 className="w-3 h-3 text-white/40" />
                        <span className="text-white/40 text-xs font-mono">{step.lang}</span>
                      </div>
                      <pre className="p-4 text-sm font-mono text-white/80 overflow-x-auto whitespace-pre-wrap">
                        <code>{step.code}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-[#0D1F3C] border border-white/10 rounded-xl p-12 text-center">
              <Code2 className="w-12 h-12 text-white/20 mx-auto mb-4" />
              <p className="text-white/40">This guide is coming soon. <a href="mailto:developers@mortgagecoreai.com" className="text-[#C8A951] hover:underline">Get notified</a></p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
