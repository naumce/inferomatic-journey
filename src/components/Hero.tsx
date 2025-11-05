import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Zap, GitBranch } from "lucide-react";
import { ChatDemo } from "./ChatDemo";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-hero" />
      
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(217_33%_20%/0.1)_1px,transparent_1px),linear-gradient(to_bottom,hsl(217_33%_20%/0.1)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20">
        {/* Header badges */}
        <div className="flex justify-center gap-3 mb-8 animate-fade-in">
          <Badge variant="outline" className="border-primary/50 bg-primary/10 text-primary">
            <Sparkles className="w-3 h-3 mr-1" />
            Smart Routing
          </Badge>
          <Badge variant="outline" className="border-secondary/50 bg-secondary/10 text-secondary">
            <GitBranch className="w-3 h-3 mr-1" />
            Git-Powered
          </Badge>
          <Badge variant="outline" className="border-accent/50 bg-accent/10 text-accent">
            <Zap className="w-3 h-3 mr-1" />
            Real-time Observability
          </Badge>
        </div>

        {/* Main heading */}
        <div className="text-center mb-6 animate-slide-up">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            Ship AI Prompts Like Code
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Route smarter • Version with Git • Observe everything
          </p>
        </div>

        {/* Interactive chat demo */}
        <div className="mt-12">
          <ChatDemo />
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 animate-fade-in">
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow">
            Try It Free - No Signup Required
          </Button>
          <Button size="lg" variant="outline" className="border-border hover:bg-card">
            View Documentation
          </Button>
        </div>

        {/* Social proof */}
        <p className="text-center text-sm text-muted-foreground mt-8">
          Trusted by developers building the next generation of AI applications
        </p>
      </div>
    </section>
  );
};
