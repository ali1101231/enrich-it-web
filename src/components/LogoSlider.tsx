const logos = [
  { name: "throxy", font: "font-sans font-bold tracking-widest uppercase" },
  { name: "Solufinance", font: "font-serif italic" },
  { name: "GROWTH ENGINE X", font: "font-display font-bold tracking-wider" },
  { name: "TOK1N", font: "font-mono font-bold tracking-[0.3em]" },
  { name: "lead expo", font: "font-sans font-light tracking-wide lowercase" },
  { name: "DataForge", font: "font-display font-bold" },
  { name: "APEX LEADS", font: "font-sans font-black tracking-widest uppercase text-sm" },
];

const doubled = [...logos, ...logos, ...logos, ...logos];

const LogoSlider = () => (
  <section className="py-10 border-y border-border/30 overflow-hidden">
    <p className="text-center text-xs text-muted-foreground/60 uppercase tracking-widest font-medium mb-6">Trusted by fast-growing teams</p>
    <div className="relative">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
      <div className="flex animate-scroll gap-14 w-max">
        {doubled.map(({ name, font }, i) => (
          <span
            key={i}
            className={`text-muted-foreground/30 text-lg whitespace-nowrap select-none ${font}`}
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  </section>
);

export default LogoSlider;
