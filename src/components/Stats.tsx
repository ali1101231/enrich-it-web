import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 250, suffix: "M+", label: "Contacts" },
  { value: 60, suffix: "M+", label: "Companies" },
  { value: 99, suffix: "%", label: "Email Accuracy" },
  { value: 120, suffix: "+", label: "Countries" },
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
    <div ref={ref} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold gradient-text">
      {count}{suffix}
    </div>
  );
};

const Stats = () => (
  <section className="py-24 lg:py-32">
    <div className="container mx-auto px-4">
      <div className="glass rounded-2xl p-8 sm:p-12 lg:p-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {stats.map(({ value, suffix, label }) => (
            <div key={label} className="text-center">
              <AnimatedNumber target={value} suffix={suffix} />
              <p className="text-sm text-muted-foreground mt-2">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Stats;
