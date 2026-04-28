import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Link2, Send, Loader2, CheckCircle2 } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

const MAX_WORDS = 300;

export function SendPortfolioModal({ open, onClose }: Props) {
  const [message, setMessage] = useState("");
  const [link, setLink] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const wordCount = message.trim() === "" ? 0 : message.trim().split(/\s+/).length;
  const messageValid = wordCount >= 1 && wordCount <= MAX_WORDS;
  const nameValid = name.trim().length > 0;
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const canSend = messageValid && nameValid && emailValid && !submitting;

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setMessage("");
        setLink("");
        setName("");
        setEmail("");
        setSuccess(false);
        setError(null);
        setSubmitting(false);
      }, 300);
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSend) return;
    setSubmitting(true);
    setError(null);
    try {
      // Build the message body, appending portfolio link if provided
      let fullMessage = message;
      if (link.trim()) {
        fullMessage += `\n\nPortfolio: ${link.trim()}`;
      }

      // Reuse the same /api/sendEmail endpoint as the Contact form
      const res = await fetch("/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message: fullMessage }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send portfolio.");
      }

      setSuccess(true);
      setTimeout(() => onClose(), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xl overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md my-6 rounded-2xl overflow-hidden border border-white/15 shadow-[0_8px_40px_rgba(0,0,0,0.6),0_0_40px_rgba(0,255,136,0.12),inset_0_1px_0_rgba(255,255,255,0.12)]"
            style={{
              background:
                "linear-gradient(135deg, rgba(20,20,20,0.75) 0%, rgba(10,10,10,0.85) 50%, rgba(15,25,20,0.8) 100%)",
              backdropFilter: "blur(28px) saturate(180%)",
              WebkitBackdropFilter: "blur(28px) saturate(180%)",
            }}
          >
            {/* Liquid glass highlights */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl overflow-hidden">
              <div className="absolute -top-24 -right-16 w-56 h-56 bg-primary/25 blur-[70px] rounded-full" />
              <div className="absolute -bottom-24 -left-16 w-56 h-56 bg-primary/15 blur-[70px] rounded-full" />
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              <div className="absolute top-0 left-1/4 right-1/4 h-20 bg-gradient-to-b from-white/[0.08] to-transparent rounded-full blur-2xl" />
            </div>

            {/* Close */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-3 right-3 z-10 h-8 w-8 rounded-full flex items-center justify-center text-gray-400 hover:text-white bg-white/5 hover:bg-white/15 backdrop-blur-md border border-white/10 transition-colors"
              aria-label="Close"
            >
              <X size={16} />
            </button>

            <div className="relative p-5 sm:p-6">
              {success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                    <CheckCircle2 className="text-primary" size={36} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">Portfolio Sent!</h3>
                  <p className="text-gray-400 text-sm">We'll review it and get back soon.</p>
                </motion.div>
              ) : (
                <>
                  <div className="mb-4">
                    <p className="text-[10px] text-primary tracking-widest uppercase mb-1">Submit</p>
                    <h2 className="text-xl sm:text-2xl font-black text-white">
                      Send Your <span className="text-primary text-glow">Portfolio</span>
                    </h2>
                    <p className="text-gray-500 text-xs mt-1">
                      Tell us about yourself and share your portfolio link.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-3">
                    {/* Required name + email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-1 block">
                          Name <span className="text-primary">*</span>
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your name"
                          required
                          className="w-full px-3 py-2 bg-white/[0.05] backdrop-blur-md border border-white/15 rounded-lg text-white placeholder:text-gray-600 focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/30 focus:bg-white/[0.08] text-xs transition shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-1 block">
                          Email <span className="text-primary">*</span>
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@example.com"
                          required
                          className="w-full px-3 py-2 bg-white/[0.05] backdrop-blur-md border border-white/15 rounded-lg text-white placeholder:text-gray-600 focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/30 focus:bg-white/[0.08] text-xs transition shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
                        />
                      </div>
                    </div>

                    {/* Message - REQUIRED */}
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-[10px] font-bold tracking-widest uppercase text-gray-400">
                          Message <span className="text-primary">*</span>
                        </label>
                        <span
                          className={`text-[10px] font-mono ${
                            wordCount > MAX_WORDS ? "text-red-400" : wordCount > 0 ? "text-primary" : "text-gray-600"
                          }`}
                        >
                          {wordCount}/{MAX_WORDS}
                        </span>
                      </div>
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell us about yourself..."
                        rows={3}
                        className="w-full px-3 py-2 bg-white/[0.05] backdrop-blur-md border border-white/15 rounded-lg text-white placeholder:text-gray-600 focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/30 focus:bg-white/[0.08] text-xs resize-none transition shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
                      />
                      {wordCount > MAX_WORDS && (
                        <p className="text-red-400 text-[10px] mt-1">Maximum {MAX_WORDS} words allowed.</p>
                      )}
                    </div>

                    {/* Portfolio link */}
                    <div>
                      <label className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-1 block">
                        Portfolio Link
                      </label>
                      <div className="relative">
                        <Link2 size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                          type="url"
                          value={link}
                          onChange={(e) => setLink(e.target.value)}
                          placeholder="https://your-portfolio.com"
                          className="w-full pl-9 pr-3 py-2 bg-white/[0.05] backdrop-blur-md border border-white/15 rounded-lg text-white placeholder:text-gray-600 focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/30 focus:bg-white/[0.08] text-xs transition shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
                        />
                      </div>
                    </div>

                    {error && (
                      <div className="px-3 py-2 bg-red-500/10 backdrop-blur-md border border-red-500/30 rounded-lg text-red-300 text-[11px]">
                        {error}
                      </div>
                    )}

                    {/* Hint */}
                    {!canSend && !submitting && (
                      <p className="text-[10px] text-gray-600 text-center">
                        {!nameValid
                          ? "Please enter your name."
                          : !emailValid
                          ? "Please enter a valid email."
                          : "Add a message (1–300 words) to continue."}
                      </p>
                    )}

                    {/* Send */}
                    <motion.button
                      type="submit"
                      disabled={!canSend}
                      whileTap={canSend ? { scale: 0.97 } : undefined}
                      className={`w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-xs tracking-wider uppercase transition-all ${
                        canSend
                          ? "bg-primary/90 text-black hover:bg-primary hover:shadow-[0_0_24px_rgba(0,255,136,0.5)] cursor-pointer backdrop-blur-md border border-primary/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]"
                          : "bg-white/5 text-gray-600 cursor-not-allowed border border-white/10 backdrop-blur-md"
                      }`}
                    >
                      {submitting ? (
                        <>
                          <Loader2 size={14} className="animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={13} />
                          Send Portfolio
                        </>
                      )}
                    </motion.button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
