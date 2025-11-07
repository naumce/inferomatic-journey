import { useState } from "react";
import { Send, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const MODELS = [
  {
    id: "gemini-pro",
    name: "Gemini 2.5 Pro",
    provider: "google",
    icon: "✦",
    tokens: "197.3B",
    latency: "2.5s",
    growth: "-12.18%",
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: "gpt-5",
    name: "GPT-5",
    provider: "openai",
    icon: "⚡",
    tokens: "59.6B",
    latency: "8.3s",
    growth: "-13.1%",
    color: "from-purple-500 to-pink-500"
  },
  {
    id: "claude-4.5",
    name: "Claude Sonnet 4.5",
    provider: "anthropic",
    icon: "◆",
    tokens: "634.2B",
    latency: "1.9s",
    growth: "-10.99%",
    color: "from-orange-500 to-red-500"
  }
];

export const LiveRoutingDemo = () => {
  const [input, setInput] = useState("");
  const [hoveredModel, setHoveredModel] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  const handleSend = () => {
    if (!input.trim()) return;
    console.log("Sending to model:", selectedModel || "auto-route");
  };

  return (
    <section className="py-32 px-4 relative overflow-hidden">
      {/* Gradient mesh background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      
      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Intelligent Routing
          </h2>
          <p className="text-xl text-muted-foreground">
            Better <span className="text-primary">prices</span>, better <span className="text-primary">uptime</span>, no subscription.
          </p>
        </div>

        {/* Main Interactive Area */}
        <div className="relative flex items-center justify-center min-h-[500px]">
          {/* Connection Lines - appear on hover */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
              </linearGradient>
            </defs>
            
            {hoveredModel && MODELS.map((model, idx) => {
              if (model.id !== hoveredModel) return null;
              const angle = (idx * 360) / MODELS.length - 90;
              const radian = (angle * Math.PI) / 180;
              const radius = 280;
              const centerX = '50%';
              const centerY = '50%';
              const endX = `calc(50% + ${Math.cos(radian) * radius}px)`;
              const endY = `calc(50% + ${Math.sin(radian) * radius}px)`;
              
              return (
                <line
                  key={model.id}
                  x1={centerX}
                  y1={centerY}
                  x2={endX}
                  y2={endY}
                  stroke="url(#lineGradient)"
                  strokeWidth="2"
                  className="animate-pulse"
                />
              );
            })}
          </svg>

          {/* Central Input */}
          <div className="relative z-10 w-full max-w-2xl">
            <div className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-2xl p-8 shadow-2xl">
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
                    className="text-xs px-3 py-1.5 bg-secondary/50 hover:bg-secondary text-secondary-foreground rounded-full transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Floating Model Cards */}
          {MODELS.map((model, idx) => {
            const angle = (idx * 360) / MODELS.length - 90;
            const radian = (angle * Math.PI) / 180;
            const radius = 280;
            const x = Math.cos(radian) * radius;
            const y = Math.sin(radian) * radius;

            return (
              <div
                key={model.id}
                className="absolute z-20 transition-all duration-300"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) ${hoveredModel === model.id ? 'scale(1.05)' : 'scale(1)'}`
                }}
                onMouseEnter={() => setHoveredModel(model.id)}
                onMouseLeave={() => setHoveredModel(null)}
              >
                <div
                  className={`
                    relative w-64 bg-card/80 backdrop-blur-xl border-2 rounded-xl p-6 cursor-pointer
                    transition-all duration-300 hover:shadow-2xl
                    ${hoveredModel === model.id ? 'border-primary shadow-lg shadow-primary/20' : 'border-border/50'}
                    ${selectedModel === model.id ? 'ring-2 ring-primary' : ''}
                  `}
                  onClick={() => setSelectedModel(model.id)}
                >
                  {/* Gradient glow effect */}
                  <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${model.color} opacity-0 group-hover:opacity-10 transition-opacity blur-xl`} />
                  
                  <div className="relative">
                    {/* Icon and Provider */}
                    <div className="flex items-center justify-between mb-4">
                      <div className={`text-4xl bg-gradient-to-br ${model.color} bg-clip-text text-transparent`}>
                        {model.icon}
                      </div>
                      {hoveredModel === model.id && (
                        <Sparkles className="w-5 h-5 text-primary animate-pulse" />
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
                        <span className="font-mono">{model.latency}</span>
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
              </div>
            );
          })}
        </div>

        {/* View Trending Link */}
        <div className="text-center mt-12">
          <a href="#" className="text-sm text-primary hover:underline inline-flex items-center gap-2">
            View Trending
            <span className="text-xs">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
};
