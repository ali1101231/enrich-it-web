import { Users, Building2, MailCheck, Globe, ListChecks, FileSpreadsheet, Code } from "lucide-react";

const features = [
  { icon: Users, title: "People Finder", desc: "Search 250M+ contacts by role, company, location and more.", color: "bg-primary/10 text-primary" },
  { icon: Building2, title: "Company Enricher", desc: "Get firmographic data on 60M+ companies instantly.", color: "bg-accent/10 text-accent" },
  { icon: MailCheck, title: "Email Verifier", desc: "Real-time verification with 99% deliverability accuracy.", color: "bg-primary/10 text-primary" },
  { icon: Globe, title: "Domain Search", desc: "Find every email associated with any company domain.", color: "bg-accent/10 text-accent" },
  { icon: ListChecks, title: "Lead Builder", desc: "Build targeted lead lists with advanced filters.", color: "bg-primary/10 text-primary" },
  { icon: FileSpreadsheet, title: "CSV Tools", desc: "Bulk enrich and clean your existing contact lists.", color: "bg-accent/10 text-accent" },
  { icon: Code, title: "API Access", desc: "Integrate Koldify data into your own tools via REST API.", color: "bg-primary/10 text-primary" },
];

const Features = () => (
  <section id="features" className="relative py-24 lg:py-32">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <div className="section-divider" />
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight">
          Everything you need for <span className="gradient-text">B2B growth</span>
        </h2>
        <p className="text-muted-foreground mt-4 max-w-lg mx-auto">Powerful tools to find, enrich, and verify your ideal customers at scale.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {features.map(({ icon: Icon, title, desc, color }) => (
          <div key={title} className="group bg-card rounded-xl p-6 border border-border/50 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/[0.04] transition-all duration-500 cursor-default">
            <div className={`w-11 h-11 rounded-xl ${color} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}>
              <Icon size={20} />
            </div>
            <h3 className="font-semibold font-display text-foreground mb-1.5">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
