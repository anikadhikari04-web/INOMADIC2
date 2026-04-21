import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Play, Camera, Film, Sparkles } from "lucide-react";
import heroImg1 from "@/assets/images/hero-1.png";

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
      <section className="relative min-h-[90vh] flex items-center justify-center -mt-20 pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImg1} 
            alt="Cinematic Studio" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black"></div>
        </div>
        
        <div className="container relative z-10 mx-auto px-6 md:px-12 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-8 inline-block"
          >
            <span className="px-4 py-1.5 rounded-full border border-primary/30 text-primary text-xs font-bold tracking-widest uppercase bg-primary/5 backdrop-blur-md">
              Visual Storytelling Agency
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight tracking-tighter mb-6"
          >
            We Don't Just Create.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-300 text-glow">
              We Captivate.
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-400 max-w-3xl mb-12 font-light leading-relaxed"
          >
            Crafting brand films, motion graphics & immersive digital experiences that operate at the intersection of art and technology.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto"
          >
            <Link href="/our-works">
              <span className="px-8 py-4 bg-primary text-black font-bold rounded-2xl flex items-center justify-center gap-3 hover:bg-primary/90 hover:shadow-[0_0_30px_rgba(0,255,136,0.4)] transition-all cursor-pointer">
                Explore Our Work <ArrowRight size={20} />
              </span>
            </Link>
            <Link href="/contact">
              <span className="px-8 py-4 glass-panel text-white font-bold rounded-2xl flex items-center justify-center hover:bg-white/5 glow-border transition-all cursor-pointer">
                Get in Touch
              </span>
            </Link>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500 flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-widest font-bold">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-primary/50 to-transparent"></div>
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
