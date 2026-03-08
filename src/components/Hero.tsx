import { Button } from "@/components/ui/button";
import { Play, ArrowRight, Mail, Building2, Users } from "lucide-react";

const FloatingCard = ({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) => (
  <div className={`glass rounded-xl p-3 shadow-xl animate-float ${className}`} style={style}>
    {children}
  </div>
);

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute inset-0 hero-glow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs text-muted-foreground mb-8 opacity-0 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <span className="w-1.5 h-1.5 rounded-full gradient-primary animate-pulse-glow" />
            Now with AI-powered enrichment
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6 opacity-0 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            The Growth Engine<br />
            for <span className="gradient-text">B2B Data</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 opacity-0 animate-fade-up" style={{ animationDelay: "0.35s" }}>
            Find people, enrich companies, verify emails, and build better lead lists — all in one platform.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-up" style={{ animationDelay: "0.5s" }}>
            <Button variant="hero" size="lg" className="text-base px-8 gap-2">
              Start for Free <ArrowRight size={16} />
            </Button>
            <Button variant="hero-outline" size="lg" className="text-base px-8 gap-2">
              <Play size={16} /> Watch Demo
            </Button>
          </div>
        </div>

        {/* Floating cards */}
        <div className="hidden lg:block">
          <FloatingCard className="absolute top-1/4 left-8 xl:left-16" style={{ animationDelay: "0s" } as React.CSSProperties}>
            <div className="flex items-center gap-2 text-xs">
              <Mail size={14} className="text-primary" />
              <span className="text-muted-foreground">Email verified</span>
              <span className="text-green-400 text-[10px]">✓ 99.2%</span>
            </div>
          </FloatingCard>
          <FloatingCard className="absolute top-1/3 right-8 xl:right-16" style={{ animationDelay: "2s" } as React.CSSProperties}>
            <div className="flex items-center gap-2 text-xs">
              <Building2 size={14} className="text-accent" />
              <span className="text-muted-foreground">Company enriched</span>
            </div>
          </FloatingCard>
          <FloatingCard className="absolute bottom-1/4 left-16 xl:left-32" style={{ animationDelay: "4s" } as React.CSSProperties}>
            <div className="flex items-center gap-2 text-xs">
              <Users size={14} className="text-primary" />
              <span className="text-muted-foreground">+2,450 leads found</span>
            </div>
          </FloatingCard>
        </div>
      </div>
    </section>
  );
};

export default Hero;
