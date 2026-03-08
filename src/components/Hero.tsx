import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Zap, Shield, Globe } from "lucide-react";

const badges = [
  { icon: Zap, text: "Real-time enrichment" },
  { icon: Shield, text: "99% accuracy" },
  { icon: Globe, text: "120+ countries" },
];

const Hero = () => (
  <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-16">
    {/* Background */}
    <div className="absolute inset-0 bg-grid opacity-20" />
    <div className="absolute inset-0 hero-glow" />
    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/[0.06] blur-[120px]" />
    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />

    <div className="container mx-auto px-4 relative z-10">
      <div className="max-w-3xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-xs font-medium text-primary mb-8 opacity-0 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
          Now with AI-powered enrichment
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-[4.5rem] font-extrabold font-display tracking-tight leading-[1.08] mb-6 opacity-0 animate-fade-up" style={{ animationDelay: "0.2s" }}>
          The Growth Engine
          <br />
          for <span className="gradient-text">B2B Data</span>
        </h1>

        <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed opacity-0 animate-fade-up" style={{ animationDelay: "0.35s" }}>
          Find people, enrich companies, verify emails, and build better lead lists — all in one blazing-fast platform.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 opacity-0 animate-fade-up" style={{ animationDelay: "0.5s" }}>
          <Button variant="hero" size="lg" className="text-base px-8 gap-2 h-12 rounded-xl">
            Start for Free <ArrowRight size={16} />
          </Button>
          <Button variant="hero-outline" size="lg" className="text-base px-8 gap-2 h-12 rounded-xl">
            <Play size={16} /> Watch Demo
          </Button>
        </div>

        {/* Trust badges */}
        <div className="flex items-center justify-center gap-6 mt-12 opacity-0 animate-fade-up" style={{ animationDelay: "0.65s" }}>
          {badges.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-xs text-muted-foreground">
              <Icon size={14} className="text-primary/70" />
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
