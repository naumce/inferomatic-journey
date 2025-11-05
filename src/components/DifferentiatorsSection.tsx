import { Card } from "@/components/ui/card";
import { Check, X } from "lucide-react";

export const DifferentiatorsSection = () => {
  const features = [
    { name: "Chat Interface", openrouter: true, infere: "Multi-model comparison" },
    { name: "Model Selection", openrouter: true, infere: "Side-by-side + auto-routing" },
    { name: "Cost Tracking", openrouter: false, infere: "Real-time per message" },
    { name: "Observability", openrouter: false, infere: "Live metrics panel" },
    { name: "Prompt Versioning", openrouter: false, infere: "Git-powered" },
    { name: "Variables Support", openrouter: false, infere: "Auto-detect {{var}}" },
    { name: "Routing Visualization", openrouter: false, infere: "Show why model was picked" },
    { name: "Template Library", openrouter: false, infere: "Git-versioned templates" },
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What You Just Saw
          </h2>
          <p className="text-xl text-muted-foreground">
            3 things OpenRouter can't do
          </p>
        </div>

        <Card className="overflow-hidden bg-card border-border shadow-card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-6 font-semibold">Feature</th>
                  <th className="text-center p-6 font-semibold text-muted-foreground">OpenRouter</th>
                  <th className="text-center p-6 font-semibold text-primary">Infere</th>
                </tr>
              </thead>
              <tbody>
                {features.map((feature, index) => (
                  <tr 
                    key={feature.name} 
                    className={`border-b border-border/50 hover:bg-muted/5 transition-colors ${
                      index % 2 === 0 ? 'bg-background/30' : ''
                    }`}
                  >
                    <td className="p-6 font-medium">{feature.name}</td>
                    <td className="p-6 text-center">
                      {typeof feature.openrouter === 'boolean' ? (
                        feature.openrouter ? (
                          <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent/20">
                            <Check className="w-4 h-4 text-accent" />
                          </div>
                        ) : (
                          <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-muted">
                            <X className="w-4 h-4 text-muted-foreground" />
                          </div>
                        )
                      ) : (
                        <span className="text-sm text-muted-foreground">{feature.openrouter}</span>
                      )}
                    </td>
                    <td className="p-6 text-center">
                      <span className="text-sm font-semibold text-primary">{feature.infere}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Key differentiators */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <DifferentiatorCard 
            number="1"
            title="Compare Models Side-by-Side"
            description="See responses from multiple models instantly"
          />
          <DifferentiatorCard 
            number="2"
            title="Git-Powered Prompts"
            description="Version, branch, and deploy prompts like code"
          />
          <DifferentiatorCard 
            number="3"
            title="Real-Time Observability"
            description="Every token, every cost, every millisecond tracked"
          />
        </div>
      </div>
    </section>
  );
};

const DifferentiatorCard = ({ number, title, description }: { number: string; title: string; description: string }) => (
  <Card className="p-6 bg-gradient-card border-border hover:border-primary/50 transition-all duration-300">
    <div className="text-5xl font-bold text-primary/20 mb-3">{number}</div>
    <h3 className="font-bold text-lg mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground">{description}</p>
  </Card>
);
