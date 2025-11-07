import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Send, DollarSign, Clock, TrendingUp, Zap, ArrowRight, Sparkles, Brain, Target, Activity } from "lucide-react";

const EXAMPLE_PROMPTS = [
  "Explain quantum computing in simple terms",
  "Write a Python function to sort a list",
  "Generate a creative story about space exploration",
  "Analyze this sales data and provide insights",
];

const MODELS = [
  {
    id: "gpt-5",
    name: "GPT-5",
    provider: "OpenAI",
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    borderGlow: "shadow-[0_0_30px_rgba(16,185,129,0.3)]",
    cost: 0.15,
    latency: 2.3,
    quality: 95,
  },
  {
    id: "claude-sonnet",
    name: "Claude Sonnet 4.5",
    provider: "Anthropic",
    gradient: "from-orange-500 via-amber-500 to-yellow-500",
    borderGlow: "shadow-[0_0_30px_rgba(249,115,22,0.3)]",
    cost: 0.08,
    latency: 1.8,
    quality: 97,
  },
  {
    id: "gemini-pro",
    name: "Gemini 2.5 Pro",
    provider: "Google",
    gradient: "from-blue-500 via-indigo-500 to-purple-500",
    borderGlow: "shadow-[0_0_30px_rgba(59,130,246,0.3)]",
    cost: 0.12,
    latency: 2.1,
    quality: 93,
  },
];

