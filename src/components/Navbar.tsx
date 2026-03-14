import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Moon, Sun, ChevronRight } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { GlowButton } from "@/components/ui/glow-button";

const LOGIN_URL = "https://app.enrich-it/login";
const SIGNUP_URL = "https://app.enrich-it/signup";

const navLinks = [
  { label: "Pricing", href: "#pricing" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQs", href: "#faq" },
  { label: "Contact", href: "#faq" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    let rafId = 0;

    const updateScrolledState = () => {
      const next = window.scrollY > 20;
      setScrolled((prev) => (prev === next ? prev : next));
      rafId = 0;
    };

    const handleScroll = () => {
      if (rafId !== 0) return;
      rafId = window.requestAnimationFrame(updateScrolledState);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== 0) window.cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter((section): section is HTMLElement => !!section);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const activeEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top))[0];

        if (!activeEntry) return;

        const nextSection = activeEntry.target.id;
        setActiveSection((prev) => (prev === nextSection ? prev : nextSection));
      },
      {
        rootMargin: "-35% 0px -55% 0px",
        threshold: [0.1, 0.25, 0.5, 0.75],
      },
    );

    for (const section of sections) {
      observer.observe(section);
    }

    return () => observer.disconnect();
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
        className={`w-full max-w-5xl bg-background/95 supports-[backdrop-filter]:bg-background/80 backdrop-blur-md border border-border/60 rounded-2xl transition-shadow duration-300 ${
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
            <a href={LOGIN_URL}>
              <GlowButton>Login</GlowButton>
            </a>
            <a href={SIGNUP_URL}>
              <Button className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-4 h-8 text-xs font-medium gap-1">
                Get 1,000 credits free <ChevronRight size={13} />
              </Button>
            </a>
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
              <a href={LOGIN_URL} className="flex-1">
                <GlowButton className="w-full">Login</GlowButton>
              </a>
              <a href={SIGNUP_URL} className="flex-1 h-full">
                <Button className="w-full h-full bg-foreground text-background hover:bg-foreground/90 rounded-[47px] text-xs">Get Started</Button>
              </a>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
