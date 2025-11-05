import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ChatDemo } from "./ChatDemo";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground">
            Ship AI Prompts Like Code
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Intelligent routing, Git-powered versioning, and complete observability for production AI applications.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" className="gap-2">
              Get Started <ArrowRight className="w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline">
              View Docs
            </Button>
          </div>
        </div>

        {/* Interactive Chat Demo */}
        <div className="max-w-5xl mx-auto animate-slide-up">
          <ChatDemo />
        </div>
      </div>
    </section>
  );
};
