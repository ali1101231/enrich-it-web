import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    quote: "Koldify transformed our outbound pipeline. We enriched 50K contacts in minutes with 99% accuracy.",
    name: "Sarah Chen",
    role: "VP Sales, TechCorp",
    avatar: "SC",
  },
  {
    quote: "The API is incredibly fast and reliable. We integrated it into our CRM in under a day.",
    name: "Marcus Johnson",
    role: "CTO, GrowthIO",
    avatar: "MJ",
  },
  {
    quote: "Best ROI we've seen from any sales tool. The data quality is unmatched in the industry.",
    name: "Elena Petrova",
    role: "Head of Growth, ScaleUp",
    avatar: "EP",
  },
  {
    quote: "The email accuracy and real-time match are better than anything we've seen — even on catch-alls.",
    name: "Marilyn George",
    role: "Sales Director, Outreach Inc",
    avatar: "MG",
  },
  {
    quote: "Koldify scaled our lead enrichment pipeline effortlessly with a clean, API-first integration.",
    name: "Cristofer Levin",
    role: "Engineering Lead, DataSync",
    avatar: "CL",
  },
];

const Testimonials = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 340;
    scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section className="py-24 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-sm text-primary font-semibold tracking-wider uppercase mb-3">Testimonials</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Loved by <span className="gradient-text">growth teams</span>
          </h2>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Scroll arrows */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-card/80 backdrop-blur border border-border/50 shadow-md hidden md:flex"
            onClick={() => scroll("left")}
          >
            <ChevronLeft size={18} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-card/80 backdrop-blur border border-border/50 shadow-md hidden md:flex"
            onClick={() => scroll("right")}
          >
            <ChevronRight size={18} />
          </Button>

          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-background to-transparent z-[5] pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent z-[5] pointer-events-none" />

          {/* Scrollable cards */}
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto scrollbar-hide px-2 py-2 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {testimonials.map(({ quote, name, role, avatar }) => (
              <div
                key={name}
                className="min-w-[300px] max-w-[340px] flex-shrink-0 snap-start glass rounded-xl p-6 glow-border flex flex-col justify-between"
              >
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">"{quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
                    {avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{name}</p>
                    <p className="text-xs text-muted-foreground">{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
