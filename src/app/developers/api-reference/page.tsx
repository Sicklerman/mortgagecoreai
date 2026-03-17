"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Copy, Check, ChevronDown, ChevronRight } from "lucide-react";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      className="p-1.5 rounded hover:bg-white/10 text-white/40 hover:text-white transition-colors"
    >
      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  );
}

function MethodBadge({ method }: { method: string }) {
  const colors: Record<string, string> = {
    GET: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    POST: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    PUT: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    DELETE: "bg-red-500/20 text-red-400 border-red-500/30",
    PATCH: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold font-mono border ${colors[method] || colors.POST}`}>
      {method}
    </span>
  );
}

interface Param { name: string; type: string; required: boolean; desc: string; }
interface Endpoint {
  id: string;
  method: string;
  path: string;
  title: string;
  description: string;
  params?: Param[];
  requestBody?: string;
  responseBody?: string;
  errors?: { code: number; message: string }[];
}

const endpoints: Endpoint[] = [
  {
    id: "create-loan",
    method: "POST",
    path: "/v1/loans",
    title: "Create a loan",
    description: "Submit a new loan application into the MortgageCore AI pipeline. Returns a loan object with a unique ID and initial AI risk assessment. The system immediately begins document classification, income analysis, and AUS eligibility pre-check.",
    params: [
      { name: "borrower.firstName", type: "string", required: true, desc: "Borrower's legal first name as it appears on government-issued ID." },
      { name: "borrower.lastName", type: "string", required: true, desc: "Borrower's legal last name." },
      { name: "borrower.ssn", type: "string", required: true, desc: "Social Security Number. Masked in responses (format: ***-**-XXXX)." },
      { name: "borrower.dateOfBirth", type: "string", required: true, desc: "Date of birth in ISO 8601 format (YYYY-MM-DD)." },
      { name: "borrower.annualIncome", type: "number", required: true, desc: "Gross annual income in USD." },
      { name: "borrower.employmentStatus", type: "enum", required: true, desc: "EMPLOYED | SELF_EMPLOYED | RETIRED | OTHER" },
      { name: "property.address", type: "string", required: true, desc: "Full street address of the subject property." },
      { name: "property.city", type: "string", required: true, desc: "City name." },
      { name: "property.state", type: "string", required: true, desc: "Two-letter state code (e.g., TX)." },
      { name: "property.zip", type: "string", required: true, desc: "5-digit ZIP code." },
      { name: "property.estimatedValue", type: "number", required: true, desc: "Borrower-estimated property value in USD." },
      { name: "property.propertyType", type: "enum", required: true, desc: "SINGLE_FAMILY | CONDO | MULTI_UNIT | MANUFACTURED" },
      { name: "loan.purpose", type: "enum", required: true, desc: "PURCHASE | REFINANCE | CASH_OUT_REFINANCE" },
      { name: "loan.amount", type: "number", required: true, desc: "Requested loan amount in USD." },
      { name: "loan.termMonths", type: "number", required: true, desc: "Loan term in months (180 or 360)." },
      { name: "loan.type", type: "enum", required: true, desc: "CONVENTIONAL | FHA | VA | USDA | JUMBO" },
    ],
    requestBody: `{
  "borrower": {
    "firstName": "Jane",
    "lastName": "Smith",
    "ssn": "123-45-6789",
    "dateOfBirth": "1985-03-15",
    "annualIncome": 95000,
    "employmentStatus": "EMPLOYED"
  },
  "property": {
    "address": "123 Main Street",
    "city": "Austin",
    "state": "TX",
    "zip": "78701",
    "estimatedValue": 450000,
    "propertyType": "SINGLE_FAMILY"
  },
  "loan": {
    "purpose": "PURCHASE",
    "amount": 360000,
    "termMonths": 360,
    "type": "CONVENTIONAL"
  }
}`,
    responseBody: `{
  "id": "loan_01HZXYZ123ABC",
  "status": "PROCESSING",
  "createdAt": "2024-11-15T10:23:45Z",
  "borrower": {
    "firstName": "Jane",
    "lastName": "Smith",
    "ssn": "***-**-6789"
  },
  "ai": {
    "score": null,
    "recommendation": "PENDING",
    "processingStartedAt": "2024-11-15T10:23:45Z"
  },
  "ltv": 0.80,
  "dti": null
}`,
    errors: [
      { code: 400, message: "Invalid borrower.ssn format — must be 9 digits" },
      { code: 422, message: "loan.amount exceeds county conforming loan limit" },
      { code: 429, message: "Rate limit exceeded — max 100 loan submissions per minute" },
    ],
  },
  {
    id: "get-loan",
    method: "GET",
    path: "/v1/loans/{loan_id}",
    title: "Retrieve a loan",
    description: "Retrieve a full loan record including current processing status, AI decisions, automated underwriting results, conditions list, and complete audit trail. Poll this endpoint or subscribe to webhooks for real-time updates.",
    params: [
      { name: "loan_id", type: "string", required: true, desc: "The unique loan identifier returned from POST /v1/loans." },
    ],
    responseBody: `{
  "id": "loan_01HZXYZ123ABC",
  "status": "AI_CLEARED",
  "createdAt": "2024-11-15T10:23:45Z",
  "updatedAt": "2024-11-15T10:31:12Z",
  "borrower": {
    "firstName": "Jane",
    "lastName": "Smith",
    "ssn": "***-**-6789",
    "verifiedIncome": 95000,
    "verifiedEmployment": true
  },
  "ai": {
    "score": 87,
    "recommendation": "APPROVE",
    "incomeVerified": true,
    "creditRisk": "LOW",
    "conditions": [],
    "processingCompletedAt": "2024-11-15T10:31:12Z"
  },
  "aus": {
    "system": "FANNIE_DU",
    "recommendation": "Approve/Eligible",
    "submittedAt": "2024-11-15T10:32:00Z",
    "caseId": "DU_20241115_8842"
  },
  "ltv": 0.80,
  "dti": 0.38,
  "auditTrail": [
    { "event": "LOAN_CREATED", "timestamp": "2024-11-15T10:23:45Z" },
    { "event": "AI_PROCESSING_STARTED", "timestamp": "2024-11-15T10:23:45Z" },
    { "event": "INCOME_VERIFIED", "timestamp": "2024-11-15T10:29:18Z" },
    { "event": "AI_CLEARED", "timestamp": "2024-11-15T10:31:12Z" }
  ]
}`,
    errors: [
      { code: 404, message: "Loan not found or does not belong to your organization" },
      { code: 403, message: "Insufficient permissions to view this loan" },
    ],
  },
  {
    id: "upload-documents",
    method: "POST",
    path: "/v1/loans/{loan_id}/documents",
    title: "Upload documents",
    description: "Upload supporting documents for a loan. The AI Document Processing Engine automatically classifies document type, extracts structured data, and flags discrepancies. Supports PDF, JPEG, PNG, and TIFF up to 50MB per file.",
    params: [
      { name: "loan_id", type: "string", required: true, desc: "The unique loan identifier." },
      { name: "documentType", type: "enum", required: false, desc: "W2 | PAYSTUB | BANK_STATEMENT | TAX_RETURN | APPRAISAL | TITLE | OTHER. If omitted, AI will auto-classify." },
      { name: "year", type: "number", required: false, desc: "Tax year for W2s and tax returns." },
      { name: "file", type: "file", required: true, desc: "Binary file content. Use multipart/form-data encoding." },
    ],
    requestBody: `// Multipart form data
Content-Type: multipart/form-data; boundary=----FormBoundary

------FormBoundary
Content-Disposition: form-data; name="documentType"

W2
------FormBoundary
Content-Disposition: form-data; name="year"

2023
------FormBoundary
Content-Disposition: form-data; name="file"; filename="w2_2023.pdf"
Content-Type: application/pdf

[binary content]
------FormBoundary--`,
    responseBody: `{
  "id": "doc_01HZABC789",
  "loanId": "loan_01HZXYZ123ABC",
  "documentType": "W2",
  "year": 2023,
  "status": "PROCESSING",
  "uploadedAt": "2024-11-15T10:25:00Z",
  "ai": {
    "classificationConfidence": 0.98,
    "extractedData": {
      "employerName": "Acme Corp",
      "wagesAndTips": 95000,
      "federalWithholding": 14250
    },
    "discrepancies": []
  }
}`,
    errors: [
      { code: 413, message: "File exceeds 50MB limit" },
      { code: 415, message: "Unsupported file type — use PDF, JPEG, PNG, or TIFF" },
    ],
  },
  {
    id: "pricing-scenario",
    method: "POST",
    path: "/v1/pricing/scenario",
    title: "Price a scenario",
    description: "Run a real-time pricing scenario against the live secondary market rate sheet. Returns rate options, points, APR, and compliance flags. Integrates with LoanPass and Optimal Blue for live rate data.",
    params: [
      { name: "loanAmount", type: "number", required: true, desc: "Loan amount in USD." },
      { name: "ltv", type: "number", required: true, desc: "Loan-to-value ratio as a decimal (e.g., 0.80 for 80%)." },
      { name: "fico", type: "number", required: true, desc: "Borrower's representative FICO score." },
      { name: "loanType", type: "enum", required: true, desc: "CONVENTIONAL | FHA | VA | USDA | JUMBO" },
      { name: "propertyType", type: "enum", required: true, desc: "SINGLE_FAMILY | CONDO | MULTI_UNIT" },
      { name: "lockDays", type: "number", required: false, desc: "Rate lock period in days. Defaults to 30." },
    ],
    requestBody: `{
  "loanAmount": 360000,
  "ltv": 0.80,
  "fico": 760,
  "loanType": "CONVENTIONAL",
  "propertyType": "SINGLE_FAMILY",
  "lockDays": 30
}`,
    responseBody: `{
  "scenarios": [
    {
      "rate": 0.0675,
      "apr": 0.0689,
      "points": 0.0,
      "monthlyPayment": 2335.57,
      "pmi": false,
      "compliance": { "qm": true, "atr": true }
    },
    {
      "rate": 0.0650,
      "apr": 0.0665,
      "points": 0.875,
      "monthlyPayment": 2278.43,
      "pmi": false,
      "compliance": { "qm": true, "atr": true }
    }
  ],
  "rateSheetTimestamp": "2024-11-15T10:00:00Z",
  "lockExpires": "2024-12-15T23:59:59Z"
}`,
    errors: [
      { code: 400, message: "ltv must be between 0.01 and 1.00" },
      { code: 400, message: "fico must be between 300 and 850" },
    ],
  },
  {
    id: "aus-submit",
    method: "POST",
    path: "/v1/aus/submit",
    title: "Submit to AUS",
    description: "Submit a loan to Fannie Mae Desktop Underwriter (DU) or Freddie Mac Loan Product Advisor (LPA) for automated underwriting. Returns the AUS recommendation, condition list, and eligibility findings. Requires the loan to have a completed credit pull and verified income.",
    params: [
      { name: "loanId", type: "string", required: true, desc: "The loan ID to submit." },
      { name: "system", type: "enum", required: true, desc: "FANNIE_DU | FREDDIE_LPA" },
      { name: "creditPullId", type: "string", required: true, desc: "Credit pull ID from a tri-merge credit report within 90 days." },
    ],
    requestBody: `{
  "loanId": "loan_01HZXYZ123ABC",
  "system": "FANNIE_DU",
  "creditPullId": "credit_01HZABC456"
}`,
    responseBody: `{
  "id": "aus_01HZAUS789",
  "loanId": "loan_01HZXYZ123ABC",
  "system": "FANNIE_DU",
  "caseId": "DU_20241115_8842",
  "recommendation": "Approve/Eligible",
  "riskClass": "I",
  "conditions": [
    {
      "id": "cond_001",
      "category": "INCOME",
      "description": "Verify 2-year employment history",
      "priorTo": "CLOSING"
    }
  ],
  "findings": {
    "ltvEligible": true,
    "dtiEligible": true,
    "creditEligible": true
  },
  "submittedAt": "2024-11-15T10:32:00Z",
  "completedAt": "2024-11-15T10:32:08Z"
}`,
    errors: [
      { code: 409, message: "Credit pull is older than 90 days — a new pull is required" },
      { code: 422, message: "Loan missing required field: borrower.ssn for AUS submission" },
    ],
  },
  {
    id: "trid-check",
    method: "POST",
    path: "/v1/compliance/trid-check",
    title: "TRID compliance check",
    description: "Validate a Loan Estimate (LE) or Closing Disclosure (CD) for TRID compliance. Checks tolerance buckets, APR accuracy (±0.125% tolerance), and required disclosure timing. Returns detailed pass/fail with specific violation details mapped to 12 CFR 1026.",
    params: [
      { name: "loanId", type: "string", required: true, desc: "The associated loan ID." },
      { name: "documentType", type: "enum", required: true, desc: "LOAN_ESTIMATE | CLOSING_DISCLOSURE" },
      { name: "disclosureDate", type: "string", required: true, desc: "Date the disclosure was or will be issued (YYYY-MM-DD)." },
      { name: "fees", type: "object", required: true, desc: "Fee breakdown object with origination, title, escrow, and third-party fees." },
    ],
    requestBody: `{
  "loanId": "loan_01HZXYZ123ABC",
  "documentType": "LOAN_ESTIMATE",
  "disclosureDate": "2024-11-15",
  "fees": {
    "originationFees": 2500,
    "titleInsurance": 1200,
    "escrowSetup": 800,
    "appraisalFee": 550,
    "creditReportFee": 45,
    "apr": 0.0689
  }
}`,
    responseBody: `{
  "compliant": true,
  "documentType": "LOAN_ESTIMATE",
  "apr": {
    "disclosed": 0.0689,
    "calculated": 0.0688,
    "variance": 0.0001,
    "withinTolerance": true
  },
  "toleranceBuckets": {
    "zeroTolerance": { "pass": true, "items": [] },
    "tenPercent": { "pass": true, "totalVariance": 0 },
    "unlimited": { "pass": true }
  },
  "timing": {
    "businessDayRequirement": 3,
    "applicationDate": "2024-11-12",
    "disclosureDate": "2024-11-15",
    "compliant": true
  },
  "violations": [],
  "regulatoryReference": "12 CFR 1026.19(e)"
}`,
    errors: [
      { code: 400, message: "fees.originationFees must be a positive number" },
      { code: 422, message: "APR variance exceeds 0.125% tolerance threshold" },
    ],
  },
  {
    id: "income-analysis",
    method: "POST",
    path: "/v1/ai/income-analysis",
    title: "AI income analysis",
    description: "Run the AI Income Verification Engine on uploaded documents for a loan. Analyzes W-2s, paystubs, 1099s, and bank statements using ML models to calculate qualifying income per FNMA B3-3 guidelines. Returns verified income with confidence score and YOY variance analysis.",
    params: [
      { name: "loanId", type: "string", required: true, desc: "The loan ID with uploaded income documents." },
      { name: "documentIds", type: "string[]", required: false, desc: "Optional array of specific document IDs to analyze. If omitted, all income docs are used." },
      { name: "incomeType", type: "enum", required: false, desc: "W2 | SELF_EMPLOYED | RENTAL | RETIREMENT. If omitted, AI auto-detects." },
    ],
    requestBody: `{
  "loanId": "loan_01HZXYZ123ABC",
  "documentIds": ["doc_01HZABC789", "doc_01HZDEF012"],
  "incomeType": "W2"
}`,
    responseBody: `{
  "loanId": "loan_01HZXYZ123ABC",
  "incomeType": "W2",
  "qualifyingIncome": {
    "monthly": 7917,
    "annual": 95000,
    "basis": "AVERAGE_24_MONTHS"
  },
  "confidence": 0.96,
  "documents": [
    {
      "id": "doc_01HZABC789",
      "type": "W2",
      "year": 2023,
      "wages": 95000,
      "employer": "Acme Corp"
    },
    {
      "id": "doc_01HZDEF012",
      "type": "W2",
      "year": 2022,
      "wages": 88000,
      "employer": "Acme Corp"
    }
  ],
  "yoyVariance": 0.079,
  "flagged": false,
  "guidelineReference": "FNMA B3-3.1-01"
}`,
    errors: [
      { code: 422, message: "No income documents found for this loan" },
      { code: 422, message: "Income documents too old — W-2s must be from the past 2 tax years" },
    ],
  },
  {
    id: "uldd",
    method: "POST",
    path: "/v1/secondary-market/uldd",
    title: "Generate ULDD package",
    description: "Generate a Uniform Loan Delivery Dataset (ULDD) compliant data package for delivery to Fannie Mae or Freddie Mac. Validates all required data points per MISMO 3.4 XML schema, generates the GSE-format data file, and returns a delivery-ready package.",
    params: [
      { name: "loanId", type: "string", required: true, desc: "The completed loan ID to package." },
      { name: "gse", type: "enum", required: true, desc: "FANNIE | FREDDIE" },
      { name: "deliveryType", type: "enum", required: false, desc: "BEST_EFFORT | MANDATORY. Defaults to BEST_EFFORT." },
    ],
    requestBody: `{
  "loanId": "loan_01HZXYZ123ABC",
  "gse": "FANNIE",
  "deliveryType": "BEST_EFFORT"
}`,
    responseBody: `{
  "id": "uldd_01HZULDD123",
  "loanId": "loan_01HZXYZ123ABC",
  "gse": "FANNIE",
  "status": "READY",
  "mismo34Validated": true,
  "validationErrors": [],
  "packageUrl": "https://api.mortgagecoreai.com/v1/files/uldd_01HZULDD123.xml",
  "packageExpiresAt": "2024-11-22T10:35:00Z",
  "mismoVersion": "3.4",
  "generatedAt": "2024-11-15T10:35:00Z"
}`,
    errors: [
      { code: 422, message: "Loan status must be CLOSED before generating ULDD package" },
      { code: 422, message: "MISMO validation failed: missing required field CASAID" },
    ],
  },
  {
    id: "webhooks",
    method: "POST",
    path: "/v1/webhooks",
    title: "Register a webhook",
    description: "Register a webhook endpoint to receive real-time event notifications. MortgageCore AI will POST events to your endpoint as loan status changes, AI decisions complete, and compliance checks finish.",
    params: [
      { name: "url", type: "string", required: true, desc: "The HTTPS URL to deliver events to. Must respond with 200 within 30 seconds." },
      { name: "events", type: "string[]", required: true, desc: "Array of event types to subscribe to. Use ['*'] for all events." },
      { name: "secret", type: "string", required: false, desc: "Optional secret for HMAC-SHA256 signature verification. Recommended for production." },
    ],
    requestBody: `{
  "url": "https://your-app.com/webhooks/mortgagecore",
  "events": [
    "loan.created",
    "loan.ai_cleared",
    "loan.aus_completed",
    "loan.conditions_cleared",
    "compliance.trid_violation"
  ],
  "secret": "whsec_your_signing_secret"
}`,
    responseBody: `{
  "id": "wh_01HZWBK456",
  "url": "https://your-app.com/webhooks/mortgagecore",
  "events": [
    "loan.created",
    "loan.ai_cleared",
    "loan.aus_completed",
    "loan.conditions_cleared",
    "compliance.trid_violation"
  ],
  "status": "ACTIVE",
  "createdAt": "2024-11-15T10:36:00Z",
  "signingSecret": "whsec_your_signing_secret"
}`,
    errors: [
      { code: 400, message: "url must use HTTPS" },
      { code: 400, message: "events array cannot be empty" },
    ],
  },
];

const sidebarSections = [
  { title: "Authentication", items: [{ label: "API Keys", id: "auth" }] },
  {
    title: "Loans",
    items: [
      { label: "Create a loan", id: "create-loan" },
      { label: "Retrieve a loan", id: "get-loan" },
      { label: "Upload documents", id: "upload-documents" },
    ],
  },
  { title: "Pricing", items: [{ label: "Price a scenario", id: "pricing-scenario" }] },
  { title: "AUS", items: [{ label: "Submit to AUS", id: "aus-submit" }] },
  { title: "Compliance", items: [{ label: "TRID check", id: "trid-check" }] },
  { title: "AI Models", items: [{ label: "Income analysis", id: "income-analysis" }] },
  { title: "Secondary Market", items: [{ label: "Generate ULDD", id: "uldd" }] },
  { title: "Webhooks", items: [{ label: "Register webhook", id: "webhooks" }] },
];

const webhookEvents = [
  { event: "loan.created", desc: "A new loan application was submitted" },
  { event: "loan.ai_processing", desc: "AI analysis has begun" },
  { event: "loan.ai_cleared", desc: "AI has cleared the loan — recommendation available" },
  { event: "loan.ai_flagged", desc: "AI flagged the loan for manual review" },
  { event: "loan.aus_submitted", desc: "Loan was submitted to DU or LPA" },
  { event: "loan.aus_completed", desc: "AUS returned a recommendation" },
  { event: "loan.conditions_cleared", desc: "All underwriting conditions have been satisfied" },
  { event: "loan.approved", desc: "Loan received final credit approval" },
  { event: "loan.closed", desc: "Loan has successfully closed" },
  { event: "loan.denied", desc: "Loan was denied — ECOA adverse action required" },
  { event: "compliance.trid_violation", desc: "A TRID tolerance violation was detected" },
  { event: "document.uploaded", desc: "A new document was uploaded to the loan" },
  { event: "document.classified", desc: "AI has classified and extracted data from a document" },
];

export default function ApiReferencePage() {
  const [activeId, setActiveId] = useState("create-loan");
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    Authentication: true, Loans: true, Pricing: true, AUS: true, Compliance: true,
    "AI Models": true, "Secondary Market": true, Webhooks: true,
  });

  const toggleSection = (title: string) => {
    setOpenSections((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const activeEndpoint = endpoints.find((e) => e.id === activeId);

  return (
    <div className="min-h-screen bg-[#0A0F1E] flex flex-col">
      {/* Top bar */}
      <div className="bg-[#0D1F3C] border-b border-white/10 pt-16 px-6 py-4 flex items-center gap-4">
        <Link href="/developers" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Developer Docs
        </Link>
        <span className="text-white/20">/</span>
        <span className="text-white/70 text-sm">API Reference</span>
      </div>

      <div className="flex flex-1">
        {/* Sticky left sidebar */}
        <aside className="w-64 flex-shrink-0 bg-[#080D1A] border-r border-white/10 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="p-4">
            <p className="text-white/30 text-xs uppercase tracking-wider mb-4 px-2">Reference</p>
            {sidebarSections.map((section) => (
              <div key={section.title} className="mb-1">
                <button
                  onClick={() => toggleSection(section.title)}
                  className="w-full flex items-center justify-between px-2 py-1.5 text-white/50 hover:text-white text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  {section.title}
                  {openSections[section.title] ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                </button>
                {openSections[section.title] && (
                  <div className="ml-2 mt-1 space-y-0.5">
                    {section.items.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setActiveId(item.id)}
                        className={`w-full text-left px-3 py-1.5 rounded text-sm transition-all ${activeId === item.id ? 'bg-[#C8A951]/10 text-[#C8A951] border-l-2 border-[#C8A951]' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0 overflow-auto">
          {activeId === "auth" ? (
            <div className="max-w-3xl mx-auto px-8 py-10">
              <h1 className="font-sora text-3xl font-bold text-white mb-4">Authentication</h1>
              <p className="text-white/60 mb-8">
                MortgageCore AI uses API key authentication. All requests must include your API key in the Authorization header as a Bearer token.
              </p>
              <div className="bg-[#0D1F3C] rounded-xl border border-white/10 overflow-hidden mb-8">
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                  <span className="text-white/50 text-sm">Request header</span>
                  <CopyButton text="Authorization: Bearer mk_live_xxxxxxxxxxxxxxxxxxxx" />
                </div>
                <pre className="p-4 text-sm font-mono text-white/80">
                  <code>{"Authorization: Bearer mk_live_xxxxxxxxxxxxxxxxxxxx"}</code>
                </pre>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-[#0D1F3C] rounded-xl border border-white/10 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-white font-medium text-sm">Production keys</span>
                  </div>
                  <p className="text-white/50 text-sm">Prefix: <code className="text-[#C8A951]">mk_live_</code></p>
                  <p className="text-white/50 text-sm mt-1">Real loan data and live GSE integrations.</p>
                </div>
                <div className="bg-[#0D1F3C] rounded-xl border border-white/10 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-amber-400" />
                    <span className="text-white font-medium text-sm">Sandbox keys</span>
                  </div>
                  <p className="text-white/50 text-sm">Prefix: <code className="text-[#C8A951]">mk_test_</code></p>
                  <p className="text-white/50 text-sm mt-1">No real data processed. Safe for development.</p>
                </div>
              </div>
            </div>
          ) : activeEndpoint ? (
            <div className="max-w-3xl mx-auto px-8 py-10">
              {/* Endpoint header */}
              <div className="flex items-center gap-3 mb-4">
                <MethodBadge method={activeEndpoint.method} />
                <code className="text-white font-mono text-lg">{activeEndpoint.path}</code>
              </div>
              <h1 className="font-sora text-3xl font-bold text-white mb-4">{activeEndpoint.title}</h1>
              <p className="text-white/60 text-base leading-relaxed mb-8">{activeEndpoint.description}</p>

              {/* Parameters */}
              {activeEndpoint.params && activeEndpoint.params.length > 0 && (
                <div className="mb-8">
                  <h2 className="font-sora text-white font-semibold text-lg mb-4">Parameters</h2>
                  <div className="bg-[#0D1F3C] rounded-xl border border-white/10 overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="text-left px-4 py-3 text-white/40 text-xs uppercase tracking-wider w-1/4">Name</th>
                          <th className="text-left px-4 py-3 text-white/40 text-xs uppercase tracking-wider w-1/6">Type</th>
                          <th className="text-left px-4 py-3 text-white/40 text-xs uppercase tracking-wider w-1/8">Required</th>
                          <th className="text-left px-4 py-3 text-white/40 text-xs uppercase tracking-wider">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {activeEndpoint.params.map((param, i) => (
                          <tr key={param.name} className={i < activeEndpoint.params!.length - 1 ? "border-b border-white/5" : ""}>
                            <td className="px-4 py-3"><code className="text-[#C8A951] text-sm font-mono">{param.name}</code></td>
                            <td className="px-4 py-3"><span className="text-[#7BA7D4] text-sm font-mono">{param.type}</span></td>
                            <td className="px-4 py-3">
                              <span className={`text-xs px-1.5 py-0.5 rounded ${param.required ? 'bg-red-500/20 text-red-400' : 'bg-white/10 text-white/40'}`}>
                                {param.required ? "required" : "optional"}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-white/60 text-sm">{param.desc}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Request body */}
              {activeEndpoint.requestBody && (
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="font-sora text-white font-semibold text-lg">Request Body</h2>
                    <CopyButton text={activeEndpoint.requestBody} />
                  </div>
                  <div className="bg-[#080D1A] rounded-xl border border-white/10 overflow-hidden">
                    <div className="px-4 py-2 border-b border-white/10 flex items-center gap-2">
                      <span className="text-white/30 text-xs font-mono">json</span>
                    </div>
                    <pre className="p-4 text-sm font-mono text-white/80 overflow-x-auto whitespace-pre-wrap">
                      <code>{activeEndpoint.requestBody}</code>
                    </pre>
                  </div>
                </div>
              )}

              {/* Response */}
              {activeEndpoint.responseBody && (
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="font-sora text-white font-semibold text-lg">Response <span className="text-emerald-400 text-sm font-normal ml-2">200 OK</span></h2>
                    <CopyButton text={activeEndpoint.responseBody} />
                  </div>
                  <div className="bg-[#080D1A] rounded-xl border border-white/10 overflow-hidden">
                    <div className="px-4 py-2 border-b border-white/10 flex items-center gap-2">
                      <span className="text-white/30 text-xs font-mono">json</span>
                    </div>
                    <pre className="p-4 text-sm font-mono text-white/80 overflow-x-auto whitespace-pre-wrap">
                      <code>{activeEndpoint.responseBody}</code>
                    </pre>
                  </div>
                </div>
              )}

              {/* Errors */}
              {activeEndpoint.errors && activeEndpoint.errors.length > 0 && (
                <div className="mb-8">
                  <h2 className="font-sora text-white font-semibold text-lg mb-4">Error Codes</h2>
                  <div className="bg-[#0D1F3C] rounded-xl border border-white/10 overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="text-left px-4 py-3 text-white/40 text-xs uppercase tracking-wider w-20">Code</th>
                          <th className="text-left px-4 py-3 text-white/40 text-xs uppercase tracking-wider">Message</th>
                        </tr>
                      </thead>
                      <tbody>
                        {activeEndpoint.errors.map((err, i) => (
                          <tr key={i} className={i < activeEndpoint.errors!.length - 1 ? "border-b border-white/5" : ""}>
                            <td className="px-4 py-3"><span className="text-red-400 font-mono text-sm font-bold">{err.code}</span></td>
                            <td className="px-4 py-3 text-white/60 text-sm">{err.message}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Webhook events table for webhooks endpoint */}
              {activeEndpoint.id === "webhooks" && (
                <div className="mb-8">
                  <h2 className="font-sora text-white font-semibold text-lg mb-4">Webhook Event Types</h2>
                  <div className="bg-[#0D1F3C] rounded-xl border border-white/10 overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="text-left px-4 py-3 text-white/40 text-xs uppercase tracking-wider w-2/5">Event</th>
                          <th className="text-left px-4 py-3 text-white/40 text-xs uppercase tracking-wider">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {webhookEvents.map((ev, i) => (
                          <tr key={ev.event} className={i < webhookEvents.length - 1 ? "border-b border-white/5" : ""}>
                            <td className="px-4 py-3"><code className="text-[#C8A951] font-mono text-sm">{ev.event}</code></td>
                            <td className="px-4 py-3 text-white/60 text-sm">{ev.desc}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </main>
      </div>
    </div>
  );
}
