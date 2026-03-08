import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Moon, Sun, ChevronRight } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

const navLinks = ["Pricing", "Reviews", "FAQs", "Contact"];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggle } = useTheme();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-2xl border-b border-border/50">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <div className="flex items-center gap-10">
          <a href="/" className="text-xl font-bold font-display gradient-text tracking-tight">Koldify</a>
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-sm text-muted-foreground hover:text-foreground px-3 py-2 rounded-lg transition-colors duration-200"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={toggle} className="rounded-full">
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </Button>
          <span className="text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors">Login</span>
          <Button className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-5 h-9 text-sm font-medium gap-1.5">
            Get 1,000 credits free <ChevronRight size={14} />
          </Button>
        </div>
        <div className="flex md:hidden items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggle} className="rounded-full">
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </Button>
          <button className="text-foreground p-1" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {mobileOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-2xl border-t border-border/40 px-4 pb-5 pt-3 space-y-1">
          {navLinks.map((link) => (
            <a key={link} href={`#${link.toLowerCase().replace(/\s+/g, "-")}`} className="block text-sm text-muted-foreground py-2 px-3 rounded-lg hover:bg-muted/60">
              {link}
            </a>
          ))}
          <div className="flex gap-2 pt-3">
            <Button variant="ghost" size="sm" className="flex-1">Login</Button>
            <Button className="flex-1 bg-foreground text-background hover:bg-foreground/90 rounded-full text-sm">Get Started</Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
