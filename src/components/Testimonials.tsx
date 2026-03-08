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
];

const Testimonials = () => (
  <section className="py-24 lg:py-32">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <p className="text-sm text-primary font-semibold tracking-wider uppercase mb-3">Testimonials</p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">Loved by <span className="gradient-text">growth teams</span></h2>
      </div>
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {testimonials.map(({ quote, name, role, avatar }) => (
          <div key={name} className="glass rounded-xl p-6 glow-border">
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
  </section>
);

export default Testimonials;
