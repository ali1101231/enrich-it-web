import { Users, Building2, MailCheck, Globe, ListChecks, FileSpreadsheet, Code } from "lucide-react";

const features = [
  { icon: Users, title: "People Finder", desc: "Search 250M+ contacts by role, company, location and more." },
  { icon: Building2, title: "Company Enricher", desc: "Get firmographic data on 60M+ companies instantly." },
  { icon: MailCheck, title: "Email Verifier", desc: "Real-time verification with 99% deliverability accuracy." },
  { icon: Globe, title: "Domain Search", desc: "Find every email associated with any company domain." },
  { icon: ListChecks, title: "Lead Builder", desc: "Build targeted lead lists with advanced filters." },
  { icon: FileSpreadsheet, title: "CSV Tools", desc: "Bulk enrich and clean your existing contact lists." },
  { icon: Code, title: "API Access", desc: "Integrate Koldify data into your own tools via REST API." },
];

const Features = () => (
  <section id="product" className="relative py-24 lg:py-32">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <p className="text-sm text-primary font-semibold tracking-wider uppercase mb-3">Platform</p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">Everything you need for <span className="gradient-text">B2B growth</span></h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {features.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="group glass rounded-xl p-6 glow-border cursor-default">
            <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-primary/20 transition-shadow duration-500">
              <Icon size={20} className="text-primary-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
