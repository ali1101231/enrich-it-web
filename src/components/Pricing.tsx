import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Starter",
    price: "$49",
    desc: "For individuals getting started",
    features: ["1,000 credits/mo", "Email verification", "CSV export", "Basic support"],
    featured: false,
  },
  {
    name: "Growth",
    price: "$149",
    desc: "For growing sales teams",
    features: ["10,000 credits/mo", "All enrichment tools", "API access", "CRM integrations", "Priority support"],
    featured: true,
  },
  {
    name: "Scale",
    price: "$499",
    desc: "For enterprise-grade needs",
    features: ["50,000 credits/mo", "Unlimited users", "Custom integrations", "Dedicated CSM", "SLA guarantee"],
    featured: false,
  },
];

const Pricing = () => (
  <section id="pricing" className="py-24 lg:py-32 relative">
    <div className="absolute inset-0 hero-glow opacity-30" />
    <div className="container mx-auto px-4 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <p className="text-sm text-primary font-semibold tracking-wider uppercase mb-3">Pricing</p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">Simple, <span className="gradient-text">transparent pricing</span></h2>
      </motion.div>
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {plans.map(({ name, price, desc, features, featured }, i) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: featured ? 1.02 : 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.1, duration: 0.5, type: "spring", stiffness: 150 }}
            whileHover={{ y: -8, scale: featured ? 1.04 : 1.02, transition: { duration: 0.25 } }}
            className={`rounded-xl p-6 lg:p-8 flex flex-col ${featured ? "gradient-primary shadow-2xl shadow-primary/20" : "glass glow-border"}`}
          >
            {featured && <span className="text-xs font-bold uppercase tracking-wider mb-4 text-primary-foreground/80">Recommended</span>}
            <h3 className={`text-xl font-bold ${featured ? "text-primary-foreground" : ""}`}>{name}</h3>
            <p className={`text-sm mt-1 mb-4 ${featured ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{desc}</p>
            <div className={`text-4xl font-extrabold mb-1 ${featured ? "text-primary-foreground" : ""}`}>{price}<span className={`text-base font-normal ${featured ? "text-primary-foreground/60" : "text-muted-foreground"}`}>/mo</span></div>
            <ul className="space-y-3 my-6 flex-1">
              {features.map((f) => (
                <li key={f} className={`flex items-center gap-2 text-sm ${featured ? "text-primary-foreground/90" : "text-muted-foreground"}`}>
                  <Check size={14} className={featured ? "text-primary-foreground" : "text-primary"} /> {f}
                </li>
              ))}
            </ul>
            <Button variant={featured ? "hero-outline" : "hero"} className={`w-full ${featured ? "border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" : ""}`}>
              Get Started
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Pricing;
