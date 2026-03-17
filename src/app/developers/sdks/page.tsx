"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Package, CheckCircle2, Copy, Check } from "lucide-react";

const sdks = [
  {
    id: "node",
    name: "Node.js / TypeScript",
    logo: "⬡",
    logoColor: "#68A063",
    version: "1.4.2",
    install: "npm install @mortgagecoreai/sdk",
    initCode: `import MortgageCoreAI from '@mortgagecoreai/sdk';\n\nconst client = new MortgageCoreAI({\n  apiKey: process.env.MORTGAGECORE_API_KEY,\n  environment: 'sandbox',\n});`,
    sampleCode: `// Submit a loan application\nconst loan = await client.loans.create({\n  borrower: { firstName: 'Jane', lastName: 'Smith', ... },\n  property: { address: '123 Main St', ... },\n  loan: { amount: 360000, type: 'CONVENTIONAL', ... },\n});\n\nconsole.log(loan.id); // loan_01HZXYZ123\n\n// Get AI decision\nconst decision = await client.loans.aiDecision.get(loan.id);\nconsole.log(decision.recommendation); // 'APPROVE'`,
    features: ["Full TypeScript types", "Async/await support", "Auto-retry with backoff", "Webhook verification helper", "Streaming support"],
  },
  {
    id: "python",
    name: "Python",
    logo: "🐍",
    logoColor: "#3776AB",
    version: "1.3.1",
    install: "pip install mortgagecoreai",
    initCode: `from mortgagecoreai import MortgageCoreAI\n\nclient = MortgageCoreAI(\n    api_key=os.environ["MORTGAGECORE_API_KEY"],\n    environment="sandbox",\n)`,
    sampleCode: `# Submit a loan application\nloan = client.loans.create(\n    borrower={"first_name": "Jane", "last_name": "Smith", ...},\n    property={"address": "123 Main St", ...},\n    loan={"amount": 360000, "type": "CONVENTIONAL", ...},\n)\n\nprint(loan.id)  # loan_01HZXYZ123\n\n# Get AI decision\ndecision = client.loans.ai_decision.get(loan.id)\nprint(decision.recommendation)  # 'APPROVE'`,
    features: ["Type hints (PEP 484)", "Sync and async clients", "Pydantic models", "Pytest fixtures", "Django/FastAPI integrations"],
  },
  {
    id: "java",
    name: "Java",
    logo: "☕",
    logoColor: "#ED8B00",
    version: "1.2.0",
    install: `<!-- Maven -->\n<dependency>\n  <groupId>com.mortgagecoreai</groupId>\n  <artifactId>sdk-java</artifactId>\n  <version>1.2.0</version>\n</dependency>`,
    initCode: `import com.mortgagecoreai.MortgageCoreAI;\n\nMortgageCoreAI client = MortgageCoreAI.builder()\n    .apiKey(System.getenv("MORTGAGECORE_API_KEY"))\n    .environment(Environment.SANDBOX)\n    .build();`,
    sampleCode: `// Submit a loan application\nCreateLoanRequest request = CreateLoanRequest.builder()\n    .borrower(Borrower.builder()\n        .firstName("Jane")\n        .lastName("Smith")\n        .build())\n    .loan(LoanParams.builder()\n        .amount(360000L)\n        .type(LoanType.CONVENTIONAL)\n        .build())\n    .build();\n\nLoan loan = client.loans().create(request);\nSystem.out.println(loan.getId()); // loan_01HZXYZ123`,
    features: ["Java 11+ support", "Spring Boot starter", "CompletableFuture async", "Jackson serialization", "Maven & Gradle"],
  },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <button onClick={handleCopy} className="p-1.5 rounded hover:bg-white/10 text-white/40 hover:text-white transition-colors">
      {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
    </button>
  );
}

export default function SDKsPage() {
  const [activeSDK, setActiveSDK] = useState(sdks[0]);

  return (
    <div className="min-h-screen bg-[#0A0F1E]">
      <div className="bg-[#0D1F3C] border-b border-white/10 pt-24 pb-12 px-6">
        <div className="max-w-6xl mx-auto">
          <Link href="/developers" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Developer Docs
          </Link>
          <h1 className="font-sora text-4xl font-bold text-white mb-3">SDKs & Libraries</h1>
          <p className="text-white/60 text-lg">Official client libraries for MortgageCore AI. Fully typed, auto-generated from our OpenAPI spec.</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* SDK tabs */}
        <div className="flex gap-3 mb-10">
          {sdks.map((sdk) => (
            <button
              key={sdk.id}
              onClick={() => setActiveSDK(sdk)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl border font-medium transition-all ${activeSDK.id === sdk.id ? 'bg-[#0D1F3C] border-[#C8A951]/50 text-white' : 'bg-[#0D1F3C]/50 border-white/10 text-white/60 hover:border-white/30'}`}
            >
              <span className="text-xl">{sdk.logo}</span>
              {sdk.name}
              <span className="text-xs text-white/30">v{sdk.version}</span>
            </button>
          ))}
        </div>

        {/* SDK content */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            {/* Install */}
            <div className="bg-[#0D1F3C] rounded-xl border border-white/10 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                <span className="text-white/60 text-sm font-medium">Installation</span>
                <CopyButton text={activeSDK.install} />
              </div>
              <pre className="p-4 text-sm font-mono text-[#C8A951] overflow-x-auto"><code>{activeSDK.install}</code></pre>
            </div>

            {/* Initialize */}
            <div className="bg-[#0D1F3C] rounded-xl border border-white/10 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                <span className="text-white/60 text-sm font-medium">Initialize Client</span>
                <CopyButton text={activeSDK.initCode} />
              </div>
              <pre className="p-4 text-sm font-mono text-white/80 overflow-x-auto whitespace-pre-wrap"><code>{activeSDK.initCode}</code></pre>
            </div>

            {/* Sample */}
            <div className="bg-[#0D1F3C] rounded-xl border border-white/10 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                <span className="text-white/60 text-sm font-medium">Sample Usage</span>
                <CopyButton text={activeSDK.sampleCode} />
              </div>
              <pre className="p-4 text-sm font-mono text-white/80 overflow-x-auto whitespace-pre-wrap"><code>{activeSDK.sampleCode}</code></pre>
            </div>
          </div>

          {/* Features sidebar */}
          <div className="space-y-6">
            <div className="bg-[#0D1F3C] rounded-xl border border-white/10 p-6">
              <h3 className="font-sora text-white font-semibold mb-4">Features</h3>
              <ul className="space-y-3">
                {activeSDK.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-white/70 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#0D1F3C] rounded-xl border border-white/10 p-6">
              <h3 className="font-sora text-white font-semibold mb-3">Resources</h3>
              <div className="space-y-2">
                <a href="#" className="block text-[#C8A951] text-sm hover:underline">GitHub Repository →</a>
                <a href="#" className="block text-[#C8A951] text-sm hover:underline">npm Package →</a>
                <a href="#" className="block text-[#C8A951] text-sm hover:underline">Release Notes →</a>
                <a href="/developers/api-reference" className="block text-[#C8A951] text-sm hover:underline">API Reference →</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
