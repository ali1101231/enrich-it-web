import React, { useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Upload, Sparkles, Download } from "lucide-react";
import { cn } from "@/lib/utils";

function AnimatedContent({ children, delay = 0, direction = "vertical", className = "" }: {
  children: React.ReactNode;
  delay?: number;
  direction?: "vertical" | "horizontal";
  className?: string;
}) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: direction === "vertical" ? 30 : 0, x: direction === "horizontal" ? -30 : 0 }}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] as const }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const steps = [
  {
    id: 0,
    number: "01",
    icon: Upload,
    title: "Import or Search",
    description: "Upload your CSV or search our database of 250M+ contacts and 60M+ companies to find your ideal prospects.",
  },
  {
    id: 1,
    number: "02",
    icon: Sparkles,
    title: "Enrich & Verify",
    description: "Automatically enrich contacts with verified emails, phone numbers, company data and social profiles in real-time.",
  },
  {
    id: 2,
    number: "03",
    icon: Download,
    title: "Export or Sync",
    description: "Push enriched data directly to your CRM, export as CSV, or integrate via our lightning-fast API.",
  },
];

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="how-it-works" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 hero-glow opacity-40" />
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20">
          <AnimatedContent delay={0.1}>
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-6">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
              <span className="text-sm font-medium text-primary">How it works</span>
            </div>
          </AnimatedContent>
          <AnimatedContent delay={0.2}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight mb-6">
              Three steps to <span className="gradient-text">better data</span>
            </h2>
          </AnimatedContent>
          <AnimatedContent delay={0.3}>
            <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
              Our platform works seamlessly to find, enrich, and deliver the data you need.
              <br className="hidden md:block" /> Simple steps. Powerful results.
            </p>
          </AnimatedContent>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 items-start max-w-6xl mx-auto">
          {/* Left: Steps */}
          <div className="lg:col-span-5 flex flex-col lg:pr-12 lg:border-r lg:border-border">
            {steps.map((step, index) => {
              const isActive = activeStep === index;
              const isCompleted = index < activeStep;
              const Icon = step.icon;

              return (
                <React.Fragment key={step.id}>
                  <AnimatedContent delay={0.4 + index * 0.1} direction="horizontal">
                    <div
                      onClick={() => setActiveStep(index)}
                      className={cn(
                        "group flex gap-6 p-4 rounded-2xl transition-all duration-300 cursor-pointer border border-transparent",
                        isActive ? "bg-card border-border/50 shadow-lg shadow-primary/[0.04]" : "hover:bg-card/50"
                      )}
                    >
                      {/* Step Indicator */}
                      <div className="shrink-0 mt-1">
                        {isCompleted ? (
                          <div className="w-14 h-14 rounded-full bg-accent/15 flex items-center justify-center transition-all duration-500">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="hsl(var(--accent))" />
                            </svg>
                          </div>
                        ) : isActive ? (
                          <div className="w-14 h-14 relative flex items-center justify-center">
                            <motion.div
                              className="absolute inset-0 rounded-full"
                              style={{ background: "conic-gradient(from 0deg, hsl(var(--background)), hsl(var(--primary)))" }}
                              animate={{ rotate: 360 }}
                              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            />
                            <div className="absolute inset-[2px] bg-background rounded-full z-10" />
                            <span className="relative z-20 text-xl font-semibold text-primary">{step.number}</span>
                          </div>
                        ) : (
                          <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center text-muted-foreground group-hover:bg-muted transition-all duration-300">
                            <span className="text-xl font-medium">{step.number}</span>
                          </div>
                        )}
                      </div>

                      {/* Text */}
                      <div className="flex flex-col pt-3">
                        <h3 className="text-lg font-semibold font-display mb-2 text-foreground">
                          {step.title}
                        </h3>
                        <p className={cn(
                          "text-sm leading-relaxed transition-colors duration-300 max-w-[360px]",
                          isActive ? "text-muted-foreground" : "text-muted-foreground/60"
                        )}>
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </AnimatedContent>

                  {index !== steps.length - 1 && (
                    <div className="w-full px-4">
                      <div className="w-full h-px bg-border my-2" />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Right: Preview */}
          <div className="lg:col-span-7 flex flex-col gap-8 sticky top-8 lg:pl-12">
            <AnimatedContent delay={0.4} className="w-full">
              <div className="relative w-full aspect-[4/3] bg-secondary rounded-[32px] overflow-hidden border border-border/50 shadow-2xl shadow-primary/[0.05] p-8 md:p-12">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, y: 20, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.98 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="w-full h-full bg-card rounded-2xl border border-border/50 shadow-sm overflow-hidden flex flex-col items-center justify-center gap-4"
                  >
                    {(() => {
                      const Icon = steps[activeStep].icon;
                      return (
                        <>
                          <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center shadow-lg shadow-primary/20">
                            <Icon size={32} className="text-primary-foreground" />
                          </div>
                          <h3 className="text-xl font-bold font-display text-foreground">{steps[activeStep].title}</h3>
                          <p className="text-sm text-muted-foreground text-center max-w-xs">{steps[activeStep].description}</p>
                        </>
                      );
                    })()}
                  </motion.div>
                </AnimatePresence>

                <div className="absolute top-0 right-0 p-8 opacity-50 pointer-events-none">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-2xl" />
                </div>
              </div>
            </AnimatedContent>

            <AnimatedContent delay={0.6}>
              <div className="pl-4 border-l-2 border-primary">
                <h4 className="text-lg font-semibold font-display text-foreground mb-1">
                  Smarter tools, bigger results.
                </h4>
                <p className="text-sm text-muted-foreground">
                  Leverage enriched data to optimize every campaign for maximum impact.
                </p>
              </div>
            </AnimatedContent>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
