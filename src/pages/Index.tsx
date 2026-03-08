import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LogoSlider from "@/components/LogoSlider";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <Hero />
    <LogoSlider />
    <Features />
    <HowItWorks />
    <Stats />
    <Testimonials />
    <Pricing />
    <FAQ />
    <CTA />
    <Footer />
  </div>
);

export default Index;
