import { motion } from "framer-motion";
import { Link } from "wouter";
import uttamImg from "@assets/Unteu6rej6yutitled_1776767797329.png";
import subhankarImg from "@assets/Unti0-9iiyyiouiutled_1776767797328.png";
import arnabImg from "@assets/Untittreu65ei76led_1776767797328.png";
import soumyaImg from "@assets/Unghfireie67rr78oritled_1776767797327.png";
import suryaImg from "@assets/Untidutreur54htrde5tled_1776767797326.png";
import pragyaImg from "@assets/Untitl7oit07t0ed_1776767797323.png";
import heroImg2 from "@/assets/images/hero-2.png";

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

export default function About() {
  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <section className="pt-24 pb-16 px-6 md:px-12 bg-black relative border-b border-white/5">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent blur-3xl rounded-full opacity-50 pointer-events-none"></div>
        <div className="container mx-auto">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="max-w-4xl"
          >
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
              The <span className="text-primary text-glow">INOMADIC</span> Story
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed">
              Founded in 2020, we are a visual storytelling agency specializing in brand films, commercial photography, motion graphics, and digital content creation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="glass-panel p-10 rounded-3xl glow-border relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 text-primary/20">
                <span className="text-8xl font-serif">"</span>
              </div>
              <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-6">Our Mission</h2>
              <p className="text-2xl lg:text-3xl text-white font-medium leading-tight mb-8 relative z-10">
                To create visuals that move people — emotionally and physically.
              </p>
              <p className="text-gray-400 leading-relaxed">
                We exist to bridge the gap between a brand's identity and its audience's imagination. Every frame we craft is engineered to spark a reaction and leave a lasting impression.
              </p>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="glass-panel p-10 rounded-3xl glow-border relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 text-primary/20">
                <span className="text-8xl font-serif">"</span>
              </div>
              <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-6">Our Vision</h2>
              <p className="text-2xl lg:text-3xl text-white font-medium leading-tight mb-8 relative z-10">
                To be the most sought-after creative storytelling studio in India.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Known not just for what we create, but for how we make people feel. We aim to set the benchmark for cinematic quality in the digital space.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Full Width Image Break */}
      <section className="w-full h-[60vh] relative">
        <img 
          src={heroImg2} 
          alt="Creative process" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </section>

      {/* Values */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-6 md:px-12">
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-4xl font-bold text-white mb-16 text-center"
          >
            Core Core <span className="text-primary">Values</span>
          </motion.h2>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {["Creativity", "Quality", "Innovation", "Passion"].map((value, i) => (
              <motion.div 
                key={value}
                variants={fadeInUp}
                className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center hover:bg-white/10 hover:border-primary/50 transition-all cursor-default"
              >
                <span className="text-primary font-mono text-sm mb-4 block">0{i+1}</span>
                <h3 className="text-xl font-bold text-white">{value}</h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none"></div>
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-16 md:mb-24"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              The <span className="text-primary">Minds</span> Behind the Lens
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl">
              A collective of artists, technicians, and visionaries dedicated to the craft of visual storytelling.
            </p>
          </motion.div>

          {/* Founding & Key People */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-16"
          >
            {[
              { name: "Uttam Adhikary", role: "Partner & Founding Member", img: uttamImg, group: "Founder" },
              { name: "Subhankar Chandogi", role: "Key Person", img: subhankarImg, group: "Key People" },
            ].map((member, i) => (
              <motion.div key={i} variants={fadeInUp} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-3xl aspect-[4/3] mb-4 border border-primary/20 glow-border">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-90"></div>
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-primary/90 text-black text-[10px] font-bold tracking-widest uppercase">
                    {member.group}
                  </div>
                  <div className="absolute bottom-0 left-0 p-6 w-full">
                    <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
                    <p className="text-primary font-mono text-sm tracking-wider uppercase">{member.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Leadership Team */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-10"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Leadership <span className="text-primary">Team</span>
            </h3>
            <p className="text-gray-500 text-sm">The hands and minds shaping every frame.</p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { name: "Arnab Adhikary", role: "COO", img: arnabImg },
              { name: "Soumyadyuti Dey Chowdhury", role: "Manager — Videography", img: soumyaImg },
              { name: "Suryadyuti Banerjee", role: "Manager — Documentation", img: suryaImg },
              { name: "Pragya Parinita Das", role: "Manager — Motion Graphics", img: pragyaImg },
            ].map((member, i) => (
              <motion.div key={i} variants={fadeInUp} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-2xl aspect-[3/4] mb-4 border border-white/10 glow-border">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-90"></div>
                  <div className="absolute bottom-0 left-0 p-5 w-full">
                    <h4 className="text-base font-bold text-white mb-1 leading-tight">{member.name}</h4>
                    <p className="text-primary font-mono text-[10px] tracking-wider uppercase">{member.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-gray-500 text-sm mt-12 italic"
          >
            …and 16 other talented members across 4 states crafting India's finest IEC materials.
          </motion.p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 border-t border-white/10 bg-black text-center px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl font-bold text-white mb-8">Want to join our journey?</h2>
          <Link href="/connect">
            <span className="inline-block px-8 py-4 bg-primary text-black font-bold rounded-xl hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(0,255,136,0.4)] transition-all cursor-pointer">
              Collaborate With Us
            </span>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
