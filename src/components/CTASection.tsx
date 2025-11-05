import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const CTASection = () => {
  return (
    <section className="py-24 px-4">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground">
          Ready to Get Started?
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Start routing smarter today. Free tier available. No credit card required.
        </p>

        <div className="flex gap-4 justify-center">
          <Button size="lg" className="gap-2">
            Start Free <ArrowRight className="w-4 h-4" />
          </Button>
          <Button size="lg" variant="outline">
            View Pricing
          </Button>
        </div>
      </div>
    </section>
  );
};
