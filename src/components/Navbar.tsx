import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const navLinks = ["Product", "Solutions", "Pricing", "Docs", "Blog"];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <div className="flex items-center gap-8">
          <span className="text-xl font-bold gradient-text">Koldify</span>
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {link}
              </a>
            ))}
          </div>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm">Sign In</Button>
          <Button variant="hero" size="sm">Get Started</Button>
        </div>
        <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {mobileOpen && (
        <div className="md:hidden glass-strong border-t border-border/30 px-4 pb-4 pt-2 space-y-3">
          {navLinks.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="block text-sm text-muted-foreground py-1">
              {link}
            </a>
          ))}
          <div className="flex gap-2 pt-2">
            <Button variant="ghost" size="sm" className="flex-1">Sign In</Button>
            <Button variant="hero" size="sm" className="flex-1">Get Started</Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
