import { Card } from "@/components/ui/card";
import { User, CreditCard, Key } from "lucide-react";

const steps = [
  {
    number: "1",
    title: "Signup",
    description: "Create an account to get started. You can set up an org for your team later.",
    icon: User,
    color: "primary",
  },
  {
    number: "2",
    title: "Buy credits",
    description: "Credits can be used with any model or provider.",
    icon: CreditCard,
    color: "secondary",
  },
  {
    number: "3",
    title: "Get your API key",
    description: "Create an API key and start making requests. Fully OpenAI compatible.",
    icon: Key,
    color: "accent",
  },
];

export const GettingStarted = () => {
  return (
    <section className="py-20 relative bg-muted/30">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Get Started in <span className="bg-gradient-accent bg-clip-text text-transparent">3 Steps</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            From zero to production in under 5 minutes
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="p-8 relative overflow-hidden group hover:shadow-lg transition-all duration-300 bg-card border-border/50 hover:border-primary/30 hover:-translate-y-2"
            >
              {/* Step number background */}
              <div className="absolute -top-4 -right-4 text-[120px] font-bold text-primary/5 group-hover:text-primary/10 transition-colors">
                {step.number}
              </div>

              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-glow">
                  <step.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold mb-3 text-foreground">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Code snippet example */}
        <Card className="mt-12 p-6 bg-card/50 backdrop-blur-sm border-border/50">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-mono text-muted-foreground">API Integration</span>
            <span className="text-xs text-primary">OpenAI Compatible</span>
          </div>
          <pre className="text-sm text-foreground bg-muted/50 p-4 rounded-lg overflow-x-auto">
            <code>{`import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://api.infere.ai/v1",
  apiKey: process.env.INFERE_API_KEY,
});

const completion = await client.chat.completions.create({
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello!" }],
});`}</code>
          </pre>
        </Card>
      </div>
    </section>
  );
};
