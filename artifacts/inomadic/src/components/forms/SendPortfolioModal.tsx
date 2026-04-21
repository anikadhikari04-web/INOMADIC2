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
  const canSend = messageValid && hasLinkOrFile && !submitting;

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
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl my-8 bg-[#0a0a0a] border border-primary/20 rounded-3xl shadow-[0_0_60px_rgba(0,255,136,0.15)] overflow-hidden"
          >
            {/* Glow */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/20 blur-[80px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary/10 blur-[80px] rounded-full pointer-events-none" />

            {/* Close */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 z-10 h-10 w-10 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <div className="relative p-6 sm:p-8 md:p-10">
              {success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <div className="h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center mb-6">
                    <CheckCircle2 className="text-primary" size={48} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Portfolio Sent!</h3>
                  <p className="text-gray-400">We'll review it and get back to you soon.</p>
                </motion.div>
              ) : (
                <>
                  <div className="mb-6">
                    <p className="text-xs text-primary tracking-widest uppercase mb-2">Submit</p>
                    <h2 className="text-2xl sm:text-3xl font-black text-white">
                      Send Your <span className="text-primary text-glow">Portfolio</span>
                    </h2>
                    <p className="text-gray-500 text-sm mt-2">
                      Share your work with us — message + link or files required.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Optional name + email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name (optional)"
                        className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder:text-gray-600 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm transition"
                      />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your email (optional)"
                        className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder:text-gray-600 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm transition"
                      />
                    </div>

                    {/* Message - REQUIRED */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-xs font-bold tracking-widest uppercase text-gray-400">
                          Message <span className="text-primary">*</span>
                        </label>
                        <span
                          className={`text-xs font-mono ${
                            wordCount > MAX_WORDS ? "text-red-400" : wordCount > 0 ? "text-primary" : "text-gray-600"
                          }`}
                        >
                          {wordCount}/{MAX_WORDS} words
                        </span>
                      </div>
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell us about yourself and what you're sharing..."
                        rows={4}
                        className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder:text-gray-600 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm resize-none transition"
                      />
                      {wordCount > MAX_WORDS && (
                        <p className="text-red-400 text-xs mt-1">Maximum {MAX_WORDS} words allowed.</p>
                      )}
                    </div>

                    {/* Portfolio link */}
                    <div>
                      <label className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-2 block">
                        Portfolio Link
                      </label>
                      <div className="relative">
                        <Link2 size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                          type="url"
                          value={link}
                          onChange={(e) => setLink(e.target.value)}
                          placeholder="https://your-portfolio.com"
                          className="w-full pl-11 pr-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder:text-gray-600 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm transition"
                        />
                      </div>
                    </div>

                    {/* File upload */}
                    <div>
                      <label className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-2 block">
                        Upload Files <span className="text-gray-600 normal-case font-normal tracking-normal">(max 15 MB each)</span>
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
                        className="w-full flex flex-col items-center justify-center gap-2 px-4 py-6 bg-white/[0.02] border border-dashed border-white/15 rounded-xl text-gray-400 hover:border-primary/50 hover:text-primary hover:bg-primary/5 transition-all"
                      >
                        <Upload size={20} />
                        <span className="text-sm font-medium">Click to choose files</span>
                        <span className="text-xs text-gray-600">Images, videos, PDFs, ZIPs</span>
                      </button>

                      {files.length > 0 && (
                        <div className="mt-3 space-y-2">
                          {files.map((f, i) => (
                            <div
                              key={i}
                              className="flex items-center gap-3 px-3 py-2 bg-white/[0.03] border border-white/10 rounded-lg"
                            >
                              <FileText size={16} className="text-primary shrink-0" />
                              <div className="flex-1 min-w-0">
                                <p className="text-xs text-white truncate">{f.name}</p>
                                <p className="text-[10px] text-gray-500">{(f.size / 1024).toFixed(1)} KB</p>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeFile(i)}
                                className="text-gray-500 hover:text-red-400 transition-colors p-1"
                                aria-label="Remove file"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {error && (
                      <div className="px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-300 text-xs">
                        {error}
                      </div>
                    )}

                    {/* Hint */}
                    {!canSend && !submitting && (
                      <p className="text-[11px] text-gray-600 text-center">
                        {!messageValid
                          ? "Add a message (1–300 words) to continue."
                          : "Add a portfolio link or upload at least one file to unlock Send."}
                      </p>
                    )}

                    {/* Send */}
                    <motion.button
                      type="submit"
                      disabled={!canSend}
                      whileTap={canSend ? { scale: 0.97 } : undefined}
                      className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold text-sm tracking-wider uppercase transition-all ${
                        canSend
                          ? "bg-primary text-black hover:shadow-[0_0_30px_rgba(0,255,136,0.5)] cursor-pointer"
                          : "bg-white/5 text-gray-600 cursor-not-allowed border border-white/10"
                      }`}
                    >
                      {submitting ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={16} />
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
