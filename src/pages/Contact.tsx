import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { SendPortfolioModal } from "@/components/forms/SendPortfolioModal";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
};

export default function Contact() {
  const [portfolioOpen, setPortfolioOpen] = useState(false);
  return (
    <div className="flex flex-col w-full bg-black min-h-[90vh]">
      {/* Header */}
      <section className="pt-24 pb-12 px-6 md:px-12 relative">
        <div className="container mx-auto">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
              Get in <span className="text-primary text-glow">Touch</span>
            </h1>
            <p className="text-xl text-gray-400 font-light">
              Ready to start your next visual project? We're here to bring your vision to life.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 pb-24 relative">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-24">
            
            {/* Left Col - Contact Info */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="lg:col-span-2 flex flex-col justify-center space-y-12"
            >
              <div>
                <h2 className="text-2xl font-bold text-white mb-8 border-b border-white/10 pb-4">Direct Contact</h2>
                
                <div className="space-y-8">
                  <div className="flex items-start gap-6 group">
                    <div className="h-14 w-14 rounded-full glass-panel backdrop-blur-md bg-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-colors shrink-0">
                      <Mail size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-1">Email Us</p>
                      <a href="mailto:innomadic.official@gmail.com" className="text-white hover:text-primary transition-colors text-lg break-all">
                        innomadic.official@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-6 group">
                    <div className="h-14 w-14 rounded-full glass-panel backdrop-blur-md bg-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-colors shrink-0">
                      <Phone size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-1">Call Us</p>
                      <a href="tel:+919046684054" className="text-white hover:text-primary transition-colors text-lg">
                        +91 90466 84054
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-6 group">
                    <div className="h-14 w-14 rounded-full glass-panel backdrop-blur-md bg-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-colors shrink-0">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-1">Studio</p>
                      <p className="text-white text-lg">
                        India<br />
                        <span className="text-gray-400 text-base">Operating Worldwide</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] relative overflow-hidden will-change-transform">
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/20 blur-[50px] rounded-full pointer-events-none"></div>
                <h3 className="text-white font-bold mb-2 relative z-10">Looking for careers?</h3>
                <p className="text-gray-400 text-sm mb-4 relative z-10">We are always on the lookout for talented artists.</p>
                <button
                  type="button"
                  onClick={() => setPortfolioOpen(true)}
                  className="text-primary hover:text-white transition-colors text-sm font-bold tracking-wider uppercase relative z-10 inline-flex items-center gap-2 cursor-pointer"
                >
                  Send Portfolio
                </button>
              </div>
            </motion.div>

            {/* Right Col - Form */}
            <div className="lg:col-span-3">
              <ContactForm />
            </div>

          </div>
        </div>
      </section>

      <SendPortfolioModal open={portfolioOpen} onClose={() => setPortfolioOpen(false)} />
    </div>
  );
}
