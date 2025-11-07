import { Card } from "@/components/ui/card";
import { Shield, LineChart, Zap, GitBranch } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Higher Availability",
    description: "Reliable AI models via our distributed infrastructure. Fall back to other providers when one goes down.",
    gradient: "from-primary to-secondary",
    stats: "99.9% uptime",
  },
  {
    icon: LineChart,
    title: "Price and Performance",
    description: "Keep costs in check without sacrificing speed. Infere runs at the edge, adding just ~25ms between your users and their inference.",
    gradient: "from-secondary to-accent",
    stats: "25ms latency",
  },
  {
    icon: Shield,
    title: "Custom Data Policies",
    description: "Protect your organization with fine grained data policies. Ensure prompts only go to the models and providers you trust.",
    gradient: "from-accent to-primary",
    stats: "Enterprise ready",
  },
  {
    icon: GitBranch,
    title: "Model Routing",
    description: "Intelligent routing automatically selects the best model for your request based on cost, speed, and quality requirements.",
    gradient: "from-primary to-accent",
    stats: "Auto-optimize",
  },
];

export const FeatureShowcase = () => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Built for <span className="bg-gradient-accent bg-clip-text text-transparent">Production</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to run AI in production at scale
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-8 group hover:shadow-glow transition-all duration-500 bg-gradient-card border-border/50 hover:border-primary/30 relative overflow-hidden"
            >
              {/* Animated gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

              <div className="relative">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-glow`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>

                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded">
                    {feature.stats}
                  </span>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>

                <button className="mt-4 text-primary hover:text-primary/80 font-medium inline-flex items-center gap-2 group/btn">
                  Learn more
                  <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
