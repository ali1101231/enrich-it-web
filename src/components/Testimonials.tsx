import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { websiteContentApi, type WebsiteTestimonial } from '@/lib/website-content-api';

interface Testimonial {
  id: string;
  quote: string;
  clientName: string;
  clientRole?: string;
  companyName?: string;
  avatarUrl?: string;
  rating?: number;
}

function normalize(t: WebsiteTestimonial & Record<string, unknown>): Testimonial {
  return {
    id: String(t.id),
    quote: (t['quote'] as string | undefined) ?? t.content ?? '',
    clientName: (t['clientName'] as string | undefined) ?? t.authorName ?? 'Anonymous',
    clientRole: (t['clientRole'] as string | undefined) ?? t.authorTitle,
    companyName: t['companyName'] as string | undefined,
    avatarUrl: (t['avatarUrl'] as string | undefined) ?? t.authorAvatarUrl,
    rating: t.rating,
  };
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'NA';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

const FALLBACK: Testimonial[] = [
  { id: '1', quote: 'Enrich it cut our list-building time in half. Email and phone enrichment is now part of every campaign we run.', clientName: 'Sarah Chen', clientRole: 'Head of Growth', companyName: 'Vercel', rating: 5 },
  { id: '2', quote: 'The domain to LinkedIn URL mapping is incredibly useful. Our team can identify the right companies much faster.', clientName: 'Marcus Webb', clientRole: 'VP of Sales', companyName: 'Stripe', rating: 5 },
  { id: '3', quote: 'We use company LinkedIn URLs as input and get enriched company profiles back in minutes. It\'s a huge workflow win.', clientName: 'Priya Nair', clientRole: 'Sales Ops Manager', companyName: 'Notion', rating: 5 },
  { id: '4', quote: 'Setup was simple and the enrichment output is consistent across email, phone, and company data.', clientName: 'James Kowalski', clientRole: 'Founder', companyName: 'Loom', rating: 5 },
  { id: '5', quote: 'The API is fast and predictable. We can enrich records at scale without changing our pipeline.', clientName: 'Aisha Mbeki', clientRole: 'CTO', companyName: 'Linear', rating: 5 },
  { id: '6', quote: 'Our SDR team now starts with enriched profiles instead of raw lists. Productivity improved right away.', clientName: 'Tom Lindqvist', clientRole: 'Director of Demand Gen', companyName: 'Figma', rating: 5 },
];

const Testimonials = ({ className }: { className?: string }) => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    websiteContentApi.getTestimonials()
      .then((data) => {
        if (!isMounted) return;
        const result = data.length > 0 ? data.map((t) => normalize(t as WebsiteTestimonial & Record<string, unknown>)) : FALLBACK;
        setTestimonials(result);
      })
      .catch(() => { if (isMounted) setTestimonials(FALLBACK); })
      .finally(() => { if (isMounted) setIsLoading(false); });
    return () => { isMounted = false; };
  }, []);

  const duplicatedTestimonials = useMemo(
    () => [...testimonials, ...testimonials, ...testimonials],
    [testimonials],
  );

  return (
    <section id="reviews" className={cn("py-24 lg:py-32 overflow-hidden", className)}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-6">
            <MessageSquare className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Testimonial</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight mb-4">
            What Our Clients are <span className="gradient-text">Saying</span>
          </h2>

          <p className="text-muted-foreground max-w-xl mx-auto text-base leading-relaxed">
            Hear directly from our clients about their experiences and the results we've delivered.
          </p>
        </motion.div>
      </div>

      {/* Infinite Scroll Container */}
      <div className="relative">
        {/* Side Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="overflow-hidden">
          <div className="flex gap-6 animate-scroll-testimonials w-max">
            {isLoading ? (
              <div className="min-w-[360px] max-w-[380px] flex-shrink-0 bg-card rounded-2xl border border-border/50 p-7 flex items-center justify-center">
                <p className="text-sm text-muted-foreground">Loading testimonials...</p>
              </div>
            ) : duplicatedTestimonials.map((testimonial, idx) => (
                <div
                  key={`${testimonial.id}-${idx}`}
                  className="min-w-[360px] max-w-[380px] flex-shrink-0 bg-card rounded-2xl border border-border/50 p-7 flex flex-col justify-between hover:border-primary/30 transition-all duration-300"
                >
                  {/* Content */}
                  <div className="flex-1 mb-6">
                    {/* Stars */}
                    {typeof testimonial.rating === 'number' && (
                      <div className="flex gap-1 mb-5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "w-4 h-4",
                              i < testimonial.rating
                                ? "text-primary fill-primary"
                                : "text-muted-foreground/30"
                            )}
                          />
                        ))}
                      </div>
                    )}

                    <p className="text-sm text-muted-foreground leading-relaxed">
                      "{testimonial.quote}"
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-dashed border-border/60 pt-5">
                    <div className="flex items-center gap-3">
                      {testimonial.avatarUrl ? (
                        <img
                          src={testimonial.avatarUrl}
                          alt={testimonial.clientName}
                          className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full ring-2 ring-primary/20 bg-muted text-muted-foreground text-xs font-semibold flex items-center justify-center">
                          {getInitials(testimonial.clientName)}
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-semibold text-foreground">{testimonial.clientName}</p>
                        <p className="text-xs text-muted-foreground">
                          {testimonial.clientRole}
                          {testimonial.clientRole && testimonial.companyName ? ' at ' : ''}
                          {testimonial.companyName}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
