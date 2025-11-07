import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { TrendingDown, Zap } from "lucide-react";

interface Model {
  name: string;
  provider: string;
  icon: string;
  tokens: string;
  latency: string;
  growth: string;
  color: string;
}

const models: Model[] = [
  {
    name: "Gemini 2.5 Pro",
    provider: "google",
    icon: "🤖",
    tokens: "197.3B",
    latency: "2.5s",
    growth: "-12.18%",
    color: "primary",
  },
  {
    name: "GPT-5",
    provider: "openai",
    icon: "⚡",
    tokens: "59.6B",
    latency: "8.3s",
    growth: "-13.1%",
    color: "accent",
  },
  {
    name: "Claude Sonnet 4.5",
    provider: "anthropic",
    icon: "✨",
    tokens: "634.2B",
    latency: "1.9s",
    growth: "-10.99%",
    color: "secondary",
  },
];

const ModelCard = ({ model }: { model: Model }) => {
  return (
    <Card className="p-6 hover:shadow-glow transition-all duration-300 hover:-translate-y-1 bg-gradient-card border-border/50 hover:border-primary/30 group relative overflow-hidden">
      {/* Shimmer effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      
      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
              {model.icon}
            </div>
            <div>
              <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                {model.name}
              </h3>
              <p className="text-sm text-muted-foreground">by {model.provider}</p>
            </div>
          </div>
          <Badge variant="outline" className="bg-success/10 text-success border-success/20">
            Live
          </Badge>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6">
          <div>
            <div className="text-2xl font-bold text-foreground">{model.tokens}</div>
            <div className="text-xs text-muted-foreground mt-1">Tokens/wk</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-foreground flex items-center gap-1">
              <Zap className="w-4 h-4 text-warning" />
              {model.latency}
            </div>
            <div className="text-xs text-muted-foreground mt-1">Latency</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-success flex items-center gap-1">
              <TrendingDown className="w-4 h-4" />
              {model.growth}
            </div>
            <div className="text-xs text-muted-foreground mt-1">Growth</div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export const FeaturedModels = () => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            Featured Models
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Top Performing <span className="bg-gradient-primary bg-clip-text text-transparent">AI Models</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Real-time metrics from the most popular models in production
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {models.map((model, index) => (
            <ModelCard key={index} model={model} />
          ))}
        </div>

        <div className="text-center">
          <button className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-2 group">
            View All 500+ Models
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </div>
    </section>
  );
};
