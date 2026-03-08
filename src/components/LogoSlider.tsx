const logos = [
  "throxy",
  "Solufinance",
  "GROWTH ENGINE X",
  "TOK1N",
  "lead expo",
  "throxy",
  "Solufinance",
  "GROWTH ENGINE X",
  "TOK1N",
  "lead expo",
];

const LogoSlider = () => (
  <section className="py-12 border-y border-border/40 overflow-hidden">
    <div className="relative">
      <div className="flex animate-scroll gap-16 w-max">
        {[...logos, ...logos].map((name, i) => (
          <span
            key={i}
            className="text-muted-foreground/50 text-lg font-semibold tracking-wide whitespace-nowrap select-none"
            style={{ fontFamily: name === "Solufinance" ? "Georgia, serif" : "inherit" }}
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  </section>
);

export default LogoSlider;
