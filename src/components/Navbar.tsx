import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Moon, Sun, ChevronRight } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { GlowButton } from "@/components/ui/glow-button";

const navLinks = [
  { label: "Pricing", href: "#pricing" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQs", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Find active section
      const sections = navLinks.map(l => l.href.slice(1));
      let current = "";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) current = id;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.getElementById(href.slice(1));
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-3">
      <nav
        className={`w-full max-w-5xl bg-background backdrop-blur-2xl border border-border/60 rounded-2xl transition-shadow duration-300 ${
          scrolled ? "shadow-lg shadow-foreground/[0.04]" : ""
        }`}
      >
        <div className="flex items-center justify-between h-14 px-5">
          <div className="flex items-center gap-10">
            <a href="/" className="text-lg font-bold font-display gradient-text tracking-tight">Enrich it</a>
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  onClick={(e) => handleClick(e, href)}
                  className={`text-sm px-3 py-1.5 rounded-lg transition-all duration-200 ${
                    activeSection === href.slice(1)
                      ? "text-foreground font-medium bg-muted/60"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <div className="h-8 flex items-center">
              <GlowButton>Login</GlowButton>
            </div>
            <Button className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-4 h-8 text-xs font-medium gap-1">
              Get 1,000 credits free <ChevronRight size={13} />
            </Button>
          </div>
          <div className="flex md:hidden items-center gap-2">
            <button className="text-foreground p-1" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
        {mobileOpen && (
          <div className="md:hidden border-t border-border/40 px-4 pb-4 pt-2 space-y-1">
            {navLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={(e) => handleClick(e, href)}
                className={`block text-sm py-2 px-3 rounded-lg transition-colors ${
                  activeSection === href.slice(1)
                    ? "text-foreground font-medium bg-muted/60"
                    : "text-muted-foreground hover:bg-muted/40"
                }`}
              >
                {label}
              </a>
            ))}
            <div className="flex gap-2 pt-2 items-center h-12">
              <GlowButton className="flex-1">Login</GlowButton>
              <Button className="flex-1 h-full bg-foreground text-background hover:bg-foreground/90 rounded-[47px] text-xs">Get Started</Button>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
