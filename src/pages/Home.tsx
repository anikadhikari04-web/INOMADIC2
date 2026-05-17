import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Play, Camera, Film, Sparkles, Users } from "lucide-react";
import heroImg1 from "@/assets/images/hero-1.png";
import ringLogo from "@/assets/kogo_1-Photoroom_1776768884920.png";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 }
  }
};

const teamMembers = [
  { name: "Uttam Adhikary", role: "Partner & Founding Member", initial: "U", desc: "Visionary founder driving the creative direction and strategic growth of INOMADIC." },
  { name: "Subhankar Chandogi", role: "Key Person", initial: "S", desc: "Core pillar of the team, overseeing critical operations and partnerships." },
  { name: "Arnab Adhikary", role: "CEO", initial: "A", desc: "Manages day-to-day operations ensuring seamless project delivery every time." },
  { name: "Soumyadyuti Dey Chowdhury", role: "Manager — Videography", initial: "S", desc: "Leads the videography division, crafting cinematic brand stories." },
  { name: "Suryadyuti Banerjee", role: "Manager — Documentation", initial: "S", desc: "Heads documentation and content strategy across all productions." },
  { name: "Pragya Parinita Das", role: "Manager — Motion Graphics", initial: "P", desc: "Creates stunning motion graphics and visual effects for every project." },
];

