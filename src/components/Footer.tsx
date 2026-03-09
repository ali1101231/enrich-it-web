import { useEffect, useRef, useState } from "react";
import { Youtube, Linkedin } from "lucide-react";

const links = {
  Product: ["Features", "Pricing", "Blog", "Reviews", "FAQs", "Contact"],
  Legal: ["Terms of Service", "Privacy Policy"],
  "API Docs": ["Guide", "API Reference"],
};

const Footer = () => {
  const watermarkRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(100);

  useEffect(() => {
    const handleScroll = () => {
      if (!watermarkRef.current) return;
      const rect = watermarkRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      const progress = Math.max(0, Math.min(1, (windowH - rect.top) / (windowH * 0.5)));
      setOffset(80 * (1 - progress));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer className="bg-foreground text-background pt-20 pb-0 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          <div className="col-span-2 md:col-span-1">
            <span className="text-xl font-bold font-display gradient-text">Enrich</span>
            <p className="text-sm text-background/50 mt-3 leading-relaxed max-w-[220px]">
              The data engine behind high-performing GTM teams
            </p>
            <p className="text-xs text-background/30 mt-8">© 2026 Enrich. All rights reserved.</p>
          </div>
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold font-display mb-4 text-background/80">{title}</h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-background/45 hover:text-background transition-colors duration-200">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social boxes */}
        <div className="grid grid-cols-2 border border-background/[0.08] rounded-2xl overflow-hidden mb-16">
          <a href="#" className="flex items-center gap-3 px-7 py-6 border-r border-background/[0.08] transition-all duration-300 hover:bg-primary group">
            <Youtube size={20} className="text-background/30 group-hover:text-primary-foreground transition-colors" />
            <span className="text-sm font-medium text-background/40 group-hover:text-primary-foreground transition-colors">Youtube</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-7 py-6 transition-all duration-300 hover:bg-primary group">
            <Linkedin size={20} className="text-background/30 group-hover:text-primary-foreground transition-colors" />
            <span className="text-sm font-medium text-background/40 group-hover:text-primary-foreground transition-colors">LinkedIn</span>
          </a>
        </div>
      </div>

      {/* Animated watermark */}
      <div ref={watermarkRef} className="relative h-36 md:h-52 select-none pointer-events-none flex items-end justify-center overflow-visible">
        <span
          className="text-[10rem] md:text-[16rem] font-black font-display leading-none whitespace-nowrap tracking-tight transition-transform duration-75 ease-out"
          style={{
            color: "rgba(255,255,255,0.04)",
            transform: `translateY(${offset}%)`,
          }}
        >
          Koldify
        </span>
      </div>
    </footer>
  );
};

export default Footer;
