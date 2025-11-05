import { GitBranch, LineChart, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";

export const DifferentiatorsSection = () => {
  const features = [
    {
      icon: Zap,
      title: "Intelligent Routing",
      description: "Automatically route to the best model based on cost, speed, and quality. Built-in fallbacks ensure 99.9% uptime."
    },
    {
      icon: GitBranch,
      title: "Git-Powered Prompts",
      description: "Version control for AI prompts. Create branches, review changes, and deploy with confidence using your existing Git workflow."
    },
    {
      icon: LineChart,
      title: "Advanced Observability",
      description: "Real-time monitoring of every request, token, and cost. Custom dashboards, alerts, and analytics built in."
    }
  ];

  return (
    <section id="features" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Built for Production
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to ship AI applications with confidence
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <Card 
              key={index}
              className="p-8 bg-card border-border hover:border-foreground/20 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center mb-6">
                <item.icon className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
