import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "What exactly is Koldify?",
    a: "Koldify is a collection of high-performance B2B data APIs designed specifically for Growth, Revenue, and Operations teams. From ICP targeting and contact enrichment to email validation, our APIs provide real-time, verified data at the lowest possible cost.",
  },
  {
    q: "What does \"at scraping cost\" mean?",
    a: "It means you get premium, verified B2B data at prices comparable to raw data scraping — without the legal risks, maintenance overhead, or quality issues that come with building your own scraping infrastructure.",
  },
  {
    q: "Do I need a developer or technical background to use Koldify?",
    a: "Not at all. While we offer powerful APIs for developers, our platform includes a no-code dashboard where you can search contacts, enrich lists via CSV upload, and export data — all without writing a single line of code.",
  },
  {
    q: "What specific use cases can Koldify handle for Growth teams?",
    a: "Koldify supports ICP-based prospecting, lead list building, contact enrichment, email verification, company firmographic lookups, domain searches, and CRM data hygiene — everything a modern GTM team needs.",
  },
  {
    q: "How quickly can I get started with Koldify?",
    a: "You can sign up and start searching or enriching data in under 2 minutes. No credit card required for the free tier. API keys are generated instantly.",
  },
  {
    q: "What integrations and tools work best with Koldify?",
    a: "Koldify integrates natively with HubSpot, Salesforce, Zapier, Google Sheets, and Slack. Our REST API also lets you connect to any tool in your stack.",
  },
  {
    q: "Is Koldify GDPR compliant?",
    a: "Yes. Koldify is fully GDPR compliant. We only process publicly available business data and provide data subject access and deletion tools.",
  },
  {
    q: "Can I request a specific feature or additional API?",
    a: "Absolutely. We love hearing from our users. Reach out via our contact page or email us directly — we ship new features and endpoints regularly based on user feedback.",
  },
];

const FAQ = () => (
  <section className="py-24 lg:py-32">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">Frequently Asked Questions</h2>
        <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
          Everything you need to know about using Koldify. Still have questions?<br />
          Drop us a message — we'll get back to you quickly.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="max-w-2xl mx-auto"
      >
        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map(({ q, a }, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="glass rounded-lg px-5 border border-border/50"
            >
              <AccordionTrigger className="text-sm font-medium hover:no-underline py-4">
                {q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                {a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </div>
  </section>
);

export default FAQ;
