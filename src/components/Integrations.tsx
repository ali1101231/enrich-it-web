const integrations = [
  { name: "HubSpot", color: "#FF7A59" },
  { name: "Salesforce", color: "#00A1E0" },
  { name: "Zapier", color: "#FF4A00" },
  { name: "Google Sheets", color: "#34A853" },
  { name: "Slack", color: "#E01E5A" },
];

const Integrations = () => (
  <section className="py-24 lg:py-32 relative">
    <div className="absolute inset-0 hero-glow opacity-30" />
    <div className="container mx-auto px-4 relative z-10">
      <div className="text-center mb-16">
        <p className="text-sm text-primary font-semibold tracking-wider uppercase mb-3">Integrations</p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">Works with your <span className="gradient-text">favorite tools</span></h2>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-4">
        {integrations.map(({ name, color }) => (
          <div key={name} className="glass rounded-xl p-6 glow-border flex items-center gap-3 min-w-[160px] justify-center">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
            <span className="font-medium text-sm">{name}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Integrations;