export default function Home() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center -mt-20 pt-20 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImg1}
            alt="Cinematic Studio"
            className="w-full h-full object-cover opacity-25"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/80 to-black"></div>
        </div>

        {/* Ambient glow blobs — reduced blur on mobile via smaller sizes */}
        <div
          aria-hidden
          className="absolute top-1/4 -right-32 w-[16rem] h-[16rem] md:w-[28rem] md:h-[28rem] bg-primary/20 blur-[60px] md:blur-[100px] rounded-full pointer-events-none"
        />
        <div
          aria-hidden
          className="absolute bottom-0 -left-32 w-[14rem] h-[14rem] md:w-[24rem] md:h-[24rem] bg-primary/10 blur-[50px] md:blur-[100px] rounded-full pointer-events-none"
        />

        <div className="container relative z-10 mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Text Column */}
          <div className="lg:col-span-7 flex flex-col text-center lg:text-left items-center lg:items-start">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-6 inline-block"
            >
              <span className="px-4 py-1.5 rounded-full border border-primary/40 text-primary text-[10px] sm:text-xs font-bold tracking-widest uppercase bg-primary/5 shadow-[0_0_20px_rgba(0,255,136,0.25)]">
                Visual Storytelling Agency
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-[1.05] tracking-tighter mb-6"
            >
              We Don't Just Create.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-green-300 to-primary inline-block">
                We Captivate.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mb-10 font-light leading-relaxed"
            >
              Crafting brand films, motion graphics & immersive digital experiences that operate at the intersection of art and technology.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-5 w-full sm:w-auto"
            >
              <Link href="/our-works">
                <span className="px-7 py-3.5 bg-primary text-black font-bold rounded-2xl flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(0,255,136,0.45)] hover:shadow-[0_0_50px_rgba(0,255,136,0.7)] transition-shadow cursor-pointer text-sm sm:text-base active:scale-95 transition-transform">
                  Explore Our Work <ArrowRight size={18} />
                </span>
              </Link>
              <Link href="/contact">
                <span className="px-7 py-3.5 bg-white/[0.04] border border-primary/40 text-white font-bold rounded-2xl flex items-center justify-center hover:border-primary hover:bg-primary/5 hover:shadow-[0_0_25px_rgba(0,255,136,0.4)] transition-all cursor-pointer text-sm sm:text-base active:scale-95">
                  Get in Touch
                </span>
              </Link>
            </motion.div>
          </div>

          {/* Ring Logo Column */}
          <div className="lg:col-span-5 flex items-center justify-center relative order-first lg:order-last mb-4 lg:mb-0">
            <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-[26rem] lg:h-[26rem] flex items-center justify-center">
              {/* Pulsing aura behind ring — reduced on mobile */}
              <div
                aria-hidden
                className="absolute inset-0 m-auto w-[80%] h-[80%] bg-primary/30 blur-[40px] md:blur-[80px] rounded-full pointer-events-none animate-pulse"
              />
              <div
                aria-hidden
                className="absolute inset-0 m-auto w-[110%] h-[110%] bg-primary/15 blur-[50px] md:blur-[100px] rounded-full pointer-events-none opacity-80 animate-pulse"
              />

              {/* Floating ring logo — simplified animation */}
              <motion.img
                src={ringLogo}
                alt="INOMADIC"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: [0, -10, 0],
                }}
                transition={{
                  opacity: { duration: 0.8, ease: "easeOut" },
                  scale: { duration: 0.8, ease: "easeOut" },
                  y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                }}
                className="relative z-10 w-full h-full object-contain drop-shadow-[0_0_40px_rgba(0,255,136,0.7)]"
              />

              {/* Slow rotating sparkle rings — CSS animation for GPU compositing */}
              <div
                aria-hidden
                className="absolute inset-0 m-auto w-[95%] h-[95%] rounded-full border border-primary/15 hidden md:block"
                style={{ animation: "spin 30s linear infinite" }}
              />
              <div
                aria-hidden
                className="absolute inset-0 m-auto w-[105%] h-[105%] rounded-full border border-primary/10 hidden md:block"
                style={{ animation: "spin 45s linear infinite reverse" }}
              />
            </div>
          </div>
        </div>

        {/* Scroll Indicator — hidden on mobile */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-500 flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-widest font-bold">Scroll</span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-primary/60 to-transparent"></div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="py-20 md:py-32 relative bg-black">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="mb-16 md:mb-32 flex flex-col md:flex-row md:items-end justify-between gap-8"
          >
            <div>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Our <span className="text-primary">Expertise</span>
              </h2>
              <p className="text-gray-400 text-lg md:text-xl max-w-xl">
                We blend cinematic vision with cutting-edge technology to deliver visual assets that demand attention.
              </p>
            </div>
            <Link href="/about">
              <span className="inline-flex items-center gap-2 text-primary uppercase font-bold tracking-widest text-sm hover:text-white transition-colors cursor-pointer group">
                More About Us 
                <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
              </span>
            </Link>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { title: "Brand Films", icon: Film, desc: "Cinematic commercials and brand documentaries that tell your unique story." },
              { title: "Motion Graphics", icon: Play, desc: "Dynamic 2D/3D animations that bring complex ideas to life with fluid precision." },
              { title: "Photography", icon: Camera, desc: "High-end product, lifestyle, and editorial photography with dramatic lighting." },
              { title: "Visual Identity", icon: Sparkles, desc: "Cohesive visual systems, art direction, and brand aesthetics." }
            ].map((service, i) => (
              <motion.div 
                key={i}
                variants={fadeInUp}
                className="glass-panel p-8 rounded-3xl glow-border group md:hover:-translate-y-2 transition-transform duration-500 bg-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] border border-white/10"
              >
                <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-black transition-colors duration-500">
                  <service.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{service.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
           Meet the Team Section
           ════════════════════════════════════════════ */}
      <section className="py-20 md:py-32 relative overflow-hidden bg-black">
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          {/* Section Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
            className="text-center mb-14 md:mb-20"
          >
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-primary/30 text-primary text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase bg-primary/5 mb-6">
              <Users size={12} /> Team
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-5 leading-tight">
              Meet the <span className="text-primary">Team</span>
            </h2>
            <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              The people behind INOMADIC who make sure everything runs smoothly.
            </p>
          </motion.div>

          {/* Team Grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto"
          >
            {teamMembers.map((member, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="group gpu-accel"
              >
                <div className="flex flex-col items-center text-center p-6 sm:p-8 rounded-2xl md:rounded-3xl bg-white/[0.03] border border-white/[0.08] hover:border-primary/30 transition-all duration-500 hover:bg-white/[0.06] h-full">
                  {/* Avatar circle */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-primary/80 to-emerald-600/80 flex items-center justify-center mb-5 shadow-[0_0_20px_rgba(0,255,136,0.15)] group-hover:shadow-[0_0_30px_rgba(0,255,136,0.25)] transition-shadow duration-500">
                    <span className="text-xl sm:text-2xl font-black text-black">
                      {member.initial}
                    </span>
                  </div>
                  {/* Name */}
                  <h3 className="text-base sm:text-lg font-bold text-white mb-1 leading-tight">
                    {member.name}
                  </h3>
                  {/* Role */}
                  <p className="text-primary font-mono text-[10px] sm:text-xs tracking-wider uppercase mb-3">
                    {member.role}
                  </p>
                  {/* Description */}
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                    {member.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom note */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center text-gray-500 text-xs sm:text-sm italic mt-10 md:mt-14"
          >
            …and 16 other talented members across 4 states crafting India's finest IEC materials.
          </motion.p>
        </div>
      </section>

      {/* ════════════════════════════════════════════
           CTA Section
           ════════════════════════════════════════════ */}
      <section className="py-28 md:py-40 relative overflow-hidden">
        {/* Top fade mask to blend seamlessly into black */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />

        {/* Background glow orbs - Smoother blend */}
        <div aria-hidden className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] md:w-[64rem] md:h-[64rem] bg-primary/[0.08] blur-[140px] md:blur-[240px] rounded-full pointer-events-none" />
        <div aria-hidden className="absolute bottom-0 left-[10%] w-[24rem] h-[24rem] md:w-[36rem] md:h-[36rem] bg-primary/[0.06] blur-[100px] md:blur-[200px] rounded-full pointer-events-none" />
        <div aria-hidden className="absolute top-[10%] right-[5%] w-[16rem] h-[16rem] md:w-[28rem] md:h-[28rem] bg-primary/[0.05] blur-[80px] md:blur-[160px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-3xl mx-auto flex flex-col items-center"
          >
            {/* Badge */}
            <motion.span
              variants={fadeInUp}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-primary/30 text-primary text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase bg-primary/5 mb-8"
            >
              <Sparkles size={12} /> Get Started Today
            </motion.span>

            {/* Heading — no text-glow */}
            <motion.h2
              variants={fadeInUp}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-5 leading-tight"
            >
              Ready to <span className="text-primary italic">Continue ?</span>
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              variants={fadeInUp}
              className="text-gray-400 text-sm sm:text-base md:text-lg max-w-xl mb-10 leading-relaxed"
            >
              Let's bring your vision to life. Start a conversation and let our team craft something extraordinary for your brand.
            </motion.p>

            {/* Buttons */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 sm:gap-5 w-full sm:w-auto"
            >
              <Link href="/about">
                <span className="px-8 py-3.5 bg-white/[0.04] border border-white/20 text-white font-bold rounded-2xl flex items-center justify-center hover:border-primary/60 hover:bg-white/[0.08] transition-all cursor-pointer text-sm sm:text-base active:scale-95">
                  About
                </span>
              </Link>
              <Link href="/connect">
                <span className="px-8 py-3.5 bg-primary text-black font-bold rounded-2xl flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(0,255,136,0.3)] hover:shadow-[0_0_40px_rgba(0,255,136,0.5)] transition-all cursor-pointer text-sm sm:text-base active:scale-95">
                  Start a Project <ArrowRight size={16} />
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
