import { useState } from "react";
import { Check, ArrowUpRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const plans = [
  {
    id: "starter",
    name: "Starter",
    description: "Essential tools for small teams and startups.",
    monthlyPrice: 29,
    annualPrice: 24,
    features: [
      "Up to 5 team members",
      "Basic analytics dashboard",
      "24/7 email support",
      "1GB storage limit",
    ],
    popular: false,
  },
  {
    id: "business",
    name: "Business",
    description: "Advanced features for growing companies.",
    monthlyPrice: 99,
    annualPrice: 79,
    features: [
      "Up to 20 team members",
      "Advanced performance reporting",
      "Priority chat & email support",
      "10GB storage limit",
      "Custom integrations",
    ],
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Full customization for large organizations.",
    monthlyPrice: 299,
    annualPrice: 249,
    features: [
      "Unlimited team members",
      "Custom analytics & reporting",
      "Dedicated success manager",
      "Unlimited storage",
      "SSO & advanced security",
      "SLA guarantees",
    ],
    popular: false,
  },
];

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section id="pricing" className="py-24 lg:py-32 relative">
      <div className="absolute inset-0 hero-glow opacity-20" />
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Simple Pricing</span>
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight mb-4"
          >
            Choose the plan that <span className="gradient-text">fits your scale</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground max-w-lg mx-auto"
          >
            Transparent pricing with no hidden fees. Start small and upgrade as you grow.
          </motion.p>

          {/* Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 inline-flex items-center gap-3"
          >
            <span className={cn("text-sm font-medium transition-colors", !isAnnual ? "text-foreground" : "text-muted-foreground")}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={cn(
                "relative w-12 h-6 rounded-full transition-colors duration-300",
                isAnnual ? "bg-primary" : "bg-muted"
              )}
            >
              <motion.div
                className="absolute top-0.5 left-0.5 w-5 h-5 bg-primary-foreground rounded-full"
                animate={{ x: isAnnual ? 24 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </button>
            <div className="flex items-center gap-2">
              <span className={cn("text-sm font-medium transition-colors", isAnnual ? "text-foreground" : "text-muted-foreground")}>
                Annually
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-accent/15 text-accent px-2 py-0.5 rounded-full">
                Save 20%
              </span>
            </div>
          </motion.div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {plans.map((plan, index) => {
            const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div
                  className={cn(
                    "rounded-2xl p-7 lg:p-8 flex flex-col h-full transition-all duration-300",
                    plan.popular
                      ? "gradient-primary text-primary-foreground shadow-2xl shadow-primary/25 scale-[1.03] ring-1 ring-primary/30"
                      : "bg-card border border-border/50 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/[0.04]"
                  )}
                >
                  {plan.popular && (
                    <span className="inline-flex self-start text-[10px] font-bold uppercase tracking-widest mb-4 px-3 py-1 rounded-full bg-primary-foreground/15 text-primary-foreground">
                      Most Popular
                    </span>
                  )}

                  <h3 className={cn("text-xl font-bold font-display", plan.popular ? "text-primary-foreground" : "text-foreground")}>
                    {plan.name}
                  </h3>
                  <p className={cn("text-sm mt-1 mb-5", plan.popular ? "text-primary-foreground/70" : "text-muted-foreground")}>
                    {plan.description}
                  </p>

                  <div className={cn("mb-6", plan.popular ? "text-primary-foreground" : "text-foreground")}>
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={price}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="text-5xl font-extrabold font-display inline-block"
                      >
                        ${price}
                      </motion.span>
                    </AnimatePresence>
                    <span className={cn("text-base font-normal ml-1", plan.popular ? "text-primary-foreground/50" : "text-muted-foreground")}>
                      /mo
                    </span>
                  </div>

                  <div className="mb-7">
                    {plan.popular ? (
                      <button className="w-full flex items-center justify-center gap-1.5 rounded-xl h-11 font-medium text-sm bg-background text-foreground hover:bg-background/90 transition-colors">
                        Get started
                        <ArrowUpRight size={16} />
                      </button>
                    ) : (
                      <button className="w-full flex items-center justify-center gap-1.5 rounded-xl h-11 font-medium text-sm bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors">
                        Start free trial
                      </button>
                    )}
                  </div>

                  <div className="flex-1">
                    <p className={cn("text-xs font-semibold uppercase tracking-wider mb-4", plan.popular ? "text-background/50" : "text-muted-foreground")}>
                      What's included
                    </p>
                    <ul className="space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className={cn("flex items-center gap-2.5 text-sm", plan.popular ? "text-background/80" : "text-muted-foreground")}>
                          <div className={cn("w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0", plan.popular ? "bg-background/15" : "bg-accent/15")}>
                            <Check size={12} className={plan.popular ? "text-background" : "text-accent"} />
                          </div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center text-xs text-muted-foreground mt-12"
        >
          Prices exclude any applicable taxes.{" "}
          <a href="#" className="underline hover:text-foreground transition-colors">
            Terms & Conditions
          </a>{" "}
          apply.
        </motion.p>
      </div>
    </section>
  );
};

export default Pricing;
