import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const CTA = () => (
  <section className="py-24 lg:py-32">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, type: "spring" }}
        className="gradient-primary rounded-2xl p-10 sm:p-16 text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary-foreground tracking-tight mb-4"
          >
            Start Building Better<br />Lead Lists Today
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 }}
            className="text-primary-foreground/70 max-w-xl mx-auto mb-8"
          >
            Join thousands of sales teams using Koldify to close more deals.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button variant="hero-outline" size="lg" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 gap-2">
              Start Free <ArrowRight size={16} />
            </Button>
            <Button variant="ghost" size="lg" className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10">
              Book Demo
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default CTA;
