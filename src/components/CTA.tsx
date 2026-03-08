import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTA = () => (
  <section className="py-24 lg:py-32">
    <div className="container mx-auto px-4">
      <div className="gradient-primary rounded-2xl p-10 sm:p-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary-foreground tracking-tight mb-4">
            Start Building Better<br />Lead Lists Today
          </h2>
          <p className="text-primary-foreground/70 max-w-xl mx-auto mb-8">
            Join thousands of sales teams using Koldify to close more deals.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="hero-outline" size="lg" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 gap-2">
              Start Free <ArrowRight size={16} />
            </Button>
            <Button variant="ghost" size="lg" className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10">
              Book Demo
            </Button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default CTA;
