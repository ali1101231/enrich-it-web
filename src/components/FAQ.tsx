import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { websiteContentApi, type ContactSubmissionRequest, type WebsiteFaq } from '@/lib/website-content-api';

const FALLBACK_FAQS: WebsiteFaq[] = [
  { id: '1', question: 'What is Enrich it and how does it work?', answer: 'Enrich it is a B2B data enrichment platform that helps you find, verify, and enrich contact and company data in real-time. Simply upload a list or search our database to get enriched profiles instantly.' },
  { id: '2', question: 'How accurate is the data?', answer: 'We guarantee 99%+ email deliverability on all verified contacts. Our data is refreshed continuously using AI-powered signals from across the web, ensuring you always have the most up-to-date information.' },
  { id: '3', question: 'What integrations do you support?', answer: 'Enrich it integrates natively with Salesforce, HubSpot, Pipedrive, Outreach, and hundreds more via our Zapier and native API. Setup takes less than 5 minutes.' },
  { id: '4', question: 'Is my data secure?', answer: 'Yes. We are SOC 2 Type II certified and fully GDPR compliant. All data is encrypted at rest and in transit. We never sell your data to third parties.' },
  { id: '5', question: 'Can I try Enrich it before paying?', answer: 'Absolutely. Our free plan includes 50 credits per month with no credit card required. Upgrade anytime as your team grows.' },
  { id: '6', question: 'What happens if I run out of credits?', answer: 'You can purchase additional credits at any time, or upgrade to a higher plan. Credits roll over monthly on annual plans.' },
];

const INITIAL_CONTACT_FORM: ContactSubmissionRequest = {
  fullName: '',
  email: '',
  company: '',
  phone: '',
  subject: '',
  message: '',
};

const FAQ = () => {
  const [faqs, setFaqs] = useState<WebsiteFaq[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [contactForm, setContactForm] = useState<ContactSubmissionRequest>(INITIAL_CONTACT_FORM);
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);
  const [contactError, setContactError] = useState<string | null>(null);
  const [contactSuccess, setContactSuccess] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    websiteContentApi.getFaqs()
      .then((data) => {
        if (!isMounted) return;
        const result = Array.isArray(data) && data.length > 0 ? data : FALLBACK_FAQS;
        setFaqs(result);
        setOpenIndex(result.length > 0 ? 0 : null);
      })
      .catch(() => {
        if (!isMounted) return;
        setFaqs(FALLBACK_FAQS);
        setOpenIndex(0);
      })
      .finally(() => { if (isMounted) setIsLoading(false); });
    return () => { isMounted = false; };
  }, []);

  const handleContactInputChange = (field: keyof ContactSubmissionRequest, value: string) => {
    setContactForm((prev) => ({ ...prev, [field]: value }));
    if (contactError) setContactError(null);
    if (contactSuccess) setContactSuccess(null);
  };

  const handleContactSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmittingContact) return;

    const fullName = contactForm.fullName.trim();
    const email = contactForm.email.trim();
    const message = contactForm.message.trim();

    if (!fullName || !email || !message) {
      setContactSuccess(null);
      setContactError('Please fill in full name, email, and message.');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setContactSuccess(null);
      setContactError('Please enter a valid email address.');
      return;
    }

    setIsSubmittingContact(true);
    setContactError(null);
    setContactSuccess(null);

    try {
      await websiteContentApi.submitContactForm({
        fullName,
        email,
        company: contactForm.company.trim(),
        phone: contactForm.phone.trim(),
        subject: contactForm.subject.trim(),
        message,
      });
      setContactForm(INITIAL_CONTACT_FORM);
      setContactSuccess('Thanks! Your message has been submitted successfully.');
    } catch {
      setContactError('Unable to submit your message right now. Please try again.');
    } finally {
      setIsSubmittingContact(false);
    }
  };

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

            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Name</label>
                <input
                  type="text"
                  required
                  value={contactForm.fullName}
                  onChange={(event) => handleContactInputChange('fullName', event.target.value)}
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border/50 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Email</label>
                <input
                  type="email"
                  required
                  value={contactForm.email}
                  onChange={(event) => handleContactInputChange('email', event.target.value)}
                  placeholder="you@company.com"
                  className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border/50 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Message</label>
                <textarea
                  rows={4}
                  required
                  value={contactForm.message}
                  onChange={(event) => handleContactInputChange('message', event.target.value)}
                  placeholder="How can we help?"
                  className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border/50 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmittingContact}
                className="w-full gradient-primary text-primary-foreground py-4 rounded-full font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 group hover:brightness-110 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmittingContact ? 'Sending...' : 'Send Message'}
                {!isSubmittingContact && <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
              </button>

              {contactError && (
                <p className="text-sm text-destructive">{contactError}</p>
              )}
              {contactSuccess && (
                <p className="text-sm text-primary">{contactSuccess}</p>
              )}
            </form>
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
              {isLoading ? (
                <div className="py-5 border-b border-border/40">
                  <p className="text-[15px] md:text-[17px] font-medium text-muted-foreground">Loading FAQs...</p>
                </div>
              ) : faqs.map((item, index) => (
                  <div key={item.id} className="py-5 border-b border-border/40 last:border-b-0">
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
