import Link from "next/link";
import { Brain, Twitter, Linkedin, Github } from "lucide-react";

const columns = [
  {
    title: "Platform",
    links: [
      { label: "Features Overview", href: "/platform" },
      { label: "AI Processing", href: "/platform#ai-processor" },
      { label: "Compliance Engine", href: "/platform#compliance" },
      { label: "Secondary Market", href: "/platform#secondary" },
      { label: "Live Demo", href: "/demo" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Community Banks", href: "/solutions#banks" },
      { label: "Credit Unions", href: "/solutions#credit-unions" },
      { label: "IMBs", href: "/solutions#imbs" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Developers",
    links: [
      { label: "API Reference", href: "/developers/api-reference" },
      { label: "Integration Guides", href: "/developers/guides" },
      { label: "SDKs & Tools", href: "/developers/sdks" },
      { label: "Developer Hub", href: "/developers" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/company" },
      { label: "Blog", href: "/company#blog" },
      { label: "Careers", href: "/company#careers" },
      { label: "Contact", href: "/company#contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-navy border-t border-steel/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gold/20 flex items-center justify-center">
                <Brain className="w-5 h-5 text-gold" />
              </div>
              <span className="font-sora font-bold text-xs tracking-widest text-gold uppercase">
                MortgageCore
              </span>
            </Link>
            <p className="text-sm text-muted leading-relaxed mb-5">
              The AI-native mortgage origination platform for forward-thinking banking partners.
            </p>
            <div className="flex items-center gap-3">
              {[Twitter, Linkedin, Github].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 rounded-lg bg-blue-deep flex items-center justify-center text-muted hover:text-gold hover:bg-steel/30 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="font-sora font-bold text-xs tracking-widest text-gold uppercase mb-4">
                {col.title}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted hover:text-off-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-steel/20 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted">
            © 2025 MortgageCore AI. All rights reserved. Proprietary &amp; Confidential.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service", "GLBA Notice"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs text-muted hover:text-off-white transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
