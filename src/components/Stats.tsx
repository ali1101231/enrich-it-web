import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 250, suffix: "M+", label: "Contacts in database" },
  { value: 60, suffix: "M+", label: "Companies enriched" },
  { value: 99, suffix: "%", label: "Email accuracy" },
  { value: 120, suffix: "+", label: "Countries covered" },
];

const AnimatedNumber = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1500;
          const steps = 40;
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
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display gradient-text leading-none">
      {count}{suffix}
    </div>
  );
};

const Stats = () => (
  <section className="py-24 lg:py-32">
    <div className="container mx-auto px-4">
      <div className="bg-card rounded-3xl border border-border/50 p-10 sm:p-14 lg:p-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-[0.03]" />
        <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
          {stats.map(({ value, suffix, label }) => (
            <div key={label} className="text-center">
              <AnimatedNumber target={value} suffix={suffix} />
              <p className="text-sm text-muted-foreground mt-3 font-medium">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Stats;
