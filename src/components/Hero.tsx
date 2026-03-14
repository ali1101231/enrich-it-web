import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Zap, Shield, Globe, Mail, Building2, X } from "lucide-react";

const FloatingCard = ({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) => (
  <div className={`bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl px-4 py-3 shadow-xl animate-float ${className}`} style={style}>
    {children}
  </div>
);

const badges = [
  { icon: Zap, text: "Email + phone enrichment" },
  { icon: Globe, text: "Domain → LinkedIn URL" },
  { icon: Shield, text: "Company LinkedIn enrichment" },
];

const Hero = () => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-center overflow-hidden pt-28">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute inset-0 hero-glow" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/[0.06] blur-[120px]" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-xs font-medium text-primary mb-8 opacity-0 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
            Built for enrichment workflows
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-[4.5rem] font-extrabold font-display tracking-tight leading-[1.08] mb-6 opacity-0 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Enrich B2B Contacts
            <br />
            & <span className="gradient-text">Companies</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed opacity-0 animate-fade-up" style={{ animationDelay: "0.35s" }}>
            Enrich email and phone data, map domains to LinkedIn URLs, and enrich company profiles from company LinkedIn URLs.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 opacity-0 animate-fade-up" style={{ animationDelay: "0.5s" }}>
            <Button variant="hero" size="lg" className="text-base px-8 gap-2 h-12 rounded-xl">
              Start for Free <ArrowRight size={16} />
            </Button>
            <Button variant="hero-outline" size="lg" className="text-base px-8 gap-2 h-12 rounded-xl">
              <Play size={16} /> Watch Demo
            </Button>
          </div>

          <div className="flex items-center justify-center gap-6 mt-12 opacity-0 animate-fade-up" style={{ animationDelay: "0.65s" }}>
            {badges.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-xs text-muted-foreground">
                <Icon size={14} className="text-primary/70" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Floating cards */}
        <div className="hidden lg:block">
          <FloatingCard className="absolute top-[28%] left-8 xl:left-16" style={{ animationDelay: "0s" }}>
            <div className="flex items-center gap-2.5 text-xs">
              <Mail size={15} className="text-primary" />
              <span className="text-muted-foreground font-medium">Email enriched</span>
              <span className="text-accent text-[11px] font-semibold">from name + domain</span>
            </div>
          </FloatingCard>
          <FloatingCard className="absolute top-[38%] right-8 xl:right-16" style={{ animationDelay: "2s" }}>
            <div className="flex items-center gap-2.5 text-xs">
              <Building2 size={15} className="text-accent" />
              <span className="text-muted-foreground font-medium">Company enriched from LinkedIn URL</span>
            </div>
          </FloatingCard>
          <FloatingCard className="absolute bottom-[26%] left-16 xl:left-28" style={{ animationDelay: "4s" }}>
            <div className="flex items-center gap-2.5 text-xs">
              <Globe size={15} className="text-primary" />
              <span className="text-muted-foreground font-medium">Domain mapped to LinkedIn URL</span>
            </div>
          </FloatingCard>
        </div>
      </div>

      {/* Video Preview Section */}
      <div className="container mx-auto px-4 relative z-10 mt-16 mb-8 opacity-0 animate-fade-up" style={{ animationDelay: "0.8s" }}>
        <div 
          className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden border border-border/50 bg-card/40 backdrop-blur-xl shadow-2xl cursor-pointer group"
          onClick={() => setShowVideo(true)}
        >
          {/* Video thumbnail area */}
          <div className="aspect-video bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center relative">
            {/* Mock UI preview */}
            <div className="absolute inset-8 rounded-xl bg-card/90 border border-border/30 shadow-lg flex items-center justify-center">
              <div className="flex items-center gap-3 px-6 py-3 bg-card rounded-full border border-border/50 shadow-md">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-primary text-xs">✦</span>
                </div>
                <span className="text-muted-foreground">Ask anything...</span>
              </div>
              {/* Animated cursor */}
              <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="animate-bounce">
                  <path d="M6 2L18 12L12 14L10 22L6 2Z" fill="currentColor" className="text-foreground"/>
                </svg>
              </div>
            </div>
            
            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                <Play size={32} className="text-primary-foreground ml-1" fill="currentColor" />
              </div>
            </div>
          </div>
          
          {/* Video progress bar */}
          <div className="absolute bottom-0 left-0 right-0 bg-background/90 backdrop-blur-sm px-4 py-3 flex items-center gap-3">
            <Play size={16} className="text-foreground" />
            <span className="text-xs text-muted-foreground font-mono">1:10</span>
            <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
              <div className="w-1/4 h-full bg-foreground/50 rounded-full" />
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 flex items-center justify-center">
                <span className="text-muted-foreground text-xs">🔊</span>
              </div>
              <div className="w-4 h-4 flex items-center justify-center">
                <span className="text-muted-foreground text-xs">⚙</span>
              </div>
              <div className="w-4 h-4 flex items-center justify-center">
                <span className="text-muted-foreground text-xs">⛶</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 z-50 bg-background/90 backdrop-blur-xl flex items-center justify-center p-4" onClick={() => setShowVideo(false)}>
          <div className="relative max-w-5xl w-full aspect-video bg-card rounded-2xl overflow-hidden border border-border/50 shadow-2xl" onClick={e => e.stopPropagation()}>
            <button 
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 flex items-center justify-center hover:bg-card transition-colors"
              onClick={() => setShowVideo(false)}
            >
              <X size={20} />
            </button>
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              <p>Video player would load here</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
