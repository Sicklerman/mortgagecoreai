"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users, FileText, Tag, Cpu, CreditCard, Scale, ShieldCheck,
  FolderOpen, Home, TrendingUp, Handshake, BarChart3,
  CheckCircle, ArrowRight, Bot, Brain
} from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ScheduleDemoModal } from "@/components/shared/ScheduleDemoModal";

const modules = [
  {
    id: "lead",
    num: "01",
    icon: Users,
    title: "Lead Management & CRM",
    subtitle: "Insellerate Integration",
    desc: "The Lead Management module serves as the top-of-funnel engine, capturing, scoring, and nurturing prospective borrowers from all inbound channels. Integrates natively with Insellerate CRM API for bi-directional sync within 90 seconds of any record mutation.",
    requirements: [
      "FR-LM-01: Capture leads from web forms, phone IVR, referral partners, and purchased lead providers",
      "FR-LM-02: AI Lead Scoring Engine assigns Loan Conversion Probability Score (LCPS) of 0–100",
      "FR-LM-03: Auto-assign leads to LOs based on geography, license, product specialty, and capacity rules",
      "FR-LM-04: Bi-directional sync with Insellerate within 90 seconds of any record mutation",
      "FR-LM-05: Automated nurture workflows (SMS, email, voicemail drops) based on lead status and LCPS",
      "FR-LM-06: Pre-qualification AI generates estimated loan eligibility range before LO contact",
      "FR-LM-07: Multi-AOR configurations for enterprise banking partners with multiple branches",
      "FR-LM-08: TCPA consent tracking mandatory for all SMS/automated outreach with timestamped audit",
    ],
    aiCapabilities: [
      "Lead Conversion Predictor (XGBoost) — ML model trained on historical application-to-close data",
      "Optimal Contact Time Engine — predicts best time to contact lead from behavioral signals",
      "AI Chat Pre-Qualifier (GPT-4o) — chat widget that collects pre-qual data and schedules LO consultations",
    ],
    integrations: ["Insellerate CRM API", "Twilio SMS/Voice", "HubSpot", "Velocify"],
    metric: { label: "Lead Conversion", value: "2.4×", sub: "vs. industry avg" },
  },
  {
    id: "application",
    num: "02",
    icon: FileText,
    title: "Loan Application & 1003",
    subtitle: "Digital URLA Engine",
    desc: "Manages the full digital 1003 (Uniform Residential Loan Application) workflow. Supports both borrower self-service and LO-assisted entry. All URLA 2020 fields supported per Freddie Mac Form 65 / Fannie Mae Form 1003 specification.",
    requirements: [
      "FR-APP-01: Digital URLA compliant with GSE ULAD specification v2.0",
      "FR-APP-02: Borrower self-service portal allows asynchronous completion across devices",
      "FR-APP-03: AI Document Intake parses pay stubs, W-2s, tax returns, bank statements via OCR/NLP",
      "FR-APP-04: Co-borrower workflow with independent identity verification",
      "FR-APP-05: E-consent and e-signature integration compliant with E-SIGN Act and UETA",
      "FR-APP-06: Initial Disclosure Package delivered within 3 business days (TRID compliance)",
      "FR-APP-07: LendingQB loan record created automatically on submission via API",
      "FR-APP-08: All required fields validated per MISMO 3.4 schema prior to submission",
      "FR-APP-09: Application data encrypted at rest (AES-256) and in transit (TLS 1.3)",
    ],
    aiCapabilities: [
      "AI 1003 Assistant — guides borrower through application in natural language",
      "Document Intelligence Engine — Azure Form Recognizer with field-level confidence scores",
      "Inconsistency Detector — flags discrepancies between stated income and uploaded documentation",
    ],
    integrations: ["LendingQB API", "DocuSign", "Notarize (RON)", "Azure Form Recognizer"],
    metric: { label: "Doc Auto-Extract", value: "91%", sub: "accuracy rate" },
  },
  {
    id: "pricing",
    num: "03",
    icon: Tag,
    title: "Product & Pricing Engine",
    subtitle: "LoanPass Integration",
    desc: "Delivers real-time eligibility checking and rate quoting across all investor products. LoanPass integration provides access to the full investor rate sheet mesh. AI pricing layer adds intelligent product recommendation and margin optimization.",
    requirements: [
      "FR-PPE-01: Real-time rate quotes from LoanPass within 3 seconds of pricing request",
      "FR-PPE-02: AI Product Recommender ranks products by borrower cost, LO compensation, and conversion probability",
      "FR-PPE-03: Support all product types: Conventional, FHA, VA, USDA, Jumbo, Non-QM, HELOC, Construction",
      "FR-PPE-04: Rate lock management with expiration tracking, float-down triggers, and extension fees",
      "FR-PPE-05: Loan-level price adjustments (LLPAs) automatically calculated and disclosed",
      "FR-PPE-06: Multi-investor comparison with best-execution recommendation",
      "FR-PPE-07: Re-pricing events trigger automatically on loan change events",
      "FR-PPE-08: Pricing audit log captures every request with timestamp and user ID",
    ],
    aiCapabilities: [
      "Margin Optimizer — recommends SRP-maximizing products within competitive rate bands",
      "Market Pulse AI — monitors MBS pricing trends and alerts LOs to optimal lock timing",
      "Competitor Rate Radar — analyzes HMDA data and market feeds for competitive positioning",
    ],
    integrations: ["LoanPass REST API v1", "Optimal Blue", "Polly", "ICE PPE"],
    metric: { label: "Pricing Response", value: "<3s", sub: "vs. 30s+ legacy" },
  },
  {
    id: "ai-processor",
    num: "04",
    icon: Cpu,
    title: "AI Processor Engine",
    subtitle: "Autonomous Processing Core",
    desc: "The operational heart of MortgageCore AI. The AI Processor Engine replaces the traditional processing function by autonomously managing condition ordering, document chasing, vendor coordination, and file completeness — dramatically reducing the processor-to-loan ratio from 1:50 to 1:200+.",
    requirements: [
      "FR-PRO-01: AI Processor generates prioritized task list within 2 hours of loan submission",
      "FR-PRO-02: Automated ordering of appraisal, title, flood cert, HOA cert, payoff statements",
      "FR-PRO-03: Condition tracking links each condition to specific document, parsed field, and rule",
      "FR-PRO-04: Auto-satisfy conditions where documentation meets rule criteria (confidence ≥ 85%)",
      "FR-PRO-05: Automated borrower communication for outstanding documentation via email, SMS, portal",
      "FR-PRO-06: Loan Health Score (0–100) computed from condition status, timeline variance, risk flags",
      "FR-PRO-07: Processing milestones sync to LendingQB within 5 minutes of milestone completion",
      "FR-PRO-08: SLA breach warnings at 48-hour, 24-hour, and 4-hour thresholds",
      "FR-PRO-09: AI Income Analysis validates income using IRS 4506-C, VOE/VVOE, and OCR pay stub data",
      "FR-PRO-10: Asset verification via Plaid/Finicity, bank statement parsing, DU asset validation",
    ],
    aiCapabilities: [
      "Condition Auto-Clear (60–75% automation rate) — satisfies standard conditions from uploaded docs",
      "Income Calculation AI (90% accuracy) — parses W-2, pay stubs, tax returns",
      "VOE/VVOE Automation (85% straight-through rate) — The Work Number, Argyle, Truework APIs",
      "Stip Generation — reduces manual write time by 80%",
      "Timeline Forecasting — ±2 business days accuracy on close date prediction",
      "Appraisal Dispute Support — reduces ROV prep time by 60%",
    ],
    integrations: ["Truework", "Argyle", "The Work Number", "Plaid", "Finicity", "IRS 4506-C"],
    metric: { label: "Condition Auto-Clear", value: "68%", sub: "auto-cleared by AI" },
  },
  {
    id: "aus",
    num: "05",
    icon: CreditCard,
    title: "Credit & AUS",
    subtitle: "Automated Underwriting System",
    desc: "Manages the full credit evaluation workflow from tri-merge credit report ordering through AUS submission, findings analysis, and underwriter review facilitation. Supports DU, LPA, FHA TOTAL Scorecard, GUS, VA, and Non-QM AI engine.",
    requirements: [
      "FR-AUS-01: Credit report ordering from all three repositories via Factual Data, CBC, Informative Research",
      "FR-AUS-02: Fannie Mae DU and Freddie Mac LPA submission automated from loan data",
      "FR-AUS-03: AUS findings parsed and imported to condition system automatically",
      "FR-AUS-04: AI Credit Risk Analyzer interprets findings and generates plain-language UW briefing",
      "FR-AUS-05: Credit improvement recommendations for failed AUS loans surfaced to LO",
      "FR-AUS-06: Manual underwrite workflows with full documentation checklists per product guidelines",
      "FR-AUS-07: Re-submission to AUS on material loan data changes (income, assets, property value)",
      "FR-AUS-08: All AUS submissions, responses, and findings archived for audit and QC",
    ],
    aiCapabilities: [
      "Credit Risk Analyzer (Ensemble Classifier) — credit risk stratification and underwriter briefing",
      "AUS findings auto-import — maps each finding to resolution workflow",
      "Non-QM AI Decision Engine — proprietary scoring model for non-agency products",
    ],
    integrations: ["Fannie Mae DU (MISMO 3.4)", "Freddie Mac LPA (MISMO 3.4)", "FHA TOTAL Scorecard", "GUS (USDA)", "Factual Data", "CBC Innovis"],
    metric: { label: "AUS Auto-Submit", value: "100%", sub: "on data change events" },
  },
  {
    id: "underwriting",
    num: "06",
    icon: Scale,
    title: "Underwriting Support",
    subtitle: "Decision Engine",
    desc: "Facilitates human underwriter decision-making with AI-generated risk summaries, exception management, and a full audit trail compliant with secondary market QC requirements. Supports Approve, Suspend, Deny, and Approve with Conditions (AWC).",
    requirements: [
      "FR-UW-01: AI Underwriter Briefing summarizes loan profile, risk factors, compensating factors, and AUS findings",
      "FR-UW-02: Investor overlay rules enforced in addition to GSE guidelines",
      "FR-UW-03: Decision workflow: Approve, Suspend, Deny, Approve with Conditions (AWC)",
      "FR-UW-04: Conditions categorized as PTD, PTF, or Post-Closing (PC)",
      "FR-UW-05: Exception request workflow routes to senior UW or credit committee with AI risk assessment",
      "FR-UW-06: ECOA adverse action notice generation automated with correct reason codes",
      "FR-UW-07: UAD appraisal review integration with collateral risk flagging",
      "FR-UW-08: DTI, LTV, CLTV, HCLTV calculations automated and continuously updated",
      "FR-UW-09: QM/ATR analysis with safe harbor/rebuttable presumption designation",
      "FR-UW-10: Second-signature requirements for exception loans above defined thresholds",
    ],
    aiCapabilities: [
      "Collateral Risk AI — analyzes appraisal data, property characteristics, market trends",
      "Income Stability Index — scores income sustainability from employment history and economic indicators",
      "Fraud Detection AI — monitors 300+ indicators across identity, income, collateral, transaction layers",
    ],
    integrations: ["Fannie Mae DU", "UAD/UCDP", "Freddie Mac CLA", "AMC portals"],
    metric: { label: "UW Decisioning", value: "87%", sub: "first-pass approval rate" },
  },
  {
    id: "compliance",
    num: "07",
    icon: ShieldCheck,
    title: "Compliance Automation",
    subtitle: "Real-Time Regulatory Guard",
    desc: "A real-time regulatory compliance engine built into every stage of the workflow. Enforces federal and state-specific requirements, generates required disclosures, and produces audit-ready reports for examination.",
    requirements: [
      "FR-COMP-01: TRID engine delivers Loan Estimate within 3 business days and CD ≥3 days before closing",
      "FR-COMP-02: Fee tolerance tracking flags TRID violations (0%, 10%, unlimited buckets) in real time",
      "FR-COMP-03: HMDA LAR data auto-populated for all application fields per Regulation C",
      "FR-COMP-04: ATR/QM analysis at pricing and final approval — QM Safe Harbor, Rebuttable Presumption, Non-QM",
      "FR-COMP-05: State-specific high-cost loan testing (HOEPA, State Mini-HOEPA) at initial pricing",
      "FR-COMP-06: Flood zone certification integration with mandatory flood insurance per NFIP/SFHA rules",
      "FR-COMP-07: OFAC/Red Flag identity checks on all parties at application intake",
      "FR-COMP-08: Fair lending analysis (disparate impact monitoring) monthly with statistical alerts",
      "FR-COMP-09: CRA classification applied to all applications",
      "FR-COMP-10: Reg B adverse action notices within regulatory timeframes with ECOA-compliant reason codes",
    ],
    aiCapabilities: [
      "Compliance Sentinel (Rules Engine + GPT-4o) — real-time regulatory violation detection",
      "Fair Lending AI — disparate impact monitoring with automated remediation suggestions",
      "TRID Tolerance Tracker — real-time cure calculation and deadline forecasting",
    ],
    integrations: ["CFPB HMDA Platform", "OFAC SDN List", "ServiceLink Flood", "CoreLogic Flood"],
    metric: { label: "TRID Violations", value: "0", sub: "this month" },
  },
  {
    id: "documents",
    num: "08",
    icon: FolderOpen,
    title: "Document Vault",
    subtitle: "SOC 2 Type II Compliant",
    desc: "A SOC 2 Type II compliant, encrypted document repository managing the entire loan document lifecycle from initial upload through post-closing retention. AI classification at ≥93% accuracy.",
    requirements: [
      "FR-DOC-01: Drag-and-drop and mobile camera upload for all common types (PDF, JPEG, PNG, TIFF)",
      "FR-DOC-02: AI Document Classifier categorizes documents with ≥93% accuracy",
      "FR-DOC-03: OCR extraction parses key fields and flags for validation against loan record",
      "FR-DOC-04: Document version control with full revision history and user attribution",
      "FR-DOC-05: eNote support compliant with MERS eRegistry and eVault standards",
      "FR-DOC-06: Closing document generation including Note, Mortgage/Deed of Trust, TIL, and state-specific docs",
      "FR-DOC-07: Post-closing document delivery to custodians with trailing document management",
      "FR-DOC-08: Retention compliant with federal (3–7 year) and state-specific schedules, automated purge rules",
      "FR-DOC-09: All documents watermarked, access-logged, protected against unauthorized download",
    ],
    aiCapabilities: [
      "Document Intelligence (Computer Vision + NLP) — Azure Form Recognizer for classification and extraction",
      "Auto-Condition Satisfaction — links extracted fields to condition rules at ≥85% confidence",
      "Fraud Pattern Recognition — flags altered or inconsistent documents",
    ],
    integrations: ["Azure Blob Storage", "MERS eRegistry", "DocMagic", "Docutech"],
    metric: { label: "Document Classify", value: "≥93%", sub: "accuracy rate" },
  },
  {
    id: "closing",
    num: "09",
    icon: Home,
    title: "Closing & Funding",
    subtitle: "End-to-End Close",
    desc: "Manages the loan from clear-to-close through wire disbursement and post-closing file delivery. Integrates with title companies, settlement agents, and warehouse lenders to automate the final stages of origination.",
    requirements: [
      "FR-CLO-01: CTC issuance requires automated validation of all PTD/PTF conditions, compliance, and AUS",
      "FR-CLO-02: Closing Disclosure generation meets TRID 3-business-day waiting period",
      "FR-CLO-03: Closing package: lender instructions, ALTA settlement statement, product-specific docs",
      "FR-CLO-04: Integration with Qualia, SoftPro, ResWare for electronic closing package delivery",
      "FR-CLO-05: Hybrid eClosing (wet + eSign) and full eClosing (RON) workflows supported",
      "FR-CLO-06: Funding wire instructions generated and sent to warehouse lender after review",
      "FR-CLO-07: Warehouse line management tracks pledged collateral, advance rates, line utilization",
      "FR-CLO-08: Post-closing audit validates note, mortgage, title policy against closing instructions",
      "FR-CLO-09: MERS registration occurs automatically at loan funding",
    ],
    aiCapabilities: [
      "CTC Validator — automated pre-flight check of all conditions and compliance before issuance",
      "Closing Package Generator — produces complete closing package with state-specific documents",
      "Warehouse Line Optimizer — recommends optimal pledge timing and advance rate utilization",
    ],
    integrations: ["Qualia", "SoftPro", "ResWare", "Flagstar Warehouse", "DocuSign/Notarize", "MERS"],
    metric: { label: "Avg Days to Fund", value: "2.1", sub: "after CTC issuance" },
  },
  {
    id: "secondary",
    num: "10",
    icon: TrendingUp,
    title: "Secondary Market",
    subtitle: "Investor Delivery & Securitization",
    desc: "Manages disposition of closed loans through GSE delivery (FNMA/FHLMC), private investor sales, or whole loan portfolio retention. Critical for banking partners to achieve liquidity and manage interest rate risk.",
    requirements: [
      "FR-SEC-01: Loan data formatted for ULDD Phase 3 compliance for GSE delivery",
      "FR-SEC-02: Fannie Mae Loan Delivery and Freddie Mac Selling System integrations for automated delivery",
      "FR-SEC-03: Investor commitment management tracks trade commitments, deadlines, pair-off economics",
      "FR-SEC-04: Best-execution analytics recommend optimal sale channel (FNMA, FHLMC, GNMA, private)",
      "FR-SEC-05: Loan sale pricing model accounts for SRP, guaranty fees, base pricing, and LLPAs",
      "FR-SEC-06: Loan defect reporting integrates with FNMA CLUES and FHLMC Loan Advisor",
      "FR-SEC-07: Servicing transfer data export supports MSP, Black Knight, LoanCare formats",
      "FR-SEC-08: Whole loan sale package: investor data tapes, collateral manifest, trailing document lists",
    ],
    aiCapabilities: [
      "Pipeline Hedge Advisor — calculates MBS hedge ratios to protect gain-on-sale margins",
      "Delivery Exception Predictor — identifies loans at risk of GSE rejection before commitment",
      "SRP Maximizer — analyzes real-time investor bids for optimal delivery timing and channel",
    ],
    integrations: ["Fannie Mae Loan Delivery (ULDD)", "Freddie Mac Selling System", "Ginnie Mae MyPool", "Bloomberg MBS"],
    metric: { label: "GSE Delivery", value: "24–48h", sub: "automated ULDD" },
  },
  {
    id: "servicing",
    num: "11",
    icon: Handshake,
    title: "Servicing Handoff & QC",
    subtitle: "Post-Closing Excellence",
    desc: "Manages boarding file generation, AI-driven post-closing QC stratification, MERS rights transfers, trailing document tracking, and repurchase demand management.",
    requirements: [
      "FR-SVC-01: Boarding file generation supports all major servicing platforms with lossless data transfer",
      "FR-SVC-02: Post-closing QC sampling: 100% High Risk, 20% Medium Risk, 5% Low Risk AI-stratified",
      "FR-SVC-03: MERS TBR and TSR automated at loan sale",
      "FR-SVC-04: Trailing document tracking for recorded documents and final title policies",
      "FR-SVC-05: Repurchase demand management with investor deadlines and cure documentation tracking",
    ],
    aiCapabilities: [
      "QC Risk Stratifier (Classification Model) — AI-driven post-close QC audit pool selection",
      "Defect Predictor — identifies loans with highest repurchase risk before investor delivery",
      "Boarding File Validator — ensures lossless data transfer to MSP, Black Knight, LoanCare",
    ],
    integrations: ["MSP (ICE)", "Black Knight MSP", "LoanCare", "MERS", "Fannie Mae CLUES"],
    metric: { label: "QC Defect Rate", value: "<0.3%", sub: "AI-stratified audit" },
  },
  {
    id: "analytics",
    num: "12",
    icon: BarChart3,
    title: "Reporting & Analytics",
    subtitle: "Business Intelligence Layer",
    desc: "Delivers real-time executive dashboards, LO performance metrics, compliance reporting, and AI-driven BI across all platform data. 7-year WORM-compliant data retention.",
    requirements: [
      "FR-RPT-01: Executive Dashboard: loan volume, pull-through rate, cycle time, cost per loan, fallout reasons, P&L",
      "FR-RPT-02: LO Performance Dashboard: application count, approval rate, avg cycle time, lock fallout",
      "FR-RPT-03: Compliance Report Suite: HMDA LAR, CRA, Fair Lending, TRID exceptions, ECOA adverse actions",
      "FR-RPT-04: Secondary Market Report: pipeline position, hedge exposure, committed/uncommitted volume, SRP",
      "FR-RPT-05: AI Insights Engine generates weekly plain-language narrative reports with anomaly detection",
      "FR-RPT-06: All reports exportable to Excel, PDF, and direct API for BI integration",
      "FR-RPT-07: 7-year minimum data retention with WORM compliance",
    ],
    aiCapabilities: [
      "AI Insights Engine (GPT-4o) — weekly narrative reports highlighting anomalies and recommended actions",
      "Forecasting Models — predict pipeline pull-through, cycle time, and fallout rates",
      "Fair Lending Monitor — automated disparate impact analysis with regulatory-ready output",
    ],
    integrations: ["Azure Synapse Analytics", "Power BI", "Tableau", "CFPB HMDA Reporting"],
    metric: { label: "Processor Ratio", value: "1:190", sub: "loans per processor" },
  },
];

