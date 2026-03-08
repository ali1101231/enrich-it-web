import { Youtube, Linkedin } from "lucide-react";

const links = {
  Product: ["Features", "Pricing", "Blog", "Reviews", "FAQs", "Contact"],
  Legal: ["Terms of Service", "Privacy Policy"],
  "API Docs": ["Guide", "API Reference"],
};

const Footer = () => (
  <footer className="bg-foreground text-background pt-16 pb-0 relative overflow-hidden">
    <div className="container mx-auto px-4">
      {/* Top section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        <div className="col-span-2 md:col-span-1">
          <span className="text-xl font-bold gradient-text">Koldify</span>
          <p className="text-sm text-background/60 mt-3 leading-relaxed">
            The data engine behind high-performing GTM teams
          </p>
          <p className="text-xs text-background/40 mt-6">© 2026 Koldify. All rights reserved.</p>
        </div>
        {Object.entries(links).map(([title, items]) => (
          <div key={title}>
            <h4 className="text-sm font-semibold mb-4">{title}</h4>
            <ul className="space-y-3">
              {items.map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-background/60 hover:text-background transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Social boxes */}
      <div className="grid grid-cols-2 gap-0 border border-background/10 rounded-xl overflow-hidden mb-16">
        <a
          href="#"
          className="flex items-center gap-3 px-6 py-5 border-r border-background/10 transition-all duration-300 hover:bg-primary hover:text-primary-foreground group"
        >
          <Youtube size={22} className="text-background/60 group-hover:text-primary-foreground transition-colors" />
          <span className="text-sm font-medium text-background/80 group-hover:text-primary-foreground transition-colors">Youtube</span>
        </a>
        <a
          href="#"
          className="flex items-center gap-3 px-6 py-5 transition-all duration-300 hover:bg-primary hover:text-primary-foreground group"
        >
          <Linkedin size={22} className="text-background/60 group-hover:text-primary-foreground transition-colors" />
          <span className="text-sm font-medium text-background/80 group-hover:text-primary-foreground transition-colors">LinkedIn</span>
        </a>
      </div>
    </div>

    {/* Large watermark brand text */}
    <div className="relative h-32 md:h-48 overflow-hidden select-none pointer-events-none">
      <span className="absolute bottom-[-30%] left-1/2 -translate-x-1/2 text-[10rem] md:text-[16rem] font-black text-background/[0.04] leading-none whitespace-nowrap tracking-tight">
        Koldify
      </span>
    </div>
  </footer>
);

export default Footer;
