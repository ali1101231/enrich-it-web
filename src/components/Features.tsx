import React, { useRef } from "react";
import { Check, ArrowUpRight, Users, Building2, Globe } from "lucide-react";
import { motion, useInView } from "framer-motion";

interface AnimatedContentProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "vertical" | "horizontal";
  className?: string;
}

function AnimatedContent({ children, delay = 0, direction = "vertical", className = "" }: AnimatedContentProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const initialProps = direction === "horizontal"
    ? { opacity: 0, x: 20 }
    : { opacity: 0, y: 20 };
  const animateProps = direction === "horizontal"
    ? { opacity: 1, x: 0 }
    : { opacity: 1, y: 0 };
  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={initialProps}
        animate={isInView ? animateProps : initialProps}
        transition={{
          duration: 0.6,
          delay,
          ease: [0.25, 0.1, 0.25, 1] as const,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

const checklist = [
  "250M+ verified contacts",
  "Real-time data enrichment",
  "GDPR compliant processing",
];

const features = [
  {
    id: 1,
    icon: Users,
    title: "People Finder",
    description: "Search 250M+ contacts by role, company, location and more — instantly.",
  },
  {
    id: 2,
    icon: Building2,
    title: "Company Enricher",
    description: "Get firmographic data on 60M+ companies including revenue, size, and tech stack.",
  },
  {
    id: 3,
    icon: Globe,
    title: "Domain Search",
    description: "Find every verified email associated with any company domain in seconds.",
  },
];

const Features = () => {
  return (
    <section id="features" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 hero-glow opacity-30" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">

          {/* Left Column */}
          <div className="w-full lg:w-[440px] flex flex-col items-start shrink-0 justify-center">
            <AnimatedContent delay={0.1}>
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-6">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
                <span className="text-sm font-medium text-primary">Platform</span>
              </div>
            </AnimatedContent>

            <AnimatedContent delay={0.2}>
              <h3 className="text-3xl sm:text-4xl lg:text-[40px] leading-tight font-bold font-display text-foreground tracking-tight mb-6">
                Everything you need for <span className="gradient-text">B2B growth</span>
              </h3>
            </AnimatedContent>

            <AnimatedContent delay={0.3}>
              <p className="text-base leading-relaxed text-muted-foreground mb-8">
                Powerful tools to find, enrich, and verify your ideal customers at scale.
              </p>
            </AnimatedContent>

            <AnimatedContent delay={0.4}>
              <ul className="flex flex-col gap-4 mb-10">
                {checklist.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-primary-foreground" strokeWidth={3} />
                    </div>
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </AnimatedContent>

            <AnimatedContent delay={0.5}>
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-primary text-primary font-medium text-sm hover:bg-primary/10 active:scale-[0.98] transition-all group"
              >
                Get started
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </AnimatedContent>
          </div>

          {/* Right Column: Feature Cards */}
          <div className="w-full lg:w-[544px] flex flex-col gap-3 shrink-0 justify-center">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <AnimatedContent key={feature.id} delay={0.3 + index * 0.1} direction="horizontal">
                  <div className="relative w-full bg-card rounded-3xl overflow-hidden flex flex-col justify-start items-start group hover:shadow-lg hover:shadow-primary/[0.04] transition-all duration-300 border border-border/50 hover:border-primary/30">
                    <div className="py-8 pl-8 pr-24 w-full relative z-10">
                      <div className="flex items-start gap-5">
                        <div className="shrink-0 w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-md shadow-primary/15">
                          <Icon size={20} className="text-primary-foreground" />
                        </div>
                        <div className="flex flex-col gap-2">
                          <h4 className="text-lg font-semibold font-display text-foreground">
                            {feature.title}
                          </h4>
                          <p className="text-sm leading-relaxed text-muted-foreground">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Decorative background icon */}
                    <div className="absolute right-4 bottom-[-16px] opacity-[0.06] pointer-events-none group-hover:scale-110 transition-transform duration-500">
                      <Icon size={120} />
                    </div>
                  </div>
                </AnimatedContent>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
