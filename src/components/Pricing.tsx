import { useEffect, useMemo, useState } from "react";
import { Check, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { websiteContentApi, type WebsitePricingFeature, type WebsitePricingPlan } from "@/lib/website-content-api";

type BillingCycle = "monthly" | "yearly";

interface PricingPlanGroup {
  key: string;
  name: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  isPopular: boolean;
  sortOrder: number;
  monthlyPlan?: WebsitePricingPlan;
  yearlyPlan?: WebsitePricingPlan;
  fallbackPlan?: WebsitePricingPlan;
}

const fadeUpVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  }),
};

function normalizeBillingPeriod(period: string): BillingCycle | "other" {
  const normalized = period.trim().toLowerCase();

  if (["monthly", "month", "mo"].includes(normalized)) return "monthly";
  if (["annual", "annually", "yearly", "year", "yr"].includes(normalized)) return "yearly";

  return "other";
}

function getPlanGroupKey(plan: WebsitePricingPlan): string {
  return plan.name.trim().toLowerCase();
}

function sortFeatures(features: WebsitePricingFeature[]): WebsitePricingFeature[] {
  return [...features].sort((a, b) => a.sortOrder - b.sortOrder);
}

function formatBillingPeriod(period: string): string {
  switch (period.toLowerCase()) {
    case "monthly": return "/mo";
    case "annual":
    case "yearly": return "/yr";
    default: return `/${period}`;
  }
}

