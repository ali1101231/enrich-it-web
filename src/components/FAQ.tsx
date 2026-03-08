import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const faqData = [
  { question: "What exactly is Koldify?", answer: "Koldify is a collection of high-performance B2B data APIs designed specifically for Growth, Revenue, and Operations teams. From ICP targeting and contact enrichment to email validation, our APIs provide real-time, verified data at the lowest possible cost." },
  { question: 'What does "at scraping cost" mean?', answer: "It means you get premium-quality enriched data at a fraction of what traditional providers charge — comparable to raw scraping costs but with verified, structured, and ready-to-use results." },
  { question: "Do I need a developer or technical background?", answer: "Not at all. While our APIs are developer-friendly, we also offer no-code integrations and a simple dashboard that anyone on your team can use." },
  { question: "What use cases can Koldify handle for Growth teams?", answer: "Lead enrichment, email verification, company firmographics, ICP scoring, CRM data hygiene, and outbound list building — all in real-time via API or bulk upload." },
  { question: "How quickly can I get started?", answer: "You can sign up and start making API calls in under 5 minutes. We provide SDKs, Postman collections, and detailed documentation to get you up and running fast." },
  { question: "What integrations work with Koldify?", answer: "Koldify integrates seamlessly with Salesforce, HubSpot, Outreach, Apollo, Clay, Make, Zapier, and any tool that supports webhooks or REST APIs." },
  { question: "Is Koldify GDPR compliant?", answer: "Yes. We are fully GDPR compliant and take data privacy seriously. All data processing follows strict European data protection standards." },
  { question: "Can I request a specific feature?", answer: "Absolutely! We love hearing from our users. Reach out via our contact page or in-app chat and we'll prioritize based on demand." },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 lg:py-32">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="section-divider !mx-0 !mb-0" />
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">FAQ</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-foreground">
              Everything you wanted<br />to ask.
            </h2>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all duration-300 group w-fit"
          >
            Contact Us
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
          {/* LEFT: Contact Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 bg-card border border-border/50 rounded-3xl p-8 h-fit"
          >
            <h3 className="text-2xl font-bold font-display text-foreground mb-6">Contact Us</h3>

            <div className="space-y-4 mb-6">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border/50 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Email</label>
                <input
                  type="email"
                  placeholder="you@company.com"
                  className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border/50 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Message</label>
                <textarea
                  rows={4}
                  placeholder="How can we help?"
                  className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border/50 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none"
                />
              </div>
            </div>

            <button className="w-full gradient-primary text-primary-foreground py-4 rounded-full font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 group hover:brightness-110">
              Send Message
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>

          {/* RIGHT: FAQ Accordion */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 flex flex-col"
          >
            <div className="flex flex-col">
              {faqData.map((item, index) => (
                <div key={index} className="py-5 border-b border-border/40 last:border-b-0">
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full flex items-center justify-between text-left group"
                  >
                    <span className={cn(
                      "text-[15px] md:text-[17px] font-medium transition-colors duration-300",
                      openIndex === index ? "text-primary" : "text-foreground"
                    )}>
                      {item.question}
                    </span>
                    <div className={cn(
                      "w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 shrink-0 ml-4",
                      openIndex === index
                        ? "bg-primary border-primary text-primary-foreground"
                        : "border-border text-muted-foreground"
                    )}>
                      {openIndex === index ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>

                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="overflow-hidden"
                      >
                        <p className="pt-3 text-muted-foreground text-[14px] leading-relaxed max-w-[90%]">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
