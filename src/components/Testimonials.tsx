import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Alisa Olivia",
    role: "CTO at Ritovex",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
    content: "I came to them with a vague idea, and they helped me refine it into a concrete plan. Throughout the process, they kept me informed and involved, ensuring I was happy with the direction. The results were better than I imagined.",
    rating: 5
  },
  {
    id: 2,
    name: "Jordan Walk",
    role: "Software Engineer at Briks",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
    content: "Working with them was a true pleasure. They were responsive, communicative, and always willing to go the extra mile. I especially appreciated their attention to detail and creative problem solving.",
    rating: 5
  },
  {
    id: 3,
    name: "Ema Watson",
    role: "Founder at Ritof",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=150&h=150",
    content: "Throughout the process, they kept me informed and involved, ensuring I was happy with the direction. I came to them with a vague idea, and they helped me refine it into a concrete plan that worked for our budget.",
    rating: 4
  },
  {
    id: 4,
    name: "Marcus Thorne",
    role: "CEO at ThorneDev",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150",
    content: "The level of professionalism was unmatched. They delivered exactly what we needed within the tight deadline. A truly exceptional partnership.",
    rating: 5
  },
  {
    id: 5,
    name: "Sarah Chen",
    role: "Lead Designer at PixelFlow",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150",
    content: "Intuitive, clean, and fast. The design language they established for our brand has set us apart from the competition completely.",
    rating: 5
  }
];

const Testimonials = ({ className }: { className?: string }) => {
  const duplicatedTestimonials = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

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

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    "{testimonial.content}"
                  </p>
                </div>

                {/* Divider */}
                <div className="border-t border-dashed border-border/60 pt-5">
                  <div className="flex items-center gap-3">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20"
                    />
                    <div>
                      <p className="text-sm font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
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
