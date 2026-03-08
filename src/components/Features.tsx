import { Users, Building2, Globe, ListChecks } from "lucide-react";

const features = [
  { icon: Users, title: "People Finder", desc: "Search 250M+ contacts by role, company, location and more." },
  { icon: Building2, title: "Company Enricher", desc: "Get firmographic data on 60M+ companies instantly." },
  { icon: Globe, title: "Domain Search", desc: "Find every email associated with any company domain." },
  { icon: ListChecks, title: "Lead Builder", desc: "Build targeted lead lists with advanced filters." },
];

const Features = () => (
  <section id="features" className="relative py-24 lg:py-32">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <p className="text-sm text-primary font-semibold tracking-wider uppercase mb-3">Platform</p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight">
          Everything you need for <span className="gradient-text">B2B growth</span>
        </h2>
        <p className="text-muted-foreground mt-4 max-w-lg mx-auto">Powerful tools to find, enrich, and verify your ideal customers at scale.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
        {features.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="group bg-card rounded-2xl p-7 border border-border/50 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/[0.04] transition-all duration-500 cursor-default">
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 shadow-md shadow-primary/15">
              <Icon size={22} className="text-primary-foreground" />
            </div>
            <h3 className="font-semibold font-display text-foreground mb-2 text-base">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
