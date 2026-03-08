import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "Koldify transformed our outbound pipeline. We enriched 50K contacts in minutes with 99% accuracy.",
    name: "Sarah Chen",
    role: "VP Sales, TechCorp",
    initials: "SC",
  },
  {
    quote: "The API is incredibly fast and reliable. We integrated it into our CRM in under a day.",
    name: "Marcus Johnson",
    role: "CTO, GrowthIO",
    initials: "MJ",
  },
  {
    quote: "Best ROI we've seen from any sales tool. The data quality is unmatched in the industry.",
    name: "Elena Petrova",
    role: "Head of Growth, ScaleUp",
    initials: "EP",
  },
  {
    quote: "Koldify scaled our lead enrichment pipeline effortlessly with a clean, API-first integration.",
    name: "Cristofer Levin",
    role: "Engineering Lead, Throxy",
    initials: "CL",
  },
  {
    quote: "Koldify gives us exactly the data we need — at a fraction of what we used to pay with legacy tools.",
    name: "Martin Ekstrom",
    role: "RevOps, Solufinance",
    initials: "ME",
  },
];

const Testimonials = () => (
  <section className="py-24 lg:py-32 overflow-hidden">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-4"
      >
        <p className="text-sm text-primary font-semibold tracking-wider uppercase mb-3">Testimonials</p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">What our clients <span className="gradient-text">are saying</span></h2>
        <p className="text-muted-foreground mt-4 max-w-xl mx-auto">Koldify powers the GTM systems of top-performing Growth, SalesOps, and RevOps teams.</p>
      </motion.div>
    </div>

    {/* Scrolling row */}
    <div className="relative mt-12">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
      <motion.div
        className="flex gap-6 px-6"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        style={{ width: "fit-content" }}
      >
        {[...testimonials, ...testimonials].map(({ quote, name, role, initials }, i) => (
          <div
            key={i}
            className="glass rounded-xl p-6 glow-border min-w-[320px] max-w-[360px] flex flex-col justify-between shrink-0"
          >
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">"{quote}"</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                {initials}
              </div>
              <div>
                <p className="text-sm font-semibold">{name}</p>
                <p className="text-xs text-muted-foreground">{role}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default Testimonials;
