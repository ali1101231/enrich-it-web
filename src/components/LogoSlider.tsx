const logos = [
  "Salesforce",
  "HubSpot",
  "Pipedrive",
  "Outreach",
  "Apollo.io",
  "ZoomInfo",
  "Clearbit",
  "LinkedIn Sales Nav",
];

const doubled = [...logos, ...logos, ...logos, ...logos];

const LogoSlider = () => (
  <section className="py-10 border-y border-border/30 overflow-hidden">
    <p className="text-center text-xs text-muted-foreground/60 uppercase tracking-widest font-medium mb-6">Trusted by fast-growing teams</p>
    <div className="relative">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
      <div className="flex animate-scroll gap-14 w-max">
        {doubled.map((name, i) => (
          <span key={i} className="shrink-0 text-sm font-semibold text-muted-foreground/50 tracking-wide whitespace-nowrap">
            {name}
          </span>
        ))}
      </div>
    </div>
  </section>
);

export default LogoSlider;
