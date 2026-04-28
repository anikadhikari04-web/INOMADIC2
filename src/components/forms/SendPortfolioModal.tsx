import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Link2, Upload, Send, FileText, Trash2, Loader2, CheckCircle2 } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

const MAX_FILE_SIZE = 15 * 1024 * 1024;
const MAX_WORDS = 300;

function getApiUrl() {
  const base = import.meta.env.BASE_URL || "/";
  return `${base.replace(/\/$/, "")}/api/portfolio`;
}

export function SendPortfolioModal({ open, onClose }: Props) {
  const [message, setMessage] = useState("");
  const [link, setLink] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const wordCount = message.trim() === "" ? 0 : message.trim().split(/\s+/).length;
  const messageValid = wordCount >= 1 && wordCount <= MAX_WORDS;
  const hasLinkOrFile = link.trim().length > 0 || files.length > 0;
  const nameValid = name.trim().length > 0;
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const canSend = messageValid && hasLinkOrFile && nameValid && emailValid && !submitting;

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
        setFiles([]);
        setName("");
        setEmail("");
        setSuccess(false);
        setError(null);
        setSubmitting(false);
      }, 300);
    }
  }, [open]);

  const handleFileSelect = (selected: FileList | null) => {
    if (!selected) return;
    const arr = Array.from(selected);
    const tooBig = arr.find((f) => f.size > MAX_FILE_SIZE);
    if (tooBig) {
      setError(`"${tooBig.name}" exceeds 15 MB limit.`);
      return;
    }
    setError(null);
    setFiles((prev) => [...prev, ...arr].slice(0, 10));
  };

  const removeFile = (idx: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSend) return;
    setSubmitting(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append("message", message);
      fd.append("portfolioLink", link);
      fd.append("name", name);
      fd.append("email", email);
      files.forEach((f) => fd.append("files", f));
      const res = await fetch(getApiUrl(), { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to send portfolio.");
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
                      Message + link or files required.
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

                    {/* File upload */}
                    <div>
                      <label className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-1 block">
                        Upload Files <span className="text-gray-600 normal-case font-normal tracking-normal">(max 15 MB)</span>
                      </label>
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        onChange={(e) => handleFileSelect(e.target.files)}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full flex flex-col items-center justify-center gap-1 px-3 py-3 bg-white/[0.04] backdrop-blur-md border border-dashed border-white/20 rounded-lg text-gray-400 hover:border-primary/60 hover:text-primary hover:bg-primary/5 transition-all shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                      >
                        <Upload size={16} />
                        <span className="text-xs font-medium">Choose files</span>
                        <span className="text-[10px] text-gray-600">Images, videos, PDFs, ZIPs</span>
                      </button>

                      {files.length > 0 && (
                        <div className="mt-2 space-y-1.5">
                          {files.map((f, i) => (
                            <div
                              key={i}
                              className="flex items-center gap-2 px-2.5 py-1.5 bg-white/[0.05] backdrop-blur-md border border-white/15 rounded-md"
                            >
                              <FileText size={13} className="text-primary shrink-0" />
                              <div className="flex-1 min-w-0">
                                <p className="text-[11px] text-white truncate">{f.name}</p>
                                <p className="text-[9px] text-gray-500">{(f.size / 1024).toFixed(1)} KB</p>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeFile(i)}
                                className="text-gray-500 hover:text-red-400 transition-colors p-1"
                                aria-label="Remove file"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
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
                          : !messageValid
                          ? "Add a message (1–300 words) to continue."
                          : "Add a portfolio link or upload at least one file to unlock Send."}
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
