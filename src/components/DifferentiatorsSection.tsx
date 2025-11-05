import { GitBranch, LineChart, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";

export const DifferentiatorsSection = () => {
  const features = [
    {
      icon: Zap,
      title: "Intelligent Routing",
      description: "Stop manually picking models. Infere automatically selects the optimal model for each request based on your cost, speed, and quality requirements. Built-in fallbacks ensure 99.9% uptime even when providers have issues.",
    },
    {
      icon: GitBranch,
      title: "Git-Native Prompts",
      description: "Treat prompts like code. Create branches to test changes, submit pull requests for review, and deploy to production with confidence. Roll back instantly if something breaks. Your entire prompt history is versioned.",
    },
    {
      icon: LineChart,
      title: "Complete Observability",
      description: "Know exactly what your AI is doing. Track every token, request, cost, and response time. Custom dashboards show usage patterns, cost breakdowns by model, and performance metrics. Set alerts for anomalies.",
    }
  ];

  return (
    <section id="features" className="py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Why Use Infere?
          </h2>
          <p className="text-xl text-muted-foreground">
            Three capabilities that set us apart
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <Card 
              key={index}
              className="p-8 bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-foreground">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
