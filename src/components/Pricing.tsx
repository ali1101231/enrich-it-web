import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";

type BillingCycle = "monthly" | "yearly";

const plans = [
  {
    name: "Starter",
    monthlyPrice: 49,
    yearlyPrice: 39,
    desc: "For individuals getting started",
    monthlyCredits: "1,000 credits/mo",
    yearlyCredits: "12,000 credits/yr",
    features: ["Email verification", "CSV export", "Basic support"],
    featured: false,
  },
  {
    name: "Growth",
    monthlyPrice: 149,
    yearlyPrice: 119,
    desc: "For growing sales teams",
    monthlyCredits: "10,000 credits/mo",
    yearlyCredits: "120,000 credits/yr",
    features: ["All enrichment tools", "API access", "CRM integrations", "Priority support"],
    featured: true,
  },
  {
    name: "Scale",
    monthlyPrice: 499,
    yearlyPrice: 399,
    desc: "For enterprise-grade needs",
    monthlyCredits: "50,000 credits/mo",
    yearlyCredits: "600,000 credits/yr",
    features: ["Unlimited users", "Custom integrations", "Dedicated CSM", "SLA guarantee"],
    featured: false,
  },
];

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");
  const [selectedPlan, setSelectedPlan] = useState("Growth");

  return (
    <section id="pricing" className="py-24 lg:py-32 relative">
      <div className="absolute inset-0 hero-glow opacity-20" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="section-divider" />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight">
            Simple, <span className="gradient-text">transparent pricing</span>
          </h2>
          <p className="text-muted-foreground mt-4">No hidden fees. Cancel anytime.</p>

          <div className="mt-8 inline-flex items-center rounded-full border border-border bg-card p-1">
            <button
              type="button"
              onClick={() => setBillingCycle("monthly")}
              aria-pressed={billingCycle === "monthly"}
              className={`px-4 h-9 rounded-full text-sm transition-colors ${
                billingCycle === "monthly" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle("yearly")}
              aria-pressed={billingCycle === "yearly"}
              className={`px-4 h-9 rounded-full text-sm transition-colors ${
                billingCycle === "yearly" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Yearly
            </button>
          </div>
          <p className="text-xs text-accent mt-2">Save ~20% with yearly billing</p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {plans.map(({ name, monthlyPrice, yearlyPrice, desc, monthlyCredits, yearlyCredits, features, featured }) => {
            const isSelected = selectedPlan === name;
            const price = billingCycle === "monthly" ? monthlyPrice : yearlyPrice;
            const cycleSuffix = billingCycle === "monthly" ? "/mo" : "/mo";
            const credits = billingCycle === "monthly" ? monthlyCredits : yearlyCredits;

            return (
              <div
                key={name}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedPlan(name)}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setSelectedPlan(name)}
                className={`rounded-2xl p-7 lg:p-8 flex flex-col transition-all duration-500 cursor-pointer ${
                  isSelected
                    ? "gradient-primary shadow-2xl shadow-primary/15 scale-[1.03] ring-1 ring-primary/30"
                    : featured
                      ? "bg-card border border-primary/30 shadow-lg shadow-primary/[0.08]"
                      : "bg-card border border-border/50 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/[0.04]"
                }`}
              >
                {(featured || isSelected) && (
                  <span
                    className={`inline-flex self-start text-[10px] font-bold uppercase tracking-widest mb-4 px-3 py-1 rounded-full ${
                      isSelected
                        ? "bg-primary-foreground/15 text-primary-foreground"
                        : "bg-primary/15 text-primary"
                    }`}
                  >
                    {isSelected ? "Selected" : "Most Popular"}
                  </span>
                )}

                <h3 className={`text-xl font-bold font-display ${isSelected ? "text-primary-foreground" : ""}`}>{name}</h3>
                <p className={`text-sm mt-1 mb-5 ${isSelected ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{desc}</p>

                <div className={`text-5xl font-extrabold font-display mb-1 ${isSelected ? "text-primary-foreground" : ""}`}>
                  ${price}
                  <span className={`text-base font-normal ml-1 ${isSelected ? "text-primary-foreground/50" : "text-muted-foreground"}`}>
                    {cycleSuffix}
                  </span>
                </div>

                <ul className="space-y-3 my-7 flex-1">
                  {[credits, ...features, ...(billingCycle === "yearly" ? ["Billed annually"] : [])].map((f) => (
                    <li key={`${name}-${f}`} className={`flex items-center gap-2.5 text-sm ${isSelected ? "text-primary-foreground/90" : "text-muted-foreground"}`}>
                      <Check size={15} className={isSelected ? "text-primary-foreground/80" : "text-accent"} /> {f}
                    </li>
                  ))}
                </ul>

                <Button
                  variant={isSelected ? "hero-outline" : "hero"}
                  onClick={() => setSelectedPlan(name)}
                  className={`w-full rounded-xl h-11 gap-2 ${isSelected ? "border-primary-foreground/25 text-primary-foreground hover:bg-primary-foreground/10" : ""}`}
                >
                  Choose {name} <ArrowRight size={14} />
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
