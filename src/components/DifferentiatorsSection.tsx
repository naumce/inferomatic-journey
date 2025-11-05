import { GitBranch, LineChart, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";

export const DifferentiatorsSection = () => {
  const features = [
    {
      icon: Zap,
      title: "Auto-Routing",
      description: "Let Infere pick the best model for every request. Cost, speed, quality - optimized automatically.",
      gradient: "from-primary to-secondary"
    },
    {
      icon: GitBranch,
      title: "Git-Native",
      description: "Version your prompts like code. Branch, merge, and deploy with your existing workflow.",
      gradient: "from-secondary to-accent"
    },
    {
      icon: LineChart,
      title: "Full Observability",
      description: "Every token, every cost, every millisecond - tracked in real-time with custom dashboards.",
      gradient: "from-accent to-primary"
    }
  ];

  return (
    <section id="features" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            Three Core Powers
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything you need. Nothing you don't.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((item, index) => (
            <Card 
              key={index}
              className="group p-8 bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow hover:scale-105 cursor-pointer"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <item.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">{item.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
