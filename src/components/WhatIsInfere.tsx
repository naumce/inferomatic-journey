import { Card } from "@/components/ui/card";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const WhatIsInfere = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="space-y-12">
          {/* Main explanation */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              What is Infere?
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Infere is an AI gateway that sits between your application and AI providers like OpenAI, Anthropic, and Google. 
              It intelligently routes each request to the optimal model based on your requirements, manages prompt versions through Git, 
              and provides complete observability into your AI operations.
            </p>
          </div>

          {/* Key problems solved */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-foreground">
              Problems We Solve
            </h3>
            <div className="grid gap-4">
              <ProblemCard 
                problem="Manually choosing models for every request"
                solution="Auto-routing picks the best model based on cost, speed, and quality requirements"
              />
              <ProblemCard 
                problem="Prompt changes breaking production"
                solution="Git-based versioning with branches, pull requests, and rollbacks"
              />
              <ProblemCard 
                problem="No visibility into AI costs and performance"
                solution="Real-time tracking of every token, request, cost, and latency"
              />
              <ProblemCard 
                problem="Vendor lock-in to single AI provider"
                solution="Switch between GPT-4, Claude, Gemini with one line of code"
              />
            </div>
          </div>

          {/* How it works */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-foreground">
              How It Works
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 space-y-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-lg">
                  1
                </div>
                <h4 className="font-semibold text-lg">Connect</h4>
                <p className="text-muted-foreground">
                  Replace your OpenAI API endpoint with Infere. Drop-in compatible, no code changes needed.
                </p>
              </Card>
              
              <Card className="p-6 space-y-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-lg">
                  2
                </div>
                <h4 className="font-semibold text-lg">Configure</h4>
                <p className="text-muted-foreground">
                  Set your routing preferences: optimize for cost, speed, or quality. Define fallback chains.
                </p>
              </Card>
              
              <Card className="p-6 space-y-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-lg">
                  3
                </div>
                <h4 className="font-semibold text-lg">Monitor</h4>
                <p className="text-muted-foreground">
                  Watch real-time dashboards showing usage, costs, and performance across all models.
                </p>
              </Card>
            </div>
          </div>

          {/* Key features list */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-foreground">
              Core Features
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <FeatureItem text="Automatic model routing based on your criteria" />
              <FeatureItem text="Git-based prompt version control" />
              <FeatureItem text="Real-time cost and usage analytics" />
              <FeatureItem text="Automatic fallbacks if primary model fails" />
              <FeatureItem text="Support for GPT-4, Claude, Gemini, and more" />
              <FeatureItem text="OpenAI SDK compatible" />
              <FeatureItem text="Custom routing rules and constraints" />
              <FeatureItem text="Team collaboration with prompt reviews" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ProblemCard = ({ problem, solution }: { problem: string; solution: string }) => (
  <Card className="p-4 hover:border-primary/50 transition-colors">
    <div className="flex gap-4 items-start">
      <div className="flex-1">
        <div className="text-muted-foreground mb-1">{problem}</div>
        <div className="flex items-start gap-2">
          <ArrowRight className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
          <div className="font-medium text-foreground">{solution}</div>
        </div>
      </div>
    </div>
  </Card>
);

const FeatureItem = ({ text }: { text: string }) => (
  <div className="flex items-start gap-3">
    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
    <span className="text-foreground">{text}</span>
  </div>
);
