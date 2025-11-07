import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-[50vh] flex items-center justify-center pt-32 pb-12 overflow-hidden">
      {/* Animated mesh background */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-40 animate-pulse-slow" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full animate-float opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        <div className="text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 animate-fade-in">
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">The Next Generation AI Gateway</span>
          </div>

          {/* Main heading with gradient */}
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-tight">
            <span className="bg-gradient-primary bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">
              The Unified
            </span>
            <br />
            <span className="text-foreground">Interface For AI</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Better <span className="text-primary font-semibold">prices</span>, better{" "}
            <span className="text-secondary font-semibold">uptime</span>, no subscription.
          </p>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
};
