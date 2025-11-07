import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Send, DollarSign, Clock, TrendingUp, Zap, Activity, CheckCircle2 } from "lucide-react";

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
    icon: "⚡",
    color: "from-purple-500 to-pink-500",
    cost: 0.15,
    latency: 2.3,
    quality: 95,
  },
  {
    id: "claude-sonnet",
    name: "Claude Sonnet 4.5",
    provider: "Anthropic",
    icon: "✨",
    color: "from-orange-500 to-red-500",
    cost: 0.08,
    latency: 1.8,
    quality: 97,
  },
  {
    id: "gemini-pro",
    name: "Gemini 2.5 Pro",
    provider: "Google",
    icon: "🎯",
    color: "from-blue-500 to-cyan-500",
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

  useEffect(() => {
    if (isProcessing) {
      const stages = [
        { stage: 0, delay: 0 },
        { stage: 1, delay: 300 },
        { stage: 2, delay: 600 },
        { stage: 3, delay: 900 },
      ];

      stages.forEach(({ stage, delay }) => {
        setTimeout(() => setRoutingStage(stage), delay);
      });

      setTimeout(() => {
        const chosen = selectedModel 
          ? MODELS.find(m => m.id === selectedModel) || MODELS[1]
          : MODELS[1];
        
        setResult({
          model: chosen,
          reasoning: selectedModel 
            ? "User selected model" 
            : "Optimal balance of cost ($0.08), speed (1.8s), and quality (97%) for this educational content",
          comparison: MODELS.map(m => ({
            ...m,
            score: m.id === chosen.id ? 100 : Math.floor(Math.random() * 40 + 50),
            selected: m.id === chosen.id,
          })),
          savings: selectedModel ? 0 : 47,
        });
        setIsProcessing(false);
        setShowComparison(true);
      }, 1200);
    }
  }, [isProcessing, selectedModel]);

  const handleTest = () => {
    setIsProcessing(true);
    setRoutingStage(0);
    setResult(null);
    setShowComparison(false);
  };

  const routingStages = [
    { icon: Activity, label: "Analyzing prompt", color: "text-primary" },
    { icon: DollarSign, label: "Calculating costs", color: "text-secondary" },
    { icon: Clock, label: "Measuring latency", color: "text-accent" },
    { icon: TrendingUp, label: "Evaluating quality", color: "text-success" },
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

            {/* Model Selection */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">Choose Model (or let Infere decide)</label>
                {selectedModel && (
                  <button 
                    onClick={() => setSelectedModel(null)}
                    className="text-xs text-primary hover:underline"
                  >
                    Use Auto-Routing
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setSelectedModel(null)}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    selectedModel === null
                      ? "border-primary bg-primary/5 shadow-glow scale-105"
                      : "border-border/50 hover:border-primary/30 bg-card"
                  }`}
                >
                  <div className="text-3xl mb-2">🎯</div>
                  <div className="text-sm font-semibold text-foreground">Auto</div>
                  <div className="text-xs text-muted-foreground">Best Pick</div>
                </button>
                
                {MODELS.map((model) => (
                  <button
                    key={model.id}
                    onClick={() => setSelectedModel(model.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      selectedModel === model.id
                        ? "border-primary bg-primary/5 shadow-glow scale-105"
                        : "border-border/50 hover:border-primary/30 bg-card"
                    }`}
                  >
                    <div className="text-3xl mb-2">{model.icon}</div>
                    <div className="text-sm font-semibold text-foreground">{model.name.split(' ')[0]}</div>
                    <div className="text-xs text-muted-foreground">{model.provider}</div>
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

            {/* Routing Process */}
            {isProcessing && (
              <Card className="p-6 bg-card border-border/50 animate-fade-in">
                <div className="space-y-4">
                  {routingStages.map((stage, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-3 transition-all duration-300 ${
                        routingStage >= i ? "opacity-100" : "opacity-30"
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${MODELS[i % MODELS.length].color} flex items-center justify-center ${
                        routingStage >= i ? "scale-100 shadow-glow" : "scale-90"
                      } transition-all`}>
                        <stage.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-foreground">{stage.label}</div>
                        {routingStage >= i && (
                          <div className="flex items-center gap-1 text-xs text-success mt-1">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Complete</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Results */}
            {result && showComparison && (
              <div className="space-y-4 animate-fade-in">
                {/* Winner Card */}
                <Card className="p-6 bg-gradient-to-br from-success/5 to-primary/5 border-success/20 shadow-glow">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${result.model.color} flex items-center justify-center text-3xl shadow-lg`}>
                      {result.model.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-2xl font-bold text-foreground">{result.model.name}</h3>
                        <Badge className="bg-success/10 text-success border-success/20">Selected</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{result.reasoning}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-3">
                    <div className="p-3 rounded-lg bg-background/80 backdrop-blur-sm">
                      <div className="flex items-center gap-1 mb-1">
                        <DollarSign className="w-3 h-3 text-primary" />
                        <span className="text-xs text-muted-foreground">Cost</span>
                      </div>
                      <div className="text-lg font-bold text-foreground">${result.model.cost}</div>
                    </div>
                    
                    <div className="p-3 rounded-lg bg-background/80 backdrop-blur-sm">
                      <div className="flex items-center gap-1 mb-1">
                        <Clock className="w-3 h-3 text-secondary" />
                        <span className="text-xs text-muted-foreground">Speed</span>
                      </div>
                      <div className="text-lg font-bold text-foreground">{result.model.latency}s</div>
                    </div>
                    
                    <div className="p-3 rounded-lg bg-background/80 backdrop-blur-sm">
                      <div className="flex items-center gap-1 mb-1">
                        <TrendingUp className="w-3 h-3 text-accent" />
                        <span className="text-xs text-muted-foreground">Quality</span>
                      </div>
                      <div className="text-lg font-bold text-foreground">{result.model.quality}%</div>
                    </div>
                    
                    {result.savings > 0 && (
                      <div className="p-3 rounded-lg bg-success/10">
                        <div className="flex items-center gap-1 mb-1">
                          <Zap className="w-3 h-3 text-success" />
                          <span className="text-xs text-muted-foreground">Saved</span>
                        </div>
                        <div className="text-lg font-bold text-success">{result.savings}%</div>
                      </div>
                    )}
                  </div>
                </Card>

                {/* Model Comparison */}
                <Card className="p-6 bg-card border-border/50">
                  <h4 className="text-sm font-semibold text-foreground mb-4">All Models Evaluated</h4>
                  <div className="space-y-3">
                    {result.comparison.map((model: any, i: number) => (
                      <div
                        key={i}
                        className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                          model.selected ? "bg-primary/5 border border-primary/20" : "bg-muted/50"
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${model.color} flex items-center justify-center text-xl`}>
                          {model.icon}
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-semibold text-foreground">{model.name}</div>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                            <span>${model.cost}</span>
                            <span>{model.latency}s</span>
                            <span>{model.quality}%</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-muted-foreground mb-1">Match Score</div>
                          <div className={`text-lg font-bold ${model.selected ? "text-success" : "text-foreground"}`}>
                            {model.score}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            )}

            {!isProcessing && !result && (
              <Card className="p-12 bg-card/50 border-border/30 text-center">
                <div className="text-6xl mb-4">🚀</div>
                <p className="text-muted-foreground">
                  Test a prompt to see Infere's intelligent routing in action
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
