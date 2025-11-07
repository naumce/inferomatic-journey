import { useState, useEffect } from "react";
import { Send, Sparkles, Zap, TrendingUp, DollarSign, Clock, CheckCircle2, Activity } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Dialog, DialogContent } from "./ui/dialog";

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

      {/* Observability Modal */}
      <Dialog open={showObservability} onOpenChange={setShowObservability}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden border-2 border-primary/20">
          <div className="bg-gradient-to-br from-card via-card to-primary/5 p-8">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Live Observability</h3>
                <p className="text-sm text-muted-foreground">Watch intelligent routing in action</p>
              </div>
            </div>

            {/* Routing Stages */}
            <div className="space-y-6 mb-8">
              {/* Stage 1: Analyzing */}
              <div className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-500 ${
                routingStage >= 1 ? 'border-primary/30 bg-primary/5' : 'border-border/50 opacity-40'
              }`}>
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center ${
                  routingStage >= 1 ? 'animate-pulse' : ''
                }`}>
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold">Analyzing Prompt</div>
                  <div className="text-xs text-muted-foreground">Processing complexity, context, and requirements</div>
                </div>
                {routingStage >= 1 && <CheckCircle2 className="w-5 h-5 text-success" />}
              </div>

              {/* Stage 2: Evaluating Models */}
              <div className={`p-4 rounded-xl border-2 transition-all duration-500 ${
                routingStage >= 2 ? 'border-primary/30 bg-primary/5' : 'border-border/50 opacity-40'
              }`}>
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center ${
                    routingStage >= 2 ? 'animate-pulse' : ''
                  }`}>
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">Evaluating Models</div>
                    <div className="text-xs text-muted-foreground">Scoring based on cost, latency, and quality</div>
                  </div>
                  {routingStage >= 3 && <CheckCircle2 className="w-5 h-5 text-success" />}
                </div>

                {/* Model Scores */}
                {routingStage >= 2 && (
                  <div className="space-y-3 ml-14">
                    {MODELS.map((model) => (
                      <div key={model.id} className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <span className={`text-lg bg-gradient-to-br ${model.color} bg-clip-text text-transparent`}>
                              {model.icon}
                            </span>
                            <span className="font-medium">{model.name}</span>
                          </div>
                          <span className="font-bold tabular-nums">{Math.round(modelScores[model.id] || 0)}%</span>
                        </div>
                        <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
                          <div
                            className={`h-full bg-gradient-to-r ${model.color} transition-all duration-300 ease-out rounded-full`}
                            style={{ width: `${modelScores[model.id] || 0}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Stage 3: Winner */}
              {routingStage >= 3 && chosenModel && (
                <div className="p-6 rounded-xl border-2 border-primary bg-gradient-to-br from-primary/10 to-primary/5 animate-fade-in">
                  <div className="flex items-center gap-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${chosenModel.color} flex items-center justify-center shadow-lg`}>
                      <span className="text-3xl">{chosenModel.icon}</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-muted-foreground mb-1">Selected Model</div>
                      <div className="text-2xl font-bold mb-2">{chosenModel.name}</div>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4 text-success" />
                          <span className="font-mono">${chosenModel.cost}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-blue-500" />
                          <span className="font-mono">{chosenModel.latency}s</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-4 h-4 text-primary" />
                          <span className="font-semibold">Best Match</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Close button */}
            {routingStage >= 3 && (
              <Button 
                onClick={() => setShowObservability(false)} 
                className="w-full h-12 bg-gradient-to-r from-primary to-primary/80"
              >
                Continue
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};
