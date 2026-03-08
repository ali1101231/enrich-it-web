import { Upload, Sparkles, Download } from "lucide-react";

const steps = [
  { icon: Upload, title: "Import or Search", desc: "Upload your CSV or search our database of 250M+ contacts and 60M+ companies.", num: "01" },
  { icon: Sparkles, title: "Enrich & Verify", desc: "Automatically enrich contacts with emails, phone numbers, company data and more.", num: "02" },
  { icon: Download, title: "Export or Sync", desc: "Push enriched data to your CRM, export as CSV, or use our API.", num: "03" },
];

const HowItWorks = () => (
  <section id="how-it-works" className="py-24 lg:py-32 relative">
    <div className="absolute inset-0 hero-glow opacity-40" />
    <div className="container mx-auto px-4 relative z-10">
      <div className="text-center mb-16">
        <div className="section-divider" />
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight">
          Three steps to <span className="gradient-text">better data</span>
        </h2>
      </div>
      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {steps.map(({ icon: Icon, title, desc, num }, i) => (
          <div key={title} className="relative bg-card rounded-2xl p-8 border border-border/50 text-center group hover:border-primary/30 transition-all duration-500">
            <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[4rem] font-black font-display text-primary/[0.06] leading-none select-none">{num}</span>
            <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-5 shadow-lg shadow-primary/15 group-hover:shadow-primary/25 transition-shadow duration-500">
              <Icon size={24} className="text-primary-foreground" />
            </div>
            <h3 className="text-lg font-semibold font-display mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            {i < 2 && (
              <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-[2px] bg-border" />
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
