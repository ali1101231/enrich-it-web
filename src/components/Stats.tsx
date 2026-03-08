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
    <div ref={ref} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display leading-none" style={{
      background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    }}>
      {count}{suffix}
    </div>
  );
};

const Stats = () => (
  <section className="py-24 lg:py-32 relative overflow-hidden">
    {/* Dark gradient background like Stripe */}
    <div className="absolute inset-0 gradient-primary opacity-95" />
    <div className="absolute inset-0 bg-grid opacity-[0.05]" />

    <div className="container mx-auto px-4 relative z-10">
      {/* Heading */}
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-primary-foreground/90 leading-tight">
          The backbone of
          <br />
          B2B data intelligence
        </h2>
      </div>

      {/* Divider */}
      <div className="border-t border-primary-foreground/10 mb-12" />

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
        {stats.map(({ value, suffix, label }) => (
          <div key={label} className="text-center">
            <div className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display leading-none text-primary-foreground/90">
              {value}{suffix}
            </div>
            <p className="text-sm text-primary-foreground/50 mt-3 font-medium">{label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Stats;
