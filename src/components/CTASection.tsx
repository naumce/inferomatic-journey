import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const CTASection = () => {
  return (
    <section className="py-32 px-6 relative overflow-hidden bg-gradient-hero">
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-accent bg-clip-text text-transparent">
          Start Building Today
        </h2>
        <p className="text-xl text-muted-foreground mb-12">
          Free forever. No credit card required.
        </p>

        <Button size="lg" className="bg-gradient-card hover:opacity-90 text-white shadow-glow transition-all hover:scale-110 gap-2 text-lg px-8 py-6">
          Get Started <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </section>
  );
};
