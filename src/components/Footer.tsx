import { Youtube, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

const links = {
  Product: ["Features", "Pricing", "Blog", "Reviews", "FAQs", "Contact"],
  Legal: ["Terms of Service", "Privacy Policy"],
  "API Docs": ["Guide", "API Reference"],
};

const Footer = () => (
  <footer className="relative bg-foreground text-background overflow-hidden">
    {/* Main footer */}
    <div className="container mx-auto px-4 pt-20 pb-12">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
        <div className="col-span-2">
          <span className="text-2xl font-bold">Koldify</span>
          <p className="text-sm text-background/50 mt-3 max-w-[260px] leading-relaxed">
            The data engine behind high-performing GTM teams
          </p>
          <p className="text-xs text-background/30 mt-8">© 2026 Koldify. All rights reserved.</p>
        </div>
        {Object.entries(links).map(([title, items]) => (
          <div key={title}>
            <h4 className="text-sm font-semibold mb-4">{title}</h4>
            <ul className="space-y-3">
              {items.map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-background/50 hover:text-background transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Social cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-16">
        <a
          href="#"
          className="group flex items-center gap-4 rounded-xl border border-background/10 p-6 hover:bg-background/5 transition-all duration-300"
        >
          <Youtube size={24} className="text-background/60 group-hover:text-background transition-colors" />
          <span className="font-medium text-background/80 group-hover:text-background transition-colors">Youtube</span>
        </a>
        <a
          href="#"
          className="group flex items-center gap-4 rounded-xl border border-background/10 p-6 hover:bg-primary hover:border-primary transition-all duration-300"
        >
          <Linkedin size={24} className="text-background/60 group-hover:text-background transition-colors" />
          <span className="font-medium text-background/80 group-hover:text-background transition-colors">LinkedIn</span>
        </a>
      </div>
    </div>

    {/* Giant watermark text */}
    <div className="relative h-[200px] sm:h-[280px] overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="absolute inset-x-0 bottom-[-40px] sm:bottom-[-60px] text-center"
      >
        <span className="text-[120px] sm:text-[200px] lg:text-[280px] font-black tracking-tighter text-background/[0.04] select-none leading-none">
          Koldify
        </span>
      </motion.div>
    </div>
  </footer>
);

export default Footer;
