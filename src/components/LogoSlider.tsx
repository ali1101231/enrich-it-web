import { useEffect, useState } from "react";
import { websiteContentApi, type WebsiteLogo } from "@/lib/website-content-api";

const FALLBACK_LOGOS: WebsiteLogo[] = [
  { id: 'f1', name: 'Salesforce', imageUrl: '' },
  { id: 'f2', name: 'HubSpot', imageUrl: '' },
  { id: 'f3', name: 'Pipedrive', imageUrl: '' },
  { id: 'f4', name: 'Outreach', imageUrl: '' },
  { id: 'f5', name: 'Apollo.io', imageUrl: '' },
  { id: 'f6', name: 'ZoomInfo', imageUrl: '' },
  { id: 'f7', name: 'Clearbit', imageUrl: '' },
  { id: 'f8', name: 'LinkedIn Sales Nav', imageUrl: '' },
];

const LogoSlider = () => {
  const [logos, setLogos] = useState<WebsiteLogo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    websiteContentApi.getLogos()
      .then((data) => { if (isMounted) setLogos(data.length > 0 ? data : FALLBACK_LOGOS); })
      .catch(() => { if (isMounted) setLogos(FALLBACK_LOGOS); })
      .finally(() => { if (isMounted) setIsLoading(false); });
    return () => { isMounted = false; };
  }, []);

  const doubled = [...logos, ...logos, ...logos, ...logos];

  return (
    <section className="py-10 border-y border-border/30 overflow-hidden">
      <p className="text-center text-xs text-muted-foreground/60 uppercase tracking-widest font-medium mb-6">Trusted by fast-growing teams</p>
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
        {isLoading ? (
          <div className="text-center text-sm text-muted-foreground/60 py-2">Loading...</div>
        ) : (
          <div className="flex animate-scroll gap-14 w-max">
            {doubled.map((logo, i) => {
              const content = logo.imageUrl ? (
                <img
                  src={logo.imageUrl}
                  alt={logo.altText ?? logo.name}
                  className="h-8 w-auto object-contain opacity-60 select-none"
                  loading="lazy"
                />
              ) : (
                <span className="text-sm font-semibold text-muted-foreground/50 tracking-wide whitespace-nowrap">
                  {logo.name}
                </span>
              );
              return logo.href ? (
                <a key={`${logo.id}-${i}`} href={logo.href} target="_blank" rel="noopener noreferrer" className="shrink-0">
                  {content}
                </a>
              ) : (
                <div key={`${logo.id}-${i}`} className="shrink-0">{content}</div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default LogoSlider;