export default function PlatformPage() {
  const [activeTab, setActiveTab] = useState("lead");
  const [demoOpen, setDemoOpen] = useState(false);
  const activeModule = modules.find((m) => m.id === activeTab) || modules[0];

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Platform"
            title="Built Module by Module. Deployed as One."
            subtitle="12 independently deployable microservices, each with its own AI component, API surface, and database — orchestrated by a unified intelligence layer."
          />
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={() => setDemoOpen(true)}
              className="px-6 py-3 bg-gold text-navy font-bold rounded-xl hover:bg-gold-lt transition-colors text-sm"
            >
              Schedule a Demo
            </button>
            <a
              href="/developers/api-reference"
              className="px-6 py-3 border border-steel/40 text-off-white/70 rounded-xl hover:border-gold/40 hover:text-gold transition-colors text-sm"
            >
              View API Reference →
            </a>
          </div>
        </div>
      </section>

      {/* Module tabs */}
      <section className="py-4 bg-blue-deep/30 border-y border-steel/20 sticky top-16 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center py-2">
            {modules.map((mod) => (
              <button
                key={mod.id}
                onClick={() => setActiveTab(mod.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === mod.id
                    ? "bg-gold text-navy"
                    : "text-off-white/60 hover:text-gold hover:bg-blue-deep"
                }`}
              >
                <mod.icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{mod.title.split("&")[0].trim()}</span>
                <span className="sm:hidden">{mod.num}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Module detail */}
      <section className="py-16 bg-navy min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid lg:grid-cols-3 gap-10"
          >
            {/* Left: main content */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                    <activeModule.icon className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gold uppercase tracking-widest">
                      Module {activeModule.num}
                    </div>
                    <h2 className="font-sora font-bold text-2xl text-off-white">
                      {activeModule.title}
                    </h2>
                    <div className="text-sm text-muted">{activeModule.subtitle}</div>
                  </div>
                </div>
                <p className="text-off-white/70 leading-relaxed">{activeModule.desc}</p>
              </div>

              {/* Requirements */}
              <div>
                <h3 className="font-sora font-bold text-sm text-gold uppercase tracking-widest mb-4">
                  Functional Requirements
                </h3>
                <div className="space-y-2">
                  {activeModule.requirements.map((req) => (
                    <div
                      key={req}
                      className="flex items-start gap-3 p-3 bg-blue-deep/40 border border-steel/20 rounded-lg"
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-off-white/70 leading-relaxed">{req}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Capabilities */}
              <div>
                <h3 className="font-sora font-bold text-sm text-gold uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Bot className="w-4 h-4" /> AI Capabilities
                </h3>
                <div className="space-y-2">
                  {activeModule.aiCapabilities.map((cap) => (
                    <div
                      key={cap}
                      className="flex items-start gap-3 p-3 bg-gold/5 border border-gold/20 rounded-lg"
                    >
                      <Brain className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-off-white/70">{cap}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: sidebar */}
            <div className="space-y-6">
              {/* Key metric */}
              <div className="bg-blue-deep border border-steel/30 rounded-2xl p-6 text-center">
                <div className="text-xs font-bold text-muted uppercase tracking-widest mb-2">
                  {activeModule.metric.label}
                </div>
                <div className="font-sora font-bold text-5xl text-gold mb-1">
                  {activeModule.metric.value}
                </div>
                <div className="text-sm text-off-white/50">{activeModule.metric.sub}</div>
              </div>

              {/* Integrations */}
              <div className="bg-blue-deep border border-steel/30 rounded-2xl p-6">
                <h3 className="font-sora font-bold text-sm text-off-white mb-4">Integrations</h3>
                <div className="flex flex-wrap gap-2">
                  {activeModule.integrations.map((intg) => (
                    <span
                      key={intg}
                      className="text-xs px-2.5 py-1 bg-navy border border-steel/40 rounded-full text-off-white/70"
                    >
                      {intg}
                    </span>
                  ))}
                </div>
              </div>

              {/* Module navigation */}
              <div className="bg-blue-deep border border-steel/30 rounded-2xl p-5">
                <h3 className="font-sora font-bold text-xs text-muted uppercase tracking-widest mb-3">
                  All Modules
                </h3>
                <div className="space-y-1">
                  {modules.map((mod) => (
                    <button
                      key={mod.id}
                      onClick={() => setActiveTab(mod.id)}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-left transition-all ${
                        activeTab === mod.id
                          ? "bg-gold/10 text-gold border border-gold/30"
                          : "text-off-white/50 hover:text-off-white hover:bg-steel/20"
                      }`}
                    >
                      <mod.icon className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>
                        {mod.num} · {mod.title}
                      </span>
                      {activeTab === mod.id && <ArrowRight className="w-3 h-3 ml-auto" />}
                    </button>
                  ))}
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
