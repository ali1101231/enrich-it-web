const links = {
  Product: ["People Finder", "Email Verifier", "Company Enricher", "API"],
  Company: ["About", "Careers", "Blog", "Press"],
  Resources: ["Documentation", "Help Center", "Status", "Changelog"],
  Legal: ["Privacy", "Terms", "Security", "GDPR"],
};

const Footer = () => (
  <footer className="border-t border-border/50 py-16">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
        <div className="col-span-2 md:col-span-1">
          <span className="text-lg font-bold gradient-text">Koldify</span>
          <p className="text-xs text-muted-foreground mt-2 leading-relaxed">The growth engine for B2B data.</p>
          <div className="flex gap-3 mt-4">
            {["Twitter", "LinkedIn", "GitHub"].map((s) => (
              <a key={s} href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">{s}</a>
            ))}
          </div>
        </div>
        {Object.entries(links).map(([title, items]) => (
          <div key={title}>
            <h4 className="text-sm font-semibold mb-3">{title}</h4>
            <ul className="space-y-2">
              {items.map((item) => (
                <li key={item}>
                  <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border/30 mt-12 pt-6 text-center">
        <p className="text-xs text-muted-foreground">© 2026 Koldify. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
