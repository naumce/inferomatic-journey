import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Send, Zap, DollarSign, Clock, TrendingUp, Sparkles } from "lucide-react";

const MODELS = [
  {
    id: "auto",
    name: "Auto Route",
    provider: "infere",
    icon: "🎯",
    description: "Let Infere pick the best model",
  },
  {
    id: "gpt-5",
    name: "GPT-5",
    provider: "openai",
    icon: "⚡",
    cost: "$0.15",
    latency: "2.3s",
    quality: "95",
  },
  {
    id: "claude-sonnet",
    name: "Claude Sonnet 4.5",
    provider: "anthropic",
    icon: "✨",
    cost: "$0.08",
    latency: "1.8s",
    quality: "97",
  },
  {
    id: "gemini-pro",
    name: "Gemini 2.5 Pro",
    provider: "google",
    icon: "🤖",
    cost: "$0.12",
    latency: "2.1s",
    quality: "93",
  },
];

export const LiveRoutingDemo = () => {
  const [input, setInput] = useState("Explain quantum computing in simple terms");
  const [selectedModel, setSelectedModel] = useState("auto");
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleTest = () => {
    setIsProcessing(true);
    
    // Simulate routing decision
    setTimeout(() => {
      const chosen = selectedModel === "auto" 
        ? MODELS[2] // Claude wins for this use case
        : MODELS.find(m => m.id === selectedModel);
      
      setResult({
        model: chosen,
        reasoning: selectedModel === "auto" 
          ? "Best balance of cost, speed, and quality for educational content"
          : "User selected model",
        metrics: {
          cost: chosen?.cost || "$0.08",
          latency: chosen?.latency || "1.8s",
          quality: chosen?.quality || "97",
          savings: selectedModel === "auto" ? "47%" : "0%",
        }
      });
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 animate-pulse">
            <Sparkles className="w-3 h-3 mr-1" />
            Live Demo
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            See <span className="bg-gradient-primary bg-clip-text text-transparent">Intelligent Routing</span> in Action
          </h2>
          <p className="text-muted-foreground text-lg">
            Type a prompt, pick a model or let Infere auto-route, and watch the magic happen
          </p>
        </div>

        <Card className="p-8 bg-gradient-card border-border/50 shadow-glow">
          {/* Input Section */}
          <div className="mb-6">
            <label className="text-sm font-medium text-foreground mb-2 block">Your Prompt</label>
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                placeholder="Ask anything..."
              />
              <Button 
                onClick={handleTest} 
                disabled={isProcessing}
                className="gap-2 shadow-glow hover:shadow-accent transition-all"
              >
                {isProcessing ? "Routing..." : "Test"} <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Model Selection */}
          <div className="mb-8">
            <label className="text-sm font-medium text-foreground mb-3 block">Choose Model</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {MODELS.map((model) => (
                <button
                  key={model.id}
                  onClick={() => setSelectedModel(model.id)}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                    selectedModel === model.id
                      ? "border-primary bg-primary/5 shadow-glow"
                      : "border-border/50 hover:border-primary/30 bg-background"
                  }`}
                >
                  <div className="text-2xl mb-2">{model.icon}</div>
                  <div className="text-sm font-semibold text-foreground">{model.name}</div>
                  <div className="text-xs text-muted-foreground">{model.provider}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Results */}
          {result && (
            <div className="space-y-4 animate-fade-in">
              <div className="p-6 rounded-xl bg-success/5 border border-success/20">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{result.model.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold text-foreground">{result.model.name}</h3>
                      <Badge className="bg-success/10 text-success border-success/20">Selected</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{result.reasoning}</p>
                    
                    {/* Metrics Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="p-3 rounded-lg bg-background/50">
                        <div className="flex items-center gap-2 mb-1">
                          <DollarSign className="w-4 h-4 text-primary" />
                          <span className="text-xs text-muted-foreground">Cost</span>
                        </div>
                        <div className="text-lg font-bold text-foreground">{result.metrics.cost}</div>
                      </div>
                      
                      <div className="p-3 rounded-lg bg-background/50">
                        <div className="flex items-center gap-2 mb-1">
                          <Clock className="w-4 h-4 text-secondary" />
                          <span className="text-xs text-muted-foreground">Latency</span>
                        </div>
                        <div className="text-lg font-bold text-foreground">{result.metrics.latency}</div>
                      </div>
                      
                      <div className="p-3 rounded-lg bg-background/50">
                        <div className="flex items-center gap-2 mb-1">
                          <TrendingUp className="w-4 h-4 text-accent" />
                          <span className="text-xs text-muted-foreground">Quality</span>
                        </div>
                        <div className="text-lg font-bold text-foreground">{result.metrics.quality}%</div>
                      </div>
                      
                      {result.metrics.savings !== "0%" && (
                        <div className="p-3 rounded-lg bg-success/10">
                          <div className="flex items-center gap-2 mb-1">
                            <Zap className="w-4 h-4 text-success" />
                            <span className="text-xs text-muted-foreground">Saved</span>
                          </div>
                          <div className="text-lg font-bold text-success">{result.metrics.savings}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </section>
  );
};