const Pricing = () => {
  const [plans, setPlans] = useState<WebsitePricingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [billing, setBilling] = useState<BillingCycle>("monthly");

  useEffect(() => {
    let isMounted = true;

    websiteContentApi
      .getPricing()
      .then((data) => {
        if (!isMounted) return;
        setPlans(data);
      })
      .catch(console.error)
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const activePlans = useMemo(
    () => plans.filter((plan) => plan.isActive !== false),
    [plans],
  );

  const groupedPlans = useMemo(() => {
    const map = new Map<string, PricingPlanGroup>();

    for (const plan of activePlans) {
      const key = getPlanGroupKey(plan);
      const existing = map.get(key);

      if (!existing) {
        map.set(key, {
          key,
          name: plan.name,
          subtitle: plan.subtitle,
          description: plan.description,
          ctaText: plan.ctaText,
          ctaHref: plan.ctaHref,
          isPopular: plan.isPopular,
          sortOrder: plan.sortOrder,
          monthlyPlan: undefined,
          yearlyPlan: undefined,
          fallbackPlan: undefined,
        });
      }

      const target = map.get(key)!;
      if (plan.isPopular) target.isPopular = true;

      const period = normalizeBillingPeriod(plan.billingPeriod);
      if (period === "monthly") target.monthlyPlan = plan;
      else if (period === "yearly") target.yearlyPlan = plan;
      else target.fallbackPlan = plan;
    }

    return [...map.values()].sort((a, b) => a.sortOrder - b.sortOrder);
  }, [activePlans]);

  const hasMonthly = useMemo(
    () => groupedPlans.some((group) => !!group.monthlyPlan),
    [groupedPlans],
  );

  const hasYearly = useMemo(
    () => groupedPlans.some((group) => !!group.yearlyPlan),
    [groupedPlans],
  );

  const showBillingToggle = hasMonthly && hasYearly;

  useEffect(() => {
    if (!showBillingToggle) {
      if (!hasMonthly && hasYearly) setBilling("yearly");
      if (hasMonthly && !hasYearly) setBilling("monthly");
    }
  }, [hasMonthly, hasYearly, showBillingToggle]);

  const getPlanForBilling = (group: PricingPlanGroup): WebsitePricingPlan | undefined => {
    if (billing === "monthly") {
      return group.monthlyPlan ?? group.yearlyPlan ?? group.fallbackPlan;
    }

    return group.yearlyPlan ?? group.monthlyPlan ?? group.fallbackPlan;
  };

  return (
    <section id="pricing" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute inset-0 hero-glow opacity-40" />
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariants}
            custom={0.05}
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Simple Pricing</span>
            </div>
          </motion.div>

          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariants}
            custom={0.12}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight mb-4"
          >
            Choose a plan that <span className="gradient-text">fits your workflow</span>
          </motion.h2>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariants}
            custom={0.18}
            className="text-muted-foreground max-w-lg mx-auto"
          >
            Every plan includes email and phone enrichment, domain-to-LinkedIn mapping, and company enrichment from LinkedIn URLs.
          </motion.p>
        </div>

        {/* Billing Toggle */}
        {showBillingToggle && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariants}
            custom={0.22}
            className="flex justify-center mb-12"
          >
            <div className="inline-flex items-center rounded-full border border-border/70 bg-card p-1.5 shadow-sm">
              <button
                onClick={() => setBilling("monthly")}
                className={cn(
                  "relative px-6 sm:px-8 py-2.5 rounded-full text-sm font-semibold transition-colors",
                  billing === "monthly" ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {billing === "monthly" && (
                  <motion.div
                    layoutId="billing-pill"
                    className="absolute inset-0 rounded-full gradient-primary"
                    transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
                  />
                )}
                <span className="relative z-10">Monthly</span>
              </button>

              <button
                onClick={() => setBilling("yearly")}
                className={cn(
                  "relative px-6 sm:px-8 py-2.5 rounded-full text-sm font-semibold transition-colors",
                  billing === "yearly" ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {billing === "yearly" && (
                  <motion.div
                    layoutId="billing-pill"
                    className="absolute inset-0 rounded-full gradient-primary"
                    transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
                  />
                )}
                <span className="relative z-10 inline-flex items-center gap-2">
                  Yearly
                  <span className={cn(
                    "text-[10px] px-2 py-0.5 rounded-full border",
                    billing === "yearly"
                      ? "border-primary-foreground/30 bg-primary-foreground/10"
                      : "border-primary/25 bg-primary/10 text-primary",
                  )}>
                    Save
                  </span>
                </span>
              </button>
            </div>
          </motion.div>
        )}

        {/* Loading state */}
        {loading && (
          <div className="grid md:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="rounded-3xl p-8 bg-card border border-border/60 animate-pulse h-[520px]"
              />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && groupedPlans.length === 0 && (
          <p className="text-center text-muted-foreground py-12">
            No pricing plans available at this time.
          </p>
        )}

        {/* Pricing Cards */}
        {!loading && groupedPlans.length > 0 && (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {groupedPlans.map((group, index) => {
              const plan = getPlanForBilling(group);
              if (!plan) return null;

              const currentPeriod = normalizeBillingPeriod(plan.billingPeriod);
              const periodSuffix = currentPeriod === "other"
                ? formatBillingPeriod(plan.billingPeriod)
                : currentPeriod === "monthly"
                  ? "/mo"
                  : "/yr";

              const alternatePlan = billing === "monthly" ? group.yearlyPlan : group.monthlyPlan;
              const sortedFeatures = sortFeatures(plan.features);

              return (
              <motion.div
                key={group.key}
                initial="hidden"
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                variants={fadeUpVariants}
                custom={0.26 + index * 0.08}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                className="relative group isolate"
              >
                <div className="absolute -inset-4 rounded-[2rem] bg-primary/35 blur-3xl opacity-0 transition-all duration-400 group-hover:opacity-70 pointer-events-none" />
                <div
                  className={cn(
                    "relative z-10 rounded-3xl p-8 flex flex-col h-full border transition-all duration-300 overflow-hidden group-hover:-translate-y-1 group-hover:shadow-2xl group-hover:shadow-primary/30",
                    group.isPopular
                      ? "gradient-primary text-primary-foreground border-primary/30 shadow-2xl shadow-primary/25"
                      : "bg-card border-border/60 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/[0.06]"
                  )}
                >
                  {!group.isPopular && <div className="absolute inset-0 hero-glow opacity-10 pointer-events-none" />}

                  {group.isPopular && (
                    <span className="inline-flex self-start text-[10px] font-bold uppercase tracking-widest mb-5 px-3 py-1 rounded-full bg-primary-foreground/15 text-primary-foreground">
                      Most Popular
                    </span>
                  )}

                  <h3 className={cn("text-2xl font-bold font-display tracking-tight", group.isPopular ? "text-primary-foreground" : "text-foreground")}>
                    {group.name}
                  </h3>
                  {group.subtitle && (
                    <p className={cn("text-xs font-medium mt-0.5", group.isPopular ? "text-primary-foreground/70" : "text-muted-foreground")}>
                      {group.subtitle}
                    </p>
                  )}
                  <p className={cn("text-sm mt-2 mb-6", group.isPopular ? "text-primary-foreground/80" : "text-muted-foreground")}>
                    {group.description}
                  </p>

                  <div className={cn("mb-3", group.isPopular ? "text-primary-foreground" : "text-foreground")}>
                    <div className="flex items-end gap-1.5">
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={`${group.key}-${billing}`}
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -20, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="text-5xl font-extrabold font-display tracking-tight inline-block"
                        >
                          {plan.price}
                        </motion.span>
                      </AnimatePresence>
                      <span className={cn("text-sm mb-1.5", group.isPopular ? "text-primary-foreground/70" : "text-muted-foreground")}>
                        {periodSuffix}
                      </span>
                    </div>

                    <p className={cn("text-xs mt-1.5 min-h-[1.25rem]", group.isPopular ? "text-primary-foreground/70" : "text-muted-foreground")}>
                      {alternatePlan
                        ? `${alternatePlan.price} ${formatBillingPeriod(alternatePlan.billingPeriod)} also available`
                        : ""}
                    </p>
                  </div>

                  <a
                    href={group.ctaHref}
                    className={cn(
                      "w-full flex items-center justify-center rounded-2xl h-12 font-semibold text-sm transition-all duration-300 mb-8",
                      group.isPopular
                        ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                    )}
                  >
                    {group.ctaText}
                  </a>

                  <div className="flex-1">
                    <p className={cn("text-xs font-semibold uppercase tracking-wider mb-4", group.isPopular ? "text-primary-foreground/60" : "text-muted-foreground")}>
                      What's included
                    </p>
                    <ul className="space-y-3">
                      {sortedFeatures.map((feature) => (
                          <li
                            key={feature.id}
                            className={cn(
                              "flex items-start gap-2.5 text-sm",
                              !feature.isIncluded && "opacity-40",
                              group.isPopular ? "text-primary-foreground/85" : "text-muted-foreground"
                            )}
                          >
                            <div
                              className={cn(
                                "w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0",
                                feature.isIncluded
                                  ? group.isPopular ? "bg-primary-foreground/15" : "bg-primary/10"
                                  : "bg-muted"
                              )}
                            >
                              <Check size={12} className={group.isPopular ? "text-primary-foreground" : "text-primary"} />
                            </div>
                            {feature.text}
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
            })}
          </div>
        )}

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
