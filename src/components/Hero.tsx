import { Button } from "@/components/ui/button";
import { Play, ArrowRight, Mail, Building2, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";

const FloatingCard = ({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
  <motion.div
    className={`glass rounded-xl p-3 shadow-xl ${className}`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: delay + 0.8, duration: 0.6, ease: "easeOut" }}
  >
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 4 + delay, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  </motion.div>
);

const Hero = () => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
    <div className="absolute inset-0 bg-grid opacity-20" />
    <div className="absolute inset-0 hero-glow" />
    <motion.div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl"
      animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/5 blur-3xl"
      animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.5, 0.2] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    />

    <div className="container mx-auto px-4 relative z-10">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5, type: "spring", stiffness: 200 }}
          className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 text-xs text-muted-foreground mb-8"
        >
          <Zap size={12} className="text-primary" />
          Now with AI-powered enrichment
          <ArrowRight size={10} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, type: "spring", stiffness: 100 }}
          className="text-5xl sm:text-6xl lg:text-8xl font-extrabold tracking-tight leading-[1.05] mb-6"
        >
          The Growth Engine<br />
          for <span className="gradient-text">B2B Data</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
        >
          Find people, enrich companies, verify emails, and build better lead lists — all in one platform.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button variant="hero" size="lg" className="text-base px-8 gap-2 h-12">
            Start for Free <ArrowRight size={16} />
          </Button>
          <Button variant="hero-outline" size="lg" className="text-base px-8 gap-2 h-12">
            <Play size={16} /> Watch Demo
          </Button>
        </motion.div>
      </div>

      <div className="hidden lg:block">
        <FloatingCard className="absolute top-1/4 left-8 xl:left-16" delay={0}>
          <div className="flex items-center gap-2 text-xs">
            <Mail size={14} className="text-primary" />
            <span className="text-muted-foreground">Email verified</span>
            <span className="text-emerald-500 text-[10px] font-semibold">✓ 99.2%</span>
          </div>
        </FloatingCard>
        <FloatingCard className="absolute top-1/3 right-8 xl:right-16" delay={0.5}>
          <div className="flex items-center gap-2 text-xs">
            <Building2 size={14} className="text-accent" />
            <span className="text-muted-foreground">Company enriched</span>
          </div>
        </FloatingCard>
        <FloatingCard className="absolute bottom-1/4 left-16 xl:left-32" delay={1}>
          <div className="flex items-center gap-2 text-xs">
            <Users size={14} className="text-primary" />
            <span className="text-muted-foreground">+2,450 leads found</span>
          </div>
        </FloatingCard>
      </div>
    </div>
  </section>
);

export default Hero;
