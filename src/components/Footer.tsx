import { Youtube, Linkedin } from "lucide-react";

const links = {
  Product: ["Features", "Pricing", "Blog", "Reviews", "FAQs", "Contact"],
  Legal: ["Terms of Service", "Privacy Policy"],
  "API Docs": ["Guide", "API Reference"],
};

const Footer = () => (
  <footer className="bg-foreground text-background pt-20 pb-0 relative overflow-hidden">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
        <div className="col-span-2 md:col-span-1">
          <span className="text-xl font-bold font-display gradient-text">Koldify</span>
          <p className="text-sm text-background/50 mt-3 leading-relaxed max-w-[220px]">
            The data engine behind high-performing GTM teams
          </p>
          <p className="text-xs text-background/30 mt-8">© 2026 Koldify. All rights reserved.</p>
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
      <div className="grid grid-cols-2 border border-background/10 rounded-2xl overflow-hidden mb-20">
        <a href="#" className="flex items-center gap-3 px-7 py-6 border-r border-background/10 transition-all duration-300 hover:bg-primary group">
          <Youtube size={20} className="text-background/40 group-hover:text-primary-foreground transition-colors" />
          <span className="text-sm font-medium text-background/50 group-hover:text-primary-foreground transition-colors">Youtube</span>
        </a>
        <a href="#" className="flex items-center gap-3 px-7 py-6 transition-all duration-300 hover:bg-primary group">
          <Linkedin size={20} className="text-background/40 group-hover:text-primary-foreground transition-colors" />
          <span className="text-sm font-medium text-background/50 group-hover:text-primary-foreground transition-colors">LinkedIn</span>
        </a>
      </div>
    </div>

    {/* Watermark */}
    <div className="relative h-28 md:h-44 overflow-hidden select-none pointer-events-none">
      <span className="absolute bottom-[-25%] left-1/2 -translate-x-1/2 text-[9rem] md:text-[15rem] font-black font-display text-background/[0.03] leading-none whitespace-nowrap tracking-tight">
        Koldify
      </span>
    </div>
  </footer>
);

export default Footer;
