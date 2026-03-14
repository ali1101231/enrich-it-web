import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Testimonial {
  id: string;
  quote: string;
  clientName: string;
  clientRole?: string;
  companyName?: string;
  rating?: number;
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'NA';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

const TESTIMONIALS: Testimonial[] = [
  { id: '1', quote: 'Enrich it cut our prospecting time in half. The data quality is unmatched — we\'ve never had bounce rates this low.', clientName: 'Sarah Chen', clientRole: 'Head of Growth', companyName: 'Vercel', rating: 5 },
  { id: '2', quote: 'We tried every enrichment tool on the market. Enrich it is the only one that consistently delivers accurate, fresh data at scale.', clientName: 'Marcus Webb', clientRole: 'VP of Sales', companyName: 'Stripe', rating: 5 },
  { id: '3', quote: 'The HubSpot integration is seamless. Our SDRs now spend 80% of their time selling instead of researching.', clientName: 'Priya Nair', clientRole: 'Sales Ops Manager', companyName: 'Notion', rating: 5 },
  { id: '4', quote: 'ROI was positive within the first week. The email verification alone saved us thousands in bounce penalties.', clientName: 'James Kowalski', clientRole: 'Founder', companyName: 'Loom', rating: 5 },
  { id: '5', quote: 'Finally a B2B data tool built for speed. API response times are incredible and the coverage is global.', clientName: 'Aisha Mbeki', clientRole: 'CTO', companyName: 'Linear', rating: 5 },
  { id: '6', quote: 'Our outbound conversion rate went up 3x after switching. The intent signals feature is a game changer.', clientName: 'Tom Lindqvist', clientRole: 'Director of Demand Gen', companyName: 'Figma', rating: 5 },
];

const duplicatedTestimonials = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

const Testimonials = ({ className }: { className?: string }) => {

  return (
    <section className={cn("py-24 lg:py-32 overflow-hidden", className)}>
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
            {duplicatedTestimonials.map((testimonial, idx) => (
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
