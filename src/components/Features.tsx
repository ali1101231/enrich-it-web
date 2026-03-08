import { Users, Building2, MailCheck, Globe, ListChecks, FileSpreadsheet, Code } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  { icon: Users, title: "People Finder", desc: "Search 250M+ contacts by role, company, location and more." },
  { icon: Building2, title: "Company Enricher", desc: "Get firmographic data on 60M+ companies instantly." },
  { icon: MailCheck, title: "Email Verifier", desc: "Real-time verification with 99% deliverability accuracy." },
  { icon: Globe, title: "Domain Search", desc: "Find every email associated with any company domain." },
  { icon: ListChecks, title: "Lead Builder", desc: "Build targeted lead lists with advanced filters." },
  { icon: FileSpreadsheet, title: "CSV Tools", desc: "Bulk enrich and clean your existing contact lists." },
  { icon: Code, title: "API Access", desc: "Integrate Koldify data into your own tools via REST API." },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { delay: i * 0.08, duration: 0.5, type: "spring", stiffness: 150 },
  }),
};

const Features = () => (
  <section id="product" className="relative py-24 lg:py-32">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <p className="text-sm text-primary font-semibold tracking-wider uppercase mb-3">Platform</p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">Everything you need for <span className="gradient-text">B2B growth</span></h2>
      </motion.div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {features.map(({ icon: Icon, title, desc }, i) => (
          <motion.div
            key={title}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={cardVariants}
            whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.2 } }}
            className="group glass rounded-xl p-6 glow-border cursor-default"
          >
            <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-primary/20 transition-shadow duration-500">
              <Icon size={20} className="text-primary-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
