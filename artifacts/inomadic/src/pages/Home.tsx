import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Play, Camera, Film, Sparkles } from "lucide-react";
import heroImg1 from "@/assets/images/hero-1.png";
import ringLogo from "@assets/kogo_1-Photoroom_1776768884920.png";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

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
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/80 to-black"></div>
        </div>

        {/* Ambient glow blobs */}
        <motion.div
          aria-hidden
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -right-32 w-[28rem] h-[28rem] bg-primary/25 blur-[120px] rounded-full pointer-events-none"
        />
        <motion.div
          aria-hidden
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.3, 0.55, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 -left-32 w-[24rem] h-[24rem] bg-primary/15 blur-[120px] rounded-full pointer-events-none"
        />

        <div className="container relative z-10 mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Text Column */}
          <div className="lg:col-span-7 flex flex-col text-center lg:text-left items-center lg:items-start">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="mb-6 inline-block"
            >
              <span className="px-4 py-1.5 rounded-full border border-primary/40 text-primary text-[10px] sm:text-xs font-bold tracking-widest uppercase bg-primary/5 backdrop-blur-md shadow-[0_0_20px_rgba(0,255,136,0.25)]">
                Visual Storytelling Agency
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-[1.05] tracking-tighter mb-6"
            >
              We Don't Just Create.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-green-300 to-primary text-glow inline-block">
                We Captivate.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mb-10 font-light leading-relaxed"
            >
              Crafting brand films, motion graphics & immersive digital experiences that operate at the intersection of art and technology.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-5 w-full sm:w-auto"
            >
              <Link href="/our-works">
                <motion.span
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="px-7 py-3.5 bg-primary text-black font-bold rounded-2xl flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(0,255,136,0.45)] hover:shadow-[0_0_50px_rgba(0,255,136,0.7)] transition-shadow cursor-pointer text-sm sm:text-base"
                >
                  Explore Our Work <ArrowRight size={18} />
                </motion.span>
              </Link>
              <Link href="/contact">
                <motion.span
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="px-7 py-3.5 bg-white/[0.04] backdrop-blur-md border border-primary/40 text-white font-bold rounded-2xl flex items-center justify-center hover:border-primary hover:bg-primary/5 hover:shadow-[0_0_25px_rgba(0,255,136,0.4)] transition-all cursor-pointer text-sm sm:text-base"
                >
                  Get in Touch
                </motion.span>
              </Link>
            </motion.div>
          </div>

          {/* Ring Logo Column */}
          <div className="lg:col-span-5 flex items-center justify-center relative order-first lg:order-last mb-4 lg:mb-0">
            <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-[26rem] lg:h-[26rem] flex items-center justify-center">
              {/* Pulsing aura behind ring */}
              <motion.div
                aria-hidden
                animate={{ scale: [1, 1.18, 1], opacity: [0.55, 0.9, 0.55] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 m-auto w-[80%] h-[80%] bg-primary/40 blur-[80px] rounded-full"
              />
              <motion.div
                aria-hidden
                animate={{ scale: [1.1, 1, 1.1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 m-auto w-[110%] h-[110%] bg-primary/20 blur-[110px] rounded-full"
              />

              {/* Floating + slow rotating ring */}
              <motion.img
                src={ringLogo}
                alt="INOMADIC"
                initial={{ opacity: 0, scale: 0.7, rotate: -15 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                  y: [0, -12, 0],
                }}
                transition={{
                  opacity: { duration: 1, ease: "easeOut" },
                  scale: { duration: 1, ease: "easeOut" },
                  rotate: { duration: 1, ease: "easeOut" },
                  y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                }}
                className="relative z-10 w-full h-full object-contain drop-shadow-[0_0_40px_rgba(0,255,136,0.7)]"
              />

              {/* Slow rotating sparkle ring */}
              <motion.div
                aria-hidden
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 m-auto w-[95%] h-[95%] rounded-full border border-primary/15"
              />
              <motion.div
                aria-hidden
                animate={{ rotate: -360 }}
                transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 m-auto w-[105%] h-[105%] rounded-full border border-primary/10"
              />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-500 flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-widest font-bold">Scroll</span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-primary/60 to-transparent"></div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="py-32 relative bg-black">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="mb-20 md:mb-32 flex flex-col md:flex-row md:items-end justify-between gap-8"
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
                className="glass-panel p-8 rounded-3xl glow-border group hover:-translate-y-2 transition-all duration-500"
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

      {/* Showreel/Video Teaser Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5"></div>
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-black text-white mb-8 leading-tight">
              Ready to create something <span className="text-glow text-primary italic">unforgettable?</span>
            </h2>
            <Link href="/connect">
              <span className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-black font-black text-lg rounded-full hover:bg-primary hover:shadow-[0_0_40px_rgba(0,255,136,0.6)] transition-all cursor-pointer scale-95 hover:scale-100">
                Start a Project
              </span>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
