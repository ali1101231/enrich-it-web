import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 250, suffix: "M+", label: "Contacts indexed" },
  { value: 60, suffix: "M+", label: "Companies enriched" },
  { value: 35, suffix: "M+", label: "Domains mapped to LinkedIn URLs" },
  { value: 120, suffix: "+", label: "Countries covered" },
];

const AnimatedNumber = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          setIsVisible(true);
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div 
      ref={ref} 
      className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display leading-none text-primary-foreground transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {count}{suffix}
    </div>
  );
};

const StatCard = ({ value, suffix, label, index }: { value: number; suffix: string; label: string; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`text-center p-6 rounded-2xl cursor-pointer transition-all duration-500 ease-out group ${
        isHovered ? "bg-primary-foreground/10 scale-105" : "bg-transparent scale-100"
      }`}
      style={{ 
        transitionDelay: `${index * 100}ms`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`transition-transform duration-300 ${isHovered ? "scale-110" : "scale-100"}`}>
        <AnimatedNumber target={value} suffix={suffix} />
      </div>
      <p className={`text-sm mt-4 font-medium transition-all duration-300 ${
        isHovered ? "text-primary-foreground/80" : "text-primary-foreground/50"
      }`}>
        {label}
      </p>
      <div className={`h-0.5 w-0 mx-auto mt-3 rounded-full bg-primary-foreground/30 transition-all duration-500 ${
        isHovered ? "w-12" : "w-0"
      }`} />
    </div>
  );
};

const Stats = () => (
  <section className="py-24 lg:py-32 relative overflow-hidden">
    {/* Gradient background */}
    <div className="absolute inset-0 gradient-primary opacity-95" />
    <div className="absolute inset-0 bg-grid opacity-[0.05]" />
    
    {/* Animated glow orbs */}
    <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-foreground/5 rounded-full blur-3xl animate-pulse" />
    <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

    <div className="container mx-auto px-4 relative z-10">
      {/* Heading */}
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-primary-foreground/90 leading-tight">
          Built for high-volume
          <br />
          contact and company enrichment
        </h2>
      </div>

      {/* Divider with animation */}
      <div className="border-t border-primary-foreground/10 mb-12 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/20 to-transparent animate-pulse" />
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
        {stats.map(({ value, suffix, label }, index) => (
          <StatCard key={label} value={value} suffix={suffix} label={label} index={index} />
        ))}
      </div>
    </div>
  </section>
);

export default Stats;
