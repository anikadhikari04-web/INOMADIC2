import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PhoneCall, Clock, AlertCircle } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { useToast } from "@/hooks/use-toast";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

export default function ConnectUs() {
  const { toast } = useToast();
  const [isAvailable, setIsAvailable] = useState(false);
  const [currentTimeStr, setCurrentTimeStr] = useState("");

  // Calculate IST availability
  useEffect(() => {
    const checkAvailability = () => {
      // Get current UTC time
      const now = new Date();
      
      // Calculate IST time (UTC + 5:30)
      const istOffset = 5.5 * 60 * 60 * 1000;
      const istTime = new Date(now.getTime() + istOffset);
      
      // Format time string for display
      const hours = istTime.getUTCHours();
      const minutes = istTime.getUTCMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const hours12 = hours % 12 || 12;
      const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
      
      setCurrentTimeStr(`${hours12}:${minutesStr} ${ampm} IST`);
      
      // Check if between 10:00 AM and 8:00 PM (20:00) IST
      // Note: working with the UTCHours of our shifted date object
      const isWorkHours = hours >= 10 && hours < 20;
      
      // Check if it's a weekday (0 is Sunday, 6 is Saturday)
      // We want to use the UTC day of our shifted date
      const day = istTime.getUTCDay();
      const isWeekDay = day >= 1 && day <= 6; // Let's assume Mon-Sat working for agency
      
      setIsAvailable(isWorkHours && isWeekDay);
    };

    checkAvailability();
    // Update every minute
    const interval = setInterval(checkAvailability, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleCallClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isAvailable) {
      e.preventDefault();
      toast({
        title: "Currently Unavailable",
        description: "Phone lines are closed. Please leave a message below.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col w-full bg-black min-h-screen">
      {/* Header */}
      <section className="pt-24 pb-12 px-6 md:px-12 text-center">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
            Connect <span className="text-primary text-glow">With Us</span>
          </h1>
          <p className="text-xl text-gray-400 font-light">
            Need an immediate response? Check our call availability or drop us a message.
          </p>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="py-12 pb-24 relative">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Left Col - Call System */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="flex flex-col"
            >
              <div className="glass-panel glow-border p-8 md:p-12 rounded-3xl h-full flex flex-col relative overflow-hidden">
                {/* Status indicator ring in background */}
                <div className={`absolute -right-20 -top-20 w-64 h-64 blur-[80px] rounded-full pointer-events-none transition-colors duration-1000 ${isAvailable ? 'bg-primary/20' : 'bg-destructive/20'}`}></div>
                
                <div className="flex items-center gap-3 mb-8 relative z-10">
                  <PhoneCall className="text-white" size={28} />
                  <h2 className="text-3xl font-bold text-white">Call System</h2>
                </div>

                <div className="bg-black/50 border border-white/5 rounded-2xl p-6 mb-8 relative z-10">
                  <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-4">
                    <span className="text-gray-400 flex items-center gap-2">
                      <Clock size={16} /> Current Time (IST)
                    </span>
                    <span className="text-white font-mono">{currentTimeStr}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Status</span>
                    <div className="flex items-center gap-2">
                      {isAvailable ? (
                        <>
                          <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                          </span>
                          <span className="text-primary font-bold tracking-wide text-sm uppercase">Calling Available</span>
                        </>
                      ) : (
                        <>
                          <span className="relative flex h-3 w-3">
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-destructive"></span>
                          </span>
                          <span className="text-destructive font-bold tracking-wide text-sm uppercase">Unavailable Now</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-auto relative z-10">
                  <p className="text-gray-400 text-sm mb-6 text-center">
                    Operating Hours: 10:00 AM – 8:00 PM IST (Mon-Sat)
                  </p>
                  <a 
                    href="tel:+919046684054"
                    onClick={handleCallClick}
                    className={`w-full py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all ${
                      isAvailable 
                        ? 'bg-primary text-black hover:bg-white hover:shadow-[0_0_30px_rgba(0,255,136,0.4)]' 
                        : 'bg-zinc-800 text-gray-500 cursor-not-allowed border border-white/5'
                    }`}
                  >
                    {isAvailable ? (
                      <>Call Now <PhoneCall size={20} /></>
                    ) : (
                      <>Lines Closed <AlertCircle size={20} /></>
                    )}
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Right Col - Message System */}
            <div className="flex flex-col">
              <ContactForm />
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
