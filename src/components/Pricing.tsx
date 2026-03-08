import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";

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
    <div className="absolute inset-0 hero-glow opacity-20" />
    <div className="container mx-auto px-4 relative z-10">
      <div className="text-center mb-16">
        <div className="section-divider" />
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight">
          Simple, <span className="gradient-text">transparent pricing</span>
        </h2>
        <p className="text-muted-foreground mt-4">No hidden fees. Cancel anytime.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
        {plans.map(({ name, price, desc, features, featured }) => (
          <div
            key={name}
            className={`rounded-2xl p-7 lg:p-8 flex flex-col transition-all duration-500 ${
              featured
                ? "gradient-primary shadow-2xl shadow-primary/15 scale-[1.03] ring-1 ring-primary/20"
                : "bg-card border border-border/50 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/[0.04]"
            }`}
          >
            {featured && (
              <span className="inline-flex self-start text-[10px] font-bold uppercase tracking-widest mb-4 px-3 py-1 rounded-full bg-primary-foreground/15 text-primary-foreground">
                Most Popular
              </span>
            )}
            <h3 className={`text-xl font-bold font-display ${featured ? "text-primary-foreground" : ""}`}>{name}</h3>
            <p className={`text-sm mt-1 mb-5 ${featured ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{desc}</p>
            <div className={`text-5xl font-extrabold font-display mb-1 ${featured ? "text-primary-foreground" : ""}`}>
              {price}
              <span className={`text-base font-normal ml-1 ${featured ? "text-primary-foreground/50" : "text-muted-foreground"}`}>/mo</span>
            </div>
            <ul className="space-y-3 my-7 flex-1">
              {features.map((f) => (
                <li key={f} className={`flex items-center gap-2.5 text-sm ${featured ? "text-primary-foreground/90" : "text-muted-foreground"}`}>
                  <Check size={15} className={featured ? "text-primary-foreground/80" : "text-accent"} /> {f}
                </li>
              ))}
            </ul>
            <Button
              variant={featured ? "hero-outline" : "hero"}
              className={`w-full rounded-xl h-11 gap-2 ${featured ? "border-primary-foreground/25 text-primary-foreground hover:bg-primary-foreground/10" : ""}`}
            >
              Get Started <ArrowRight size={14} />
            </Button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Pricing;
