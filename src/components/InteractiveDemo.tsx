import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Zap, DollarSign, Clock, TrendingUp, Send } from "lucide-react";

const MODELS = [
  { 
    id: "gpt4", 
    name: "GPT-4", 
    provider: "OpenAI",
    response: "I'd be happy to help! Here's a comprehensive guide to getting started with machine learning...",
    cost: "$0.003",
    latency: "1.2s",
    quality: 95,
    color: "from-primary to-secondary"
  },
  { 
    id: "claude", 
    name: "Claude 3.5", 
    provider: "Anthropic",
    response: "Great question! Machine learning is fascinating. Let me break this down into digestible steps...",
    cost: "$0.002",
    latency: "0.8s",
    quality: 98,
    color: "from-secondary to-accent"
  },
  { 
    id: "gemini", 
    name: "Gemini Pro", 
    provider: "Google",
    response: "Machine learning fundamentals start with understanding data patterns. Here's what you need to know...",
    cost: "$0.001",
    latency: "0.9s",
    quality: 92,
    color: "from-accent to-primary"
  }
];

export const InteractiveDemo = () => {
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [showResults, setShowResults] = useState(false);

  const handleSend = () => {
    if (inputValue.trim()) {
      setShowResults(true);
      // Auto-select best model after a brief delay
      setTimeout(() => setSelectedModel("claude"), 800);
    }
  };

  const handleModelSelect = (modelId: string) => {
    setSelectedModel(modelId);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Input area */}
      <Card className="p-6 bg-card border-2 border-border hover:border-primary/50 transition-all shadow-lg">
        <div className="flex gap-3">
          <Input 
            placeholder="Ask anything... (Try: 'Explain machine learning')"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="text-lg border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <Button 
            onClick={handleSend}
            size="lg"
            className="bg-gradient-card hover:opacity-90 text-white shadow-glow transition-all hover:scale-105"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </Card>

      {/* Model comparison */}
      {showResults && (
        <div className="grid md:grid-cols-3 gap-4 animate-fade-in">
          {MODELS.map((model) => {
            const isSelected = selectedModel === model.id;
            const isBest = model.id === "claude";
            
            return (
              <Card
                key={model.id}
                onClick={() => handleModelSelect(model.id)}
                className={`relative p-6 cursor-pointer transition-all duration-300 hover:scale-105 ${
                  isSelected 
                    ? 'border-2 border-primary shadow-glow' 
                    : 'border border-border hover:border-primary/30'
                }`}
              >
                {isBest && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-card text-white border-0">
                    <Zap className="w-3 h-3 mr-1" /> Best Choice
                  </Badge>
                )}

                <div className="mb-4">
                  <div className={`text-2xl font-bold bg-gradient-to-r ${model.color} bg-clip-text text-transparent mb-1`}>
                    {model.name}
                  </div>
                  <div className="text-xs text-muted-foreground">{model.provider}</div>
                </div>

                <div className="space-y-3 mb-4">
                  <p className="text-sm text-foreground/80 line-clamp-3">
                    {model.response}
                  </p>
                </div>

                <div className="space-y-2 pt-4 border-t border-border">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <DollarSign className="w-3.5 h-3.5 text-success" />
                      Cost
                    </span>
                    <span className="font-mono font-semibold text-success">{model.cost}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <Clock className="w-3.5 h-3.5 text-secondary" />
                      Speed
                    </span>
                    <span className="font-mono font-semibold text-secondary">{model.latency}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <TrendingUp className="w-3.5 h-3.5 text-primary" />
                      Quality
                    </span>
                    <span className="font-mono font-semibold text-primary">{model.quality}%</span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {showResults && selectedModel && (
        <Card className="p-6 bg-gradient-hero border border-primary/20 animate-slide-up">
          <div className="text-center space-y-2">
            <div className="text-sm text-muted-foreground">Infere Auto-Routing</div>
            <div className="text-2xl font-bold bg-gradient-card bg-clip-text text-transparent">
              Selected {MODELS.find(m => m.id === selectedModel)?.name} for best balance
            </div>
            <div className="flex gap-6 justify-center text-sm pt-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span className="text-muted-foreground">98% Quality Score</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                <span className="text-muted-foreground">0.8s Response</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-muted-foreground">54% Cost Savings</span>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
