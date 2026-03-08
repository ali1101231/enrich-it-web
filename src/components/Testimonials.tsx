const testimonials = [
  { quote: "Koldify transformed our outbound pipeline. We enriched 50K contacts in minutes with 99% accuracy.", name: "Sarah Chen", role: "VP Sales, TechCorp", avatar: "SC" },
  { quote: "The API is incredibly fast and reliable. We integrated it into our CRM in under a day.", name: "Marcus Johnson", role: "CTO, GrowthIO", avatar: "MJ" },
  { quote: "Best ROI we've seen from any sales tool. The data quality is unmatched in the industry.", name: "Elena Petrova", role: "Head of Growth, ScaleUp", avatar: "EP" },
  { quote: "The email accuracy and real-time match are better than anything we've seen — even on catch-alls.", name: "Marilyn George", role: "Sales Director, Outreach Inc", avatar: "MG" },
  { quote: "Koldify scaled our lead enrichment pipeline effortlessly with a clean, API-first integration.", name: "Cristofer Levin", role: "Engineering Lead, DataSync", avatar: "CL" },
];

const doubled = [...testimonials, ...testimonials];

const Testimonials = () => (
  <section className="py-24 lg:py-32">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <div className="section-divider" />
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight">
          Loved by <span className="gradient-text">growth teams</span>
        </h2>
      </div>

      <div className="relative max-w-6xl mx-auto overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="flex gap-5 animate-scroll-testimonials w-max">
          {doubled.map(({ quote, name, role, avatar }, i) => (
            <div
              key={`${name}-${i}`}
              className="min-w-[320px] max-w-[340px] flex-shrink-0 bg-card rounded-2xl p-7 border border-border/50 flex flex-col justify-between hover:border-primary/30 transition-all duration-300"
            >
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">"{quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-xs font-bold text-primary-foreground shadow-md shadow-primary/20">
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

export default Testimonials;