export const LiveRoutingDemo = () => {
  const [input, setInput] = useState(EXAMPLE_PROMPTS[0]);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [routingStage, setRoutingStage] = useState(0);
  const [result, setResult] = useState<any>(null);
  const [showComparison, setShowComparison] = useState(false);
  const [racingScores, setRacingScores] = useState<Record<string, number>>({});

  useEffect(() => {
    if (isProcessing) {
      // Reset racing scores
      setRacingScores({});
      
      const stages = [
        { stage: 0, delay: 0 },
        { stage: 1, delay: 300 },
        { stage: 2, delay: 600 },
        { stage: 3, delay: 900 },
      ];

      stages.forEach(({ stage, delay }) => {
        setTimeout(() => setRoutingStage(stage), delay);
      });

      // Animate racing scores
      const chosen = selectedModel 
        ? MODELS.find(m => m.id === selectedModel) || MODELS[1]
        : MODELS[1];

      const finalScores = MODELS.reduce((acc, m) => ({
        ...acc,
        [m.id]: m.id === chosen.id ? 100 : Math.floor(Math.random() * 35 + 50)
      }), {});

      // Animate scores incrementally
      const duration = 1000;
      const steps = 20;
      const interval = duration / steps;
      let currentStep = 0;

      const scoreInterval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        setRacingScores(prev => {
          const newScores: Record<string, number> = {};
          Object.keys(finalScores).forEach(id => {
            newScores[id] = Math.floor(finalScores[id] * progress);
          });
          return newScores;
        });

        if (currentStep >= steps) {
          clearInterval(scoreInterval);
          setTimeout(() => {
            setResult({
              model: chosen,
              reasoning: selectedModel 
                ? "User selected model" 
                : "Optimal balance of cost ($0.08), speed (1.8s), and quality (97%) for this educational content",
              comparison: MODELS.map(m => ({
                ...m,
                score: finalScores[m.id],
                selected: m.id === chosen.id,
              })),
              savings: selectedModel ? 0 : 47,
            });
            setIsProcessing(false);
            setShowComparison(true);
          }, 200);
        }
      }, interval);
    }
  }, [isProcessing, selectedModel]);

  const handleTest = () => {
    setIsProcessing(true);
    setRoutingStage(0);
    setResult(null);
    setShowComparison(false);
  };

  const routingStages = [
    { icon: Brain, label: "Analyzing prompt complexity", color: "from-purple-500 to-pink-500" },
    { icon: DollarSign, label: "Optimizing cost efficiency", color: "from-emerald-500 to-teal-500" },
    { icon: Clock, label: "Calculating response time", color: "from-orange-500 to-amber-500" },
    { icon: Target, label: "Matching best model", color: "from-blue-500 to-indigo-500" },
  ];

  return (
    <section className="py-16 relative">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Interactive Input */}
          <div className="space-y-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                See <span className="bg-gradient-accent bg-clip-text text-transparent">Intelligent Routing</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Watch Infere analyze your prompt and select the perfect model in real-time
              </p>
            </div>

            {/* Example Prompts */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Try an example:</label>
              <div className="flex flex-wrap gap-2">
                {EXAMPLE_PROMPTS.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => setInput(prompt)}
                    className="px-3 py-1.5 text-xs rounded-full bg-muted hover:bg-primary/10 hover:text-primary transition-all border border-border/50"
                  >
                    {prompt.slice(0, 30)}...
                  </button>
                ))}
              </div>
            </div>

            {/* Prompt Input */}
            <Card className="p-6 bg-gradient-card border-border/50 shadow-lg">
              <label className="text-sm font-medium text-foreground mb-3 block">Your Prompt</label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                placeholder="Type anything..."
              />
              
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Zap className="w-3 h-3" />
                  {input.split(' ').length} words · ~{Math.ceil(input.split(' ').length * 1.3)} tokens
                </div>
                <Button 
                  onClick={handleTest}
                  disabled={isProcessing}
                  className="gap-2 shadow-glow hover:shadow-accent transition-all hover:scale-105"
                >
                  {isProcessing ? "Routing..." : "Test Routing"} <Send className="w-4 h-4" />
                </Button>
              </div>
            </Card>

            {/* Model Selection - Sophisticated Cards */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">Select Intelligence</label>
                {selectedModel && (
                  <button 
                    onClick={() => setSelectedModel(null)}
                    className="text-xs text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3" />
                    Let AI Decide
                  </button>
                )}
              </div>
              
              <div className="space-y-3">
                {/* Auto Route Option */}
                <button
                  onClick={() => setSelectedModel(null)}
                  className={`w-full p-5 rounded-2xl border-2 transition-all duration-500 group relative overflow-hidden ${
                    selectedModel === null
                      ? "border-primary bg-gradient-to-br from-primary/10 via-primary/5 to-transparent shadow-glow scale-[1.02]"
                      : "border-border/50 hover:border-primary/30 bg-card/50 hover:bg-card"
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  <div className="relative flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-lg">
                      <Sparkles className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="text-base font-bold text-foreground mb-1">Auto-Route</div>
                      <div className="text-xs text-muted-foreground">AI selects optimal model based on your prompt</div>
                    </div>
                    {selectedModel === null && (
                      <Badge className="bg-success/10 text-success border-success/20">Active</Badge>
                    )}
                  </div>
                </button>
                
                {/* Model Cards */}
                {MODELS.map((model) => (
                  <button
                    key={model.id}
                    onClick={() => setSelectedModel(model.id)}
                    className={`w-full p-5 rounded-2xl border-2 transition-all duration-500 group relative overflow-hidden ${
                      selectedModel === model.id
                        ? `border-transparent ${model.borderGlow} scale-[1.02]`
                        : "border-border/50 hover:border-border bg-card/50 hover:bg-card"
                    }`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${model.gradient} opacity-0 ${
                      selectedModel === model.id ? "opacity-10" : "group-hover:opacity-5"
                    } transition-opacity duration-500`} />
                    <div className="relative flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${model.gradient} flex items-center justify-center shadow-lg`}>
                        <div className="text-2xl font-bold text-white">{model.provider[0]}</div>
                      </div>
                      <div className="flex-1 text-left">
                        <div className="text-base font-bold text-foreground mb-1">{model.name}</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <DollarSign className="w-3 h-3" />${model.cost}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />{model.latency}s
                          </span>
                          <span className="flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />{model.quality}%
                          </span>
                        </div>
                      </div>
                      {selectedModel === model.id && (
                        <Badge className="bg-success/10 text-success border-success/20">Selected</Badge>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Live Results & Observability */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Live Observability</h3>
              <p className="text-sm text-muted-foreground">Real-time routing decisions and performance metrics</p>
            </div>

            {/* Routing Process - Flowing Pipeline */}
            {isProcessing && (
              <div className="space-y-6 animate-fade-in">
                <Card className="p-6 bg-gradient-to-br from-card via-card/95 to-primary/5 border-border/50 backdrop-blur-xl">
                  <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-primary animate-pulse" />
                    Routing Pipeline
                  </h4>
                  <div className="space-y-3">
                    {routingStages.map((stage, i) => (
                      <div key={i} className="relative">
                        <div
                          className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-500 ${
                            routingStage >= i 
                              ? "bg-gradient-to-r from-background/80 to-background/40 border-l-4 border-primary" 
                              : "opacity-30"
                          }`}
                        >
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stage.color} flex items-center justify-center shadow-lg ${
                            routingStage >= i ? "scale-100 animate-pulse" : "scale-90"
                          } transition-all duration-500`}>
                            <stage.icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-bold text-foreground">{stage.label}</div>
                            {routingStage >= i && (
                              <div className="text-xs text-success mt-1 flex items-center gap-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                                Processing complete
                              </div>
                            )}
                          </div>
                          {routingStage >= i && (
                            <ArrowRight className="w-5 h-5 text-primary animate-pulse" />
                          )}
                        </div>
                        {i < routingStages.length - 1 && routingStage >= i && (
                          <div className="ml-6 h-4 w-0.5 bg-gradient-to-b from-primary to-transparent animate-fade-in" />
                        )}
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Live Racing Scores */}
                <Card className="p-6 bg-gradient-to-br from-card to-card/50 border-border/50 backdrop-blur-xl">
                  <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-accent animate-pulse" />
                    Live Model Evaluation
                  </h4>
                  <div className="space-y-4">
                    {MODELS.map((model) => (
                      <div key={model.id} className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <div className={`w-6 h-6 rounded-lg bg-gradient-to-br ${model.gradient} flex items-center justify-center`}>
                              <span className="text-white text-xs font-bold">{model.provider[0]}</span>
                            </div>
                            <span className="font-medium text-foreground">{model.name}</span>
                          </div>
                          <span className="font-bold text-foreground">{racingScores[model.id] || 0}%</span>
                        </div>
                        <div className="h-3 bg-muted/30 rounded-full overflow-hidden backdrop-blur-sm">
                          <div
                            className={`h-full bg-gradient-to-r ${model.gradient} transition-all duration-300 ease-out rounded-full relative overflow-hidden`}
                            style={{ width: `${racingScores[model.id] || 0}%` }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            )}

            {/* Results */}
            {result && showComparison && (
              <div className="space-y-4 animate-fade-in">
                {/* Winner Card */}
                <Card className="p-8 bg-gradient-to-br from-card via-primary/5 to-card border-2 border-primary/30 shadow-[0_0_50px_rgba(var(--primary),0.2)] relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 animate-shimmer" />
                  <div className="relative">
                    <div className="flex items-start gap-6 mb-6">
                      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${result.model.gradient} flex items-center justify-center shadow-2xl ${result.model.borderGlow}`}>
                        <div className="text-4xl font-bold text-white">{result.model.provider[0]}</div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-3xl font-bold text-foreground">{result.model.name}</h3>
                          <Badge className="bg-success text-white border-0 text-sm px-3 py-1">Winner</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">{result.reasoning}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                      <div className="p-4 rounded-xl bg-gradient-to-br from-background/90 to-background/60 backdrop-blur-sm border border-border/50">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center">
                            <DollarSign className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-xs text-muted-foreground font-medium">Cost</span>
                        </div>
                        <div className="text-2xl font-bold text-foreground">${result.model.cost}</div>
                      </div>
                      
                      <div className="p-4 rounded-xl bg-gradient-to-br from-background/90 to-background/60 backdrop-blur-sm border border-border/50">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-secondary to-secondary/50 flex items-center justify-center">
                            <Clock className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-xs text-muted-foreground font-medium">Latency</span>
                        </div>
                        <div className="text-2xl font-bold text-foreground">{result.model.latency}s</div>
                      </div>
                      
                      <div className="p-4 rounded-xl bg-gradient-to-br from-background/90 to-background/60 backdrop-blur-sm border border-border/50">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-accent/50 flex items-center justify-center">
                            <TrendingUp className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-xs text-muted-foreground font-medium">Quality</span>
                        </div>
                        <div className="text-2xl font-bold text-foreground">{result.model.quality}%</div>
                      </div>
                      
                      {result.savings > 0 && (
                        <div className="p-4 rounded-xl bg-gradient-to-br from-success/20 to-success/5 border border-success/30">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-success to-success/70 flex items-center justify-center">
                              <Zap className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-xs text-success font-medium">Saved</span>
                          </div>
                          <div className="text-2xl font-bold text-success">{result.savings}%</div>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>

                {/* Model Comparison */}
                <Card className="p-6 bg-card border-border/50 backdrop-blur-sm">
                  <h4 className="text-lg font-bold text-foreground mb-5">Complete Evaluation</h4>
                  <div className="space-y-3">
                    {result.comparison.map((model: any, i: number) => (
                      <div
                        key={i}
                        className={`relative p-5 rounded-xl transition-all duration-500 overflow-hidden ${
                          model.selected 
                            ? `bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-2 border-primary/30 ${model.borderGlow}` 
                            : "bg-muted/30 border border-border/50 hover:border-border"
                        }`}
                      >
                        <div className="relative flex items-center gap-4">
                          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${model.gradient} flex items-center justify-center shadow-lg`}>
                            <div className="text-2xl font-bold text-white">{model.provider[0]}</div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="text-base font-bold text-foreground">{model.name}</div>
                              {model.selected && (
                                <Badge className="bg-success text-white border-0 text-xs">Selected</Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-xs">
                              <span className="flex items-center gap-1 text-muted-foreground">
                                <DollarSign className="w-3 h-3" />${model.cost}
                              </span>
                              <span className="flex items-center gap-1 text-muted-foreground">
                                <Clock className="w-3 h-3" />{model.latency}s
                              </span>
                              <span className="flex items-center gap-1 text-muted-foreground">
                                <TrendingUp className="w-3 h-3" />{model.quality}%
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-muted-foreground mb-1">Match</div>
                            <div className={`text-3xl font-bold ${model.selected ? "text-success" : "text-foreground/60"}`}>
                              {model.score}<span className="text-lg">%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            )}

            {!isProcessing && !result && (
              <Card className="p-16 bg-gradient-to-br from-card/50 via-primary/5 to-card/30 border-border/30 text-center backdrop-blur-sm relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent animate-shimmer" />
                <div className="relative">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-2xl">
                    <Sparkles className="w-12 h-12 text-white animate-pulse" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">Ready to Route</h3>
                  <p className="text-muted-foreground max-w-sm mx-auto">
                    Enter a prompt and watch our AI intelligently select the perfect model in real-time
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
