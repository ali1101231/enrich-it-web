import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTA = () => (
  <section className="py-24 lg:py-32">
    <div className="container mx-auto px-4">
      <div className="gradient-primary rounded-3xl p-12 sm:p-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-[0.06]" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-foreground/[0.04] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-primary-foreground tracking-tight mb-5 leading-tight">
            Start Enriching Better
            <br />
            Contact & Company Data
          </h2>
          <p className="text-primary-foreground/60 max-w-md mx-auto mb-10 text-lg">
            Enrich email, phone, domain-to-LinkedIn URL, and company LinkedIn-based data in one workflow.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button variant="hero-outline" size="lg" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 gap-2 h-12 rounded-xl px-8 text-base">
              Start Free <ArrowRight size={16} />
            </Button>
            <Button variant="ghost" size="lg" className="text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/10 h-12 rounded-xl px-8 text-base">
              Book a Demo
            </Button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default CTA;
