import { Badge } from "@/components/ui/badge";

const providers = [
  { name: "OpenAI", icon: "⚡", color: "bg-primary/10" },
  { name: "Anthropic", icon: "✨", color: "bg-accent/10" },
  { name: "Google", icon: "🎯", color: "bg-secondary/10" },
  { name: "Meta", icon: "🦙", color: "bg-primary/10" },
  { name: "Mistral", icon: "🌟", color: "bg-accent/10" },
  { name: "Cohere", icon: "🔮", color: "bg-secondary/10" },
  { name: "Perplexity", icon: "🔍", color: "bg-primary/10" },
  { name: "DeepSeek", icon: "🧠", color: "bg-accent/10" },
];

export const ProvidersShowcase = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-20 pointer-events-none" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            One API for Everything
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Access <span className="bg-gradient-primary bg-clip-text text-transparent">60+ Providers</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Access all major models through a single, unified interface. OpenAI SDK works out of the box.
          </p>
        </div>

        {/* Providers grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {providers.map((provider, index) => (
            <div
              key={index}
              className="group relative p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex flex-col items-center gap-3">
                <div className={`w-16 h-16 rounded-xl ${provider.color} flex items-center justify-center text-3xl group-hover:scale-110 transition-transform`}>
                  {provider.icon}
                </div>
                <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {provider.name}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <button className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-2 group">
            Browse All Providers
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </div>
    </section>
  );
};
