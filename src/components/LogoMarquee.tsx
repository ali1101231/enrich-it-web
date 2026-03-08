import { motion } from "framer-motion";

const logos = [
  "Throxy", "Solufinance", "Growth Engine X", "TOK1N", "Lead Expo", "TechCorp", "ScaleUp", "GrowthIO",
];

const LogoMarquee = () => (
  <section className="py-16 border-y border-border/30 overflow-hidden">
    <div className="container mx-auto px-4 mb-8">
      <p className="text-center text-sm text-muted-foreground font-medium">
        Trusted by innovative teams worldwide
      </p>
    </div>
    <div className="relative">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
      <motion.div
        className="flex gap-16 items-center"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        style={{ width: "fit-content" }}
      >
        {[...logos, ...logos].map((name, i) => (
          <span
            key={i}
            className="text-xl font-semibold text-muted-foreground/40 whitespace-nowrap tracking-wide select-none"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {name}
          </span>
        ))}
      </motion.div>
    </div>
  </section>
);

export default LogoMarquee;
