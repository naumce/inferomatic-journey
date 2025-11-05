import { Button } from "@/components/ui/button";
import { ArrowRight, Github } from "lucide-react";
import { InteractiveDemo } from "./InteractiveDemo";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20">      
      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        <div className="text-center mb-16 space-y-6">
          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground">
            AI Gateway for Developers
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Route requests to the best AI model automatically. Version your prompts with Git. 
            Monitor every token and dollar in real-time.
          </p>
          
          <div className="flex gap-4 justify-center pt-4">
            <Button size="lg" className="gap-2">
              Start Free <ArrowRight className="w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline" className="gap-2">
              <Github className="w-4 h-4" /> View on GitHub
            </Button>
          </div>
        </div>

        {/* Interactive demo */}
        <InteractiveDemo />
      </div>
    </section>
  );
};
