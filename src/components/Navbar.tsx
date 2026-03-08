import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { Link } from "react-router-dom";

const navLinks = ["Product", "Solutions", "Pricing", "Docs", "Blog"];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggle } = useTheme();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-xl font-bold gradient-text">Koldify</Link>
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {link}
              </a>
            ))}
          </div>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={toggle} className="rounded-full">
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </Button>
          <Link to="/sign-in">
            <Button variant="ghost" size="sm">Sign In</Button>
          </Link>
          <Link to="/sign-up">
            <Button variant="hero" size="sm">Get Started</Button>
          </Link>
        </div>
        <div className="flex md:hidden items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggle} className="rounded-full">
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </Button>
          <button className="text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {mobileOpen && (
        <div className="md:hidden glass-strong border-t border-border/30 px-4 pb-4 pt-2 space-y-3">
          {navLinks.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="block text-sm text-muted-foreground py-1">
              {link}
            </a>
          ))}
          <div className="flex gap-2 pt-2">
            <Link to="/sign-in" className="flex-1">
              <Button variant="ghost" size="sm" className="w-full">Sign In</Button>
            </Link>
            <Link to="/sign-up" className="flex-1">
              <Button variant="hero" size="sm" className="w-full">Get Started</Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
