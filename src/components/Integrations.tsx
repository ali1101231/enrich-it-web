import { motion } from "framer-motion";

const integrations = [
  { name: "HubSpot", color: "#FF7A59" },
  { name: "Salesforce", color: "#00A1E0" },
  { name: "Zapier", color: "#FF4A00" },
  { name: "Google Sheets", color: "#34A853" },
  { name: "Slack", color: "#E01E5A" },
];

const Integrations = () => (
  <section className="py-24 lg:py-32 relative">
    <div className="absolute inset-0 hero-glow opacity-30" />
    <div className="container mx-auto px-4 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <p className="text-sm text-primary font-semibold tracking-wider uppercase mb-3">Integrations</p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">Works with your <span className="gradient-text">favorite tools</span></h2>
      </motion.div>
      <div className="flex flex-wrap items-center justify-center gap-4">
        {integrations.map(({ name, color }, i) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5, type: "spring", stiffness: 200 }}
            whileHover={{ y: -4, scale: 1.05, transition: { duration: 0.2 } }}
            className="glass rounded-xl p-6 glow-border flex items-center gap-3 min-w-[160px] justify-center"
          >
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
            <span className="font-medium text-sm">{name}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Integrations;
