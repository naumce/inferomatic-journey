import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { InteractiveDemo } from "./InteractiveDemo";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-hero opacity-50" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary animate-fade-in">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">The AI Gateway for Production</span>
          </div>

          {/* Main heading - modern and emotional */}
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight animate-slide-up">
            <span className="bg-gradient-card bg-clip-text text-transparent">
              Route. Version. Ship.
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            The only AI gateway with Git-powered prompts and real-time observability
          </p>
          
          <Button size="lg" className="bg-gradient-card hover:opacity-90 text-white shadow-glow transition-all hover:scale-105 gap-2">
            Start Free <ArrowRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Interactive demo */}
        <InteractiveDemo />
      </div>
    </section>
  );
};
