import { Upload, Sparkles, Download } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  { icon: Upload, title: "Import or Search", desc: "Upload your CSV or search our database of 250M+ contacts and 60M+ companies." },
  { icon: Sparkles, title: "Enrich with Verified Data", desc: "Automatically enrich contacts with emails, phone numbers, company data and more." },
  { icon: Download, title: "Export or Sync", desc: "Push enriched data to your CRM, export as CSV, or use our API." },
];

const HowItWorks = () => (
  <section className="py-24 lg:py-32 relative">
    <div className="absolute inset-0 hero-glow opacity-50" />
    <div className="container mx-auto px-4 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <p className="text-sm text-primary font-semibold tracking-wider uppercase mb-3">How it works</p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">Three steps to <span className="gradient-text">better data</span></h2>
      </motion.div>
      <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {steps.map(({ icon: Icon, title, desc }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.15, duration: 0.5, type: "spring", stiffness: 150 }}
            className="text-center"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-5 shadow-lg shadow-primary/20"
            >
              <Icon size={28} className="text-primary-foreground" />
            </motion.div>
            <div className="text-xs text-primary font-bold mb-2">Step {i + 1}</div>
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
