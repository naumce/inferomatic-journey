import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Send, Sparkles, Zap, DollarSign } from "lucide-react";
import { ModelResponseCard } from "./ModelResponseCard";

export const ChatDemo = () => {
  const [showResponses, setShowResponses] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (inputValue.trim()) {
      setShowResponses(true);
    }
  };

  const models = [
    {
      name: "GPT-4",
      provider: "OpenAI",
      response: "I can help you build a robust authentication system. Here's a comprehensive approach:\n\n1. Use JWT tokens for stateless auth\n2. Implement refresh token rotation\n3. Add rate limiting to prevent brute force\n4. Use bcrypt for password hashing",
      cost: "$0.003",
      latency: "1.2s",
      quality: 95,
      selected: false
    },
    {
      name: "Claude 3.5",
      provider: "Anthropic",
      response: "Great question! For authentication, I recommend:\n\n• OAuth 2.0 + OIDC for social login\n• Session management with secure cookies\n• Multi-factor authentication (TOTP/SMS)\n• Password policies and breach detection\n• Proper CORS and CSRF protection",
      cost: "$0.002",
      latency: "0.8s",
      quality: 97,
      selected: true
    },
    {
      name: "Gemini Pro",
      provider: "Google",
      response: "Here's a modern auth strategy:\n\nImplement passwordless authentication with magic links or WebAuthn. This provides better UX and security. Pair it with session management using HTTP-only cookies and implement proper RBAC for authorization.",
      cost: "$0.001",
      latency: "0.9s",
      quality: 92,
      selected: false
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Input area */}
      <Card className="p-6 mb-6 bg-card border-border shadow-card">
        <div className="flex gap-3 mb-4">
          <Badge variant="outline" className="border-primary/30 text-primary">
            <Sparkles className="w-3 h-3 mr-1" />
            Variables
          </Badge>
          <Badge variant="outline" className="border-muted-foreground/30">
            Memory: 4k
          </Badge>
          <Badge variant="outline" className="border-accent/30 text-accent">
            <Zap className="w-3 h-3 mr-1" />
            Routing: Auto
          </Badge>
        </div>
        
        <div className="flex gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="How do I implement authentication in my app?"
            className="flex-1 bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Button onClick={handleSend} className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </Card>

      {/* Model responses */}
      {showResponses && (
        <div className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {models.map((model, index) => (
              <div key={model.name} style={{ animationDelay: `${index * 100}ms` }} className="animate-slide-up">
                <ModelResponseCard {...model} />
              </div>
            ))}
          </div>

          {/* Live metrics */}
          <Card className="p-6 bg-gradient-card border-border">
            <div className="flex items-center gap-2 mb-4">
              <DollarSign className="w-5 h-5 text-accent" />
              <h3 className="font-semibold">Live Metrics</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground mb-1">Total Cost</p>
                <p className="text-2xl font-bold text-accent">$0.006</p>
                <p className="text-xs text-muted-foreground">54% cheaper than OpenAI direct</p>
              </div>
              
              <div>
                <p className="text-muted-foreground mb-1">Fastest Response</p>
                <p className="text-2xl font-bold text-primary">0.8s</p>
                <p className="text-xs text-muted-foreground">Claude 3.5 Sonnet</p>
              </div>
              
              <div>
                <p className="text-muted-foreground mb-1">Best Quality</p>
                <p className="text-2xl font-bold text-secondary">97%</p>
                <p className="text-xs text-muted-foreground">Claude 3.5 Sonnet</p>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
