import { useEffect, useRef, useState } from "react";
import { Twitter, Linkedin } from "lucide-react";

type FooterLinkItem = {
  label: string;
  href: string;
};

const links: Record<string, FooterLinkItem[]> = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Reviews", href: "#reviews" },
    { label: "FAQs", href: "#faq" },
    { label: "Contact", href: "#faq" },
  ],
  Legal: [
    { label: "Terms of Service", href: "#" },
    { label: "Privacy Policy", href: "#" },
  ],
};

const Footer = () => {
  const watermarkRef = useRef<HTMLDivElement>(null);
  const watermarkTextRef = useRef<HTMLSpanElement>(null);
  const rafIdRef = useRef<number>(0);
  const offsetRef = useRef(100);

  useEffect(() => {
    const applyOffset = (nextOffset: number) => {
      const roundedOffset = Math.round(nextOffset * 100) / 100;
      if (Math.abs(offsetRef.current - roundedOffset) < 0.5) return;
      offsetRef.current = roundedOffset;

      if (!watermarkTextRef.current) return;
      watermarkTextRef.current.style.transform = `translate3d(0, ${roundedOffset}%, 0)`;
    };

    const updateWatermark = () => {
      rafIdRef.current = 0;
      if (!watermarkRef.current) return;

      const rect = watermarkRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      const progress = Math.max(0, Math.min(1, (windowH - rect.top) / (windowH * 0.5)));
      applyOffset(80 * (1 - progress));
    };

    const scheduleUpdate = () => {
      if (rafIdRef.current !== 0) return;
      rafIdRef.current = window.requestAnimationFrame(updateWatermark);
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (rafIdRef.current !== 0) window.cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  return (
    <footer className="bg-foreground text-background pt-20 pb-0 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          <div className="col-span-2 md:col-span-1">
            <span className="text-xl font-bold font-display gradient-text">Enrich it</span>
            <p className="text-sm text-background/50 mt-3 leading-relaxed max-w-[220px]">
              Enrichment platform for email, phone, and LinkedIn-based company data
            </p>
            <p className="text-xs text-background/30 mt-8">© 2026 Enrich it. All rights reserved.</p>
          </div>
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold font-display mb-4 text-background/80">{title}</h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className="text-sm text-background/45 hover:text-background transition-colors duration-200">{item.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social boxes */}
        <div className="grid grid-cols-2 border border-background/[0.08] rounded-2xl overflow-hidden mb-16">
          <a href="#" className="flex items-center gap-3 px-7 py-6 border-r border-background/[0.08] transition-all duration-300 hover:bg-primary group">
            <Twitter size={20} className="text-background/30 group-hover:text-primary-foreground transition-colors" />
            <span className="text-sm font-medium text-background/40 group-hover:text-primary-foreground transition-colors">X</span>
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
          ref={watermarkTextRef}
          className="text-[10rem] md:text-[16rem] font-black font-display leading-none whitespace-nowrap tracking-tight will-change-transform"
          style={{
            color: "rgba(255,255,255,0.04)",
            transform: "translate3d(0, 100%, 0)",
          }}
        >
          Enrich it
        </span>
      </div>
    </footer>
  );
};

export default Footer;
