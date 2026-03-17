"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Brain, CheckCircle2 } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

const volumeOptions = [
  "< 50 loans/month",
  "50–200 loans/month",
  "200–500 loans/month",
  "500–1,000 loans/month",
  "1,000+ loans/month",
];

export function ScheduleDemoModal({ open, onClose }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    volume: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => setSubmitted(false), 300);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center p-4"
            onClick={handleClose}
          />
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-md bg-blue-deep border border-steel/40 rounded-2xl shadow-2xl pointer-events-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-steel/30">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gold/20 flex items-center justify-center">
                    <Brain className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h2 className="font-sora font-bold text-off-white text-base">
                      Schedule a Demo
                    </h2>
                    <p className="text-xs text-muted">See MortgageCore AI in action</p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 text-off-white/40 hover:text-off-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6">
                {submitted ? (
                  <div className="text-center py-6">
                    <CheckCircle2 className="w-12 h-12 text-green-400 mx-auto mb-4" />
                    <h3 className="font-sora font-bold text-xl text-off-white mb-2">
                      You&apos;re on the list!
                    </h3>
                    <p className="text-muted text-sm">
                      Our team will reach out within 1 business day to schedule your personalized demo.
                    </p>
                    <button
                      onClick={handleClose}
                      className="mt-6 px-6 py-2.5 bg-gold text-navy text-sm font-semibold rounded-lg hover:bg-gold-lt transition-colors"
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-off-white/60 mb-1.5 uppercase tracking-wide">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="w-full px-3 py-2.5 bg-navy border border-steel/40 rounded-lg text-sm text-off-white placeholder-muted focus:outline-none focus:border-gold/60 transition-colors"
                          placeholder="Jane Smith"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-off-white/60 mb-1.5 uppercase tracking-wide">
                          Company *
                        </label>
                        <input
                          type="text"
                          required
                          value={form.company}
                          onChange={(e) => setForm({ ...form, company: e.target.value })}
                          className="w-full px-3 py-2.5 bg-navy border border-steel/40 rounded-lg text-sm text-off-white placeholder-muted focus:outline-none focus:border-gold/60 transition-colors"
                          placeholder="Acme Bank"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-off-white/60 mb-1.5 uppercase tracking-wide">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-3 py-2.5 bg-navy border border-steel/40 rounded-lg text-sm text-off-white placeholder-muted focus:outline-none focus:border-gold/60 transition-colors"
                        placeholder="jane@acmebank.com"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-off-white/60 mb-1.5 uppercase tracking-wide">
                        Monthly Loan Volume *
                      </label>
                      <select
                        required
                        value={form.volume}
                        onChange={(e) => setForm({ ...form, volume: e.target.value })}
                        className="w-full px-3 py-2.5 bg-navy border border-steel/40 rounded-lg text-sm text-off-white focus:outline-none focus:border-gold/60 transition-colors"
                      >
                        <option value="">Select volume...</option>
                        {volumeOptions.map((v) => (
                          <option key={v} value={v}>
                            {v}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-off-white/60 mb-1.5 uppercase tracking-wide">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full px-3 py-2.5 bg-navy border border-steel/40 rounded-lg text-sm text-off-white placeholder-muted focus:outline-none focus:border-gold/60 transition-colors"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-gold text-navy text-sm font-bold rounded-lg hover:bg-gold-lt transition-colors mt-2"
                    >
                      Request Demo
                    </button>
                    <p className="text-xs text-muted text-center">
                      No spam. Our team reviews every request personally.
                    </p>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
