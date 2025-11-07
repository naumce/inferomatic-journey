import { useState, useEffect } from "react";
import { Send, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const MODELS = [
  {
    id: "gemini-pro",
    name: "Gemini 2.5 Pro",
    provider: "google",
    icon: "✦",
    tokens: "197.3B",
    latency: 2.5,
    cost: 0.12,
    growth: "-12.18%",
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: "gpt-5",
    name: "GPT-5",
    provider: "openai",
    icon: "⚡",
    tokens: "59.6B",
    latency: 8.3,
    cost: 0.15,
    growth: "-13.1%",
    color: "from-purple-500 to-pink-500"
  },
  {
    id: "claude-4.5",
    name: "Claude Sonnet 4.5",
    provider: "anthropic",
    icon: "◆",
    tokens: "634.2B",
    latency: 1.9,
    cost: 0.08,
    growth: "-10.99%",
    color: "from-orange-500 to-red-500"
  }
];

export const LiveRoutingDemo = () => {
  const [input, setInput] = useState("");
  const [hoveredModel, setHoveredModel] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [showObservability, setShowObservability] = useState(false);
  const [routingStage, setRoutingStage] = useState(0);
  const [modelScores, setModelScores] = useState<Record<string, number>>({});
  const [chosenModel, setChosenModel] = useState<typeof MODELS[0] | null>(null);

  useEffect(() => {
    if (showObservability) {
      // Reset
      setRoutingStage(0);
      setModelScores({});
      setChosenModel(null);

      // Stage 1: Analyzing
      setTimeout(() => setRoutingStage(1), 300);
      
      // Stage 2: Evaluating models
      setTimeout(() => {
        setRoutingStage(2);
        // Animate scores
        const winner = selectedModel 
          ? MODELS.find(m => m.id === selectedModel) || MODELS[2]
          : MODELS[2]; // Claude is best
        
        let progress = 0;
        const interval = setInterval(() => {
          progress += 5;
          if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setRoutingStage(3);
              setChosenModel(winner);
            }, 200);
          }
          
          setModelScores({
            [MODELS[0].id]: Math.min(progress * 0.75, 75),
            [MODELS[1].id]: Math.min(progress * 0.65, 65),
            [MODELS[2].id]: Math.min(progress, winner.id === MODELS[2].id ? 100 : 85),
          });
        }, 20);
      }, 800);
    }
  }, [showObservability, selectedModel]);

  const handleSend = () => {
    if (!input.trim()) return;
    setShowObservability(true);
  };

  return (
    <section className="py-32 px-4 relative overflow-hidden">
      {/* Gradient mesh background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      
      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Intelligent Routing
          </h2>
          <p className="text-xl text-muted-foreground">
            Better <span className="text-primary">prices</span>, better <span className="text-primary">uptime</span>, no subscription.
          </p>
        </div>

        {/* Central Input */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center gap-4">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Start a message..."
                className="flex-1 h-14 text-lg bg-background/50 border-border/50 focus:border-primary transition-colors"
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <Button
                onClick={handleSend}
                size="lg"
                className="h-14 px-8 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>

            {/* Example prompts */}
            <div className="flex flex-wrap gap-2 mt-4">
              {["Analyze this code", "Write a story", "Explain quantum physics"].map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => setInput(prompt)}
                  className="text-xs px-3 py-2 bg-secondary/50 hover:bg-secondary text-secondary-foreground rounded-full transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Model Cards - Clean Horizontal Layout */}
        <div className="grid grid-cols-3 gap-6 max-w-5xl mx-auto">
          {MODELS.map((model) => (
            <div
              key={model.id}
              className={`
                relative bg-card/80 backdrop-blur-xl border-2 rounded-2xl p-6 cursor-pointer
                transition-all duration-300 hover:shadow-2xl hover:-translate-y-1
                ${hoveredModel === model.id ? 'border-primary shadow-lg shadow-primary/20' : 'border-border/50'}
                ${selectedModel === model.id ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''}
              `}
              onClick={() => setSelectedModel(selectedModel === model.id ? null : model.id)}
              onMouseEnter={() => setHoveredModel(model.id)}
              onMouseLeave={() => setHoveredModel(null)}
            >
              {/* Gradient glow effect */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${model.color} opacity-0 hover:opacity-5 transition-opacity`} />
              
              <div className="relative">
                {/* Icon and Selection indicator */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`text-4xl bg-gradient-to-br ${model.color} bg-clip-text text-transparent`}>
                    {model.icon}
                  </div>
                  {selectedModel === model.id && (
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  )}
                </div>

                {/* Model Name */}
                <h3 className="text-lg font-bold mb-1">{model.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">by {model.provider}</p>

                {/* Stats */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tokens/wk</span>
                    <span className="font-mono text-primary">{model.tokens}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Latency</span>
                    <span className="font-mono">{model.latency}s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Weekly growth</span>
                    <span className={`font-mono ${model.growth.startsWith('-') ? 'text-red-500' : 'text-green-500'}`}>
                      {model.growth}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View Trending Link */}
        <div className="text-center mt-12">
          <a href="#" className="text-sm text-primary hover:underline inline-flex items-center gap-2">
            View Trending
            <span className="text-xs">↗</span>
          </a>
        </div>
      </div>

      {/* Observability Side Panel */}
      {showObservability && (
        <div className="fixed right-6 top-24 z-50 animate-slide-in-right max-h-[calc(100vh-120px)] overflow-y-auto">
          <div className="w-96 bg-card/95 backdrop-blur-xl border border-border/50 rounded-lg shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="px-4 py-3 border-b border-border/50 flex items-center justify-between sticky top-0 bg-card/95 backdrop-blur-xl z-10">
              <div className="text-sm font-semibold">Intelligent Routing</div>
              <button 
                onClick={() => setShowObservability(false)}
                className="w-6 h-6 rounded hover:bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              >
                ×
              </button>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4">
              {/* Stage 1 */}
              <div className={`flex items-center gap-2 text-sm transition-opacity ${routingStage >= 1 ? 'opacity-100' : 'opacity-30'}`}>
                <div className={routingStage >= 1 ? 'text-success' : 'text-muted-foreground'}>
                  {routingStage >= 1 ? '✓' : '○'}
                </div>
                <span>Analyzing prompt complexity</span>
              </div>

              {/* Stage 2 - Models */}
              {routingStage >= 2 && (
                <div className="space-y-2 animate-fade-in">
                  <div className="text-xs text-muted-foreground mb-2">Evaluating models</div>
                  {MODELS.map((model) => (
                    <div key={model.id} className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{model.icon}</span>
                        <span className="text-xs flex-1">{model.name}</span>
                        <span className="text-xs text-muted-foreground tabular-nums">
                          {Math.round(modelScores[model.id] || 0)}%
                        </span>
                      </div>
                      <div className="flex-1 h-1 bg-muted/30 rounded-full overflow-hidden ml-6">
                        <div
                          className={`h-full bg-gradient-to-r ${model.color} transition-all duration-300`}
                          style={{ width: `${modelScores[model.id] || 0}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Winner Section */}
              {routingStage >= 3 && chosenModel && (
                <div className="space-y-4 animate-fade-in">
                  {/* Selected Model */}
                  <div className="pt-3 border-t border-border/50">
                    <div className="text-xs text-muted-foreground mb-2">Selected Model</div>
                    <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg border border-primary/20">
                      <span className="text-2xl">{chosenModel.icon}</span>
                      <div className="flex-1">
                        <div className="text-sm font-semibold">{chosenModel.name}</div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                          <span>${chosenModel.cost}</span>
                          <span>·</span>
                          <span>{chosenModel.latency}s</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Cost Savings */}
                  <div className="p-3 bg-success/5 rounded-lg border border-success/20">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded bg-success/10 flex items-center justify-center">
                        <span className="text-success text-xs">$</span>
                      </div>
                      <div className="text-xs font-semibold">Cost Savings</div>
                    </div>
                    <div className="space-y-1.5">
                      {MODELS.filter(m => m.id !== chosenModel.id).map(model => {
                        const savings = ((model.cost - chosenModel.cost) / model.cost * 100).toFixed(0);
                        return (
                          <div key={model.id} className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">vs {model.name}</span>
                            <span className="font-mono text-success">-{savings}% (${(model.cost - chosenModel.cost).toFixed(2)})</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Latency Optimization */}
                  <div className="p-3 bg-blue-500/5 rounded-lg border border-blue-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded bg-blue-500/10 flex items-center justify-center">
                        <span className="text-blue-500 text-xs">⚡</span>
                      </div>
                      <div className="text-xs font-semibold">Latency Advantage</div>
                    </div>
                    <div className="space-y-1.5">
                      {MODELS.filter(m => m.id !== chosenModel.id && m.latency > chosenModel.latency).map(model => {
                        const improvement = ((model.latency - chosenModel.latency) / model.latency * 100).toFixed(0);
                        return (
                          <div key={model.id} className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">vs {model.name}</span>
                            <span className="font-mono text-blue-500">{improvement}% faster ({(model.latency - chosenModel.latency).toFixed(1)}s saved)</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Improvement Suggestion */}
                  <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-primary" />
                      <div className="text-xs font-semibold">Want Better Results?</div>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                      Optimize your prompts to get even better routing decisions and cost savings with our advanced prompt management system.
                    </p>
                    <button className="w-full py-2 px-3 bg-primary text-primary-foreground rounded text-xs font-medium hover:bg-primary/90 transition-colors">
                      Explore Prompt Management
                    </button>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <div className="p-2 bg-muted/30 rounded text-center">
                      <div className="text-lg font-bold text-success">{((MODELS.reduce((sum, m) => sum + m.cost, 0) / MODELS.length - chosenModel.cost) / (MODELS.reduce((sum, m) => sum + m.cost, 0) / MODELS.length) * 100).toFixed(0)}%</div>
                      <div className="text-xs text-muted-foreground">Avg. Savings</div>
                    </div>
                    <div className="p-2 bg-muted/30 rounded text-center">
                      <div className="text-lg font-bold text-blue-500">{chosenModel.latency}s</div>
                      <div className="text-xs text-muted-foreground">Response Time</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
