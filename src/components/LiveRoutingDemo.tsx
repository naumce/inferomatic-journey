import { useState, useEffect } from "react";
import { Send, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const MODELS = [
  {
    id: "gemini-pro",
    name: "Gemini 2.5 Pro",
    provider: "Google",
    logo: (
      <svg viewBox="0 0 24 24" className="w-full h-full">
        <path fill="currentColor" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    ),
    tokens: "197.3B",
    latency: 2.5,
    cost: 0.12,
    growth: "-12.18%",
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: "gpt-5",
    name: "GPT-5",
    provider: "OpenAI",
    logo: (
      <svg viewBox="0 0 24 24" className="w-full h-full">
        <path fill="currentColor" d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/>
      </svg>
    ),
    tokens: "59.6B",
    latency: 8.3,
    cost: 0.15,
    growth: "-13.1%",
    color: "from-purple-500 to-pink-500"
  },
  {
    id: "claude-4.5",
    name: "Claude Sonnet 4.5",
    provider: "Anthropic",
    logo: (
      <svg viewBox="0 0 24 24" className="w-full h-full">
        <rect x="4" y="4" width="7" height="7" rx="1" fill="currentColor"/>
        <rect x="13" y="4" width="7" height="7" rx="1" fill="currentColor"/>
        <rect x="4" y="13" width="7" height="7" rx="1" fill="currentColor"/>
        <rect x="13" y="13" width="7" height="7" rx="1" fill="currentColor"/>
      </svg>
    ),
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
  const [showObservability, setShowObservability] = useState(false);
  const [routingStage, setRoutingStage] = useState(0);
  const [modelScores, setModelScores] = useState<Record<string, number>>({});
  const [chosenModel, setChosenModel] = useState<typeof MODELS[0] | null>(null);
  const [isRacing, setIsRacing] = useState(false);
  const [sendingAnimation, setSendingAnimation] = useState(false);

  useEffect(() => {
    if (isRacing) {
      // Reset
      setRoutingStage(0);
      setModelScores({});
      setChosenModel(null);

      // Stage 1: Analyzing
      setTimeout(() => setRoutingStage(1), 300);
      
      // Stage 2: Evaluating models with racing animation
      setTimeout(() => {
        setRoutingStage(2);
        const winner = MODELS[2]; // Claude is best
        
        let progress = 0;
        const interval = setInterval(() => {
          progress += 5;
          if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setRoutingStage(3);
              setChosenModel(winner);
              setIsRacing(false);
              setShowObservability(true);
            }, 200);
          }
          
          // Random variations for racing effect
          setModelScores({
            [MODELS[0].id]: Math.min(progress * 0.75 + Math.random() * 10, 75),
            [MODELS[1].id]: Math.min(progress * 0.65 + Math.random() * 10, 65),
            [MODELS[2].id]: Math.min(progress + Math.random() * 5, 100),
          });
        }, 20);
      }, 800);
    }
  }, [isRacing]);

  const handleSend = () => {
    if (!input.trim()) return;
    setSendingAnimation(true);
    setIsRacing(true);
    
    // Reset animation after delay
    setTimeout(() => {
      setSendingAnimation(false);
    }, 600);
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
          <div className={`bg-card/50 backdrop-blur-xl border border-border/50 rounded-xl p-3 shadow-2xl transition-all duration-500 ${
            sendingAnimation ? 'scale-[0.98] shadow-[0_0_50px_rgba(var(--primary),0.3)]' : ''
          }`}>
            <div className="flex items-center gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Start a message..."
                className={`flex-1 h-11 text-base bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 transition-all duration-300 ${
                  sendingAnimation ? 'blur-sm' : ''
                }`}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                disabled={isRacing}
              />
              <Button
                onClick={handleSend}
                disabled={isRacing || !input.trim()}
                className={`h-11 w-11 p-0 bg-primary hover:bg-primary/90 relative overflow-hidden group transition-all duration-300 rounded-lg ${
                  sendingAnimation ? 'scale-110 shadow-[0_0_30px_rgba(var(--primary),0.8)]' : ''
                } ${!input.trim() ? 'opacity-50' : 'shadow-lg shadow-primary/25'}`}
              >
                {isRacing ? (
                  <div className="flex items-center gap-0.5">
                    <div className="w-1 h-1 rounded-full bg-white animate-pulse" />
                    <div className="w-1 h-1 rounded-full bg-white animate-pulse" style={{ animationDelay: '0.15s' }} />
                    <div className="w-1 h-1 rounded-full bg-white animate-pulse" style={{ animationDelay: '0.3s' }} />
                  </div>
                ) : (
                  <>
                    <Send className="w-4 h-4 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent -translate-x-full -translate-y-full group-hover:translate-x-full group-hover:translate-y-full transition-transform duration-700" />
                  </>
                )}
              </Button>
            </div>

            {/* Example prompts */}
            <div className="flex flex-wrap gap-2 mt-2">
              {["Analyze this code", "Write a story", "Explain quantum physics"].map((prompt, idx) => (
                <button
                  key={prompt}
                  onClick={() => setInput(prompt)}
                  disabled={isRacing}
                  className="group relative text-xs px-3 py-1.5 bg-secondary/40 hover:bg-secondary/60 text-secondary-foreground rounded-md transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <span className="relative z-10">{prompt}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Model Cards with Matrix Animation */}
        <div className="relative max-w-5xl mx-auto">
          {/* Matrix connecting lines during racing */}
          {isRacing && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" style={{ filter: 'blur(0.5px)' }}>
              <defs>
                <linearGradient id="matrixGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="hsl(var(--success))" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              {MODELS.map((_, fromIdx) => 
                MODELS.map((__, toIdx) => {
                  if (fromIdx === toIdx) return null;
                  const delay = (fromIdx + toIdx) * 0.1;
                  return (
                    <line
                      key={`${fromIdx}-${toIdx}`}
                      x1={`${(fromIdx * 33.33) + 16.66}%`}
                      y1="50%"
                      x2={`${(toIdx * 33.33) + 16.66}%`}
                      y2="50%"
                      stroke="url(#matrixGrad)"
                      strokeWidth="1"
                      className="animate-pulse"
                      style={{ 
                        animationDelay: `${delay}s`,
                        opacity: 0.3
                      }}
                    />
                  );
                })
              )}
            </svg>
          )}

          <div className="grid grid-cols-3 gap-6 relative z-20">
            {MODELS.map((model, idx) => {
              const score = modelScores[model.id] || 0;
              const isLeading = isRacing && score === Math.max(...Object.values(modelScores));
              
              return (
                <div
                  key={model.id}
                  className={`
                    group relative bg-card/80 backdrop-blur-xl border-2 rounded-2xl p-6
                    transition-all duration-500
                    ${isLeading ? 'border-primary shadow-2xl shadow-primary/40 scale-105 -translate-y-2' : 'border-border/50'}
                    ${hoveredModel === model.id && !isRacing ? 'border-primary/50 shadow-xl hover:-translate-y-1' : ''}
                  `}
                  onMouseEnter={() => !isRacing && setHoveredModel(model.id)}
                  onMouseLeave={() => setHoveredModel(null)}
                >
                  {/* Gradient glow effect */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${model.color} transition-all duration-500 ${
                    isLeading ? 'opacity-20 blur-xl' : hoveredModel === model.id ? 'opacity-10' : 'opacity-0'
                  }`} />
                  
                  {/* Racing particles */}
                  {isRacing && (
                    <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className={`absolute w-1 h-1 rounded-full bg-gradient-to-r ${model.color} animate-pulse`}
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${i * 0.2}s`
                          }}
                        />
                      ))}
                    </div>
                  )}
                  
                  {/* Racing indicator */}
                  {isRacing && (
                    <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
                      <span className="text-xs font-mono font-bold">{Math.round(score)}%</span>
                      <div className={`w-2 h-2 rounded-full ${
                        isLeading ? 'bg-success animate-ping' : 'bg-muted animate-pulse'
                      }`} />
                    </div>
                  )}
                  
                  <div className="relative">
                    {/* Logo */}
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${model.color} bg-clip-text text-transparent p-2 transition-all duration-300 ${
                        hoveredModel === model.id ? 'scale-110 rotate-6' : ''
                      } ${isLeading ? 'scale-125 rotate-12' : ''}`}>
                        {model.logo}
                      </div>
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

                    {/* Racing progress bar */}
                    {isRacing && (
                      <div className="mt-3 pt-3 border-t border-border/50">
                        <div className="h-1.5 bg-muted/30 rounded-full overflow-hidden relative">
                          <div
                            className={`h-full bg-gradient-to-r ${model.color} transition-all duration-300 rounded-full relative overflow-hidden`}
                            style={{ width: `${score}%` }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
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
                        <div className={`w-4 h-4 bg-gradient-to-br ${model.color} bg-clip-text text-transparent`}>
                          {model.logo}
                        </div>
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
                      <div className={`w-8 h-8 bg-gradient-to-br ${chosenModel.color} bg-clip-text text-transparent p-1`}>
                        {chosenModel.logo}
                      </div>
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
