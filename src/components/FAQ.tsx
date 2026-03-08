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
    q: 'What does "at scraping cost" mean?',
    a: "It means you get premium-quality enriched data at a fraction of what traditional providers charge — comparable to raw scraping costs but with verified, structured, and ready-to-use results.",
  },
  {
    q: "Do I need a developer or technical background to use Koldify?",
    a: "Not at all. While our APIs are developer-friendly, we also offer no-code integrations and a simple dashboard that anyone on your team can use.",
  },
  {
    q: "What specific use cases can Koldify handle for Growth teams?",
    a: "Lead enrichment, email verification, company firmographics, ICP scoring, CRM data hygiene, and outbound list building — all in real-time via API or bulk upload.",
  },
  {
    q: "How quickly can I get started with Koldify?",
    a: "You can sign up and start making API calls in under 5 minutes. We provide SDKs, Postman collections, and detailed documentation to get you up and running fast.",
  },
  {
    q: "What integrations and tools work best with Koldify?",
    a: "Koldify integrates seamlessly with Salesforce, HubSpot, Outreach, Apollo, Clay, Make, Zapier, and any tool that supports webhooks or REST APIs.",
  },
  {
    q: "Is Koldify GDPR compliant?",
    a: "Yes. We are fully GDPR compliant and take data privacy seriously. All data processing follows strict European data protection standards.",
  },
  {
    q: "Can I request a specific feature or additional API?",
    a: "Absolutely! We love hearing from our users. Reach out via our contact page or in-app chat and we'll prioritize based on demand.",
  },
];

const FAQ = () => (
  <section className="py-24 lg:py-32">
    <div className="container mx-auto px-4 max-w-3xl">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
          Frequently Asked Questions
        </h2>
        <p className="text-muted-foreground mt-4 text-sm max-w-lg mx-auto">
          Everything you need to know about using Koldify. Still have questions?
          Drop us a message — we'll get back to you quickly.
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {faqs.map(({ q, a }, i) => (
          <AccordionItem key={i} value={`item-${i}`} className="border-b border-border/50 bg-card/40 px-4 first:rounded-t-xl last:rounded-b-xl">
            <AccordionTrigger className="text-sm font-medium hover:no-underline">{q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
              {a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export default FAQ;
