import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, BarChart3, Zap, Shield } from "lucide-react";

export const ObservabilitySection = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/20 text-primary border-primary/50">
            <Activity className="w-3 h-3 mr-1" />
            Hero Feature #2
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Advanced Observability
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See everything that matters. Real-time monitoring, cost tracking, and performance analytics.
          </p>
        </div>

        {/* Mock dashboard */}
        <Card className="p-8 bg-gradient-card border-border shadow-card mb-12">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Metric 1 */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Requests</span>
                <Zap className="w-4 h-4 text-primary" />
              </div>
              <p className="text-3xl font-bold text-primary animate-counter">12,847</p>
              <div className="flex items-center gap-2 text-xs">
                <Badge variant="outline" className="border-accent/50 text-accent">+23.4%</Badge>
                <span className="text-muted-foreground">vs last week</span>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Avg Latency</span>
                <Activity className="w-4 h-4 text-accent" />
              </div>
              <p className="text-3xl font-bold text-accent animate-counter">847ms</p>
              <div className="flex items-center gap-2 text-xs">
                <Badge variant="outline" className="border-accent/50 text-accent">-15.2%</Badge>
                <span className="text-muted-foreground">improvement</span>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Cost Savings</span>
                <BarChart3 className="w-4 h-4 text-secondary" />
              </div>
              <p className="text-3xl font-bold text-secondary animate-counter">$2,341</p>
              <div className="flex items-center gap-2 text-xs">
                <Badge variant="outline" className="border-secondary/50 text-secondary">54% cheaper</Badge>
                <span className="text-muted-foreground">vs direct API</span>
              </div>
            </div>
          </div>

          {/* Request timeline mockup */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground mb-3">Recent Requests</h3>
            
            <RequestItem 
              timestamp="2s ago"
              model="Claude 3.5"
              tokens="234 → 567"
              cost="$0.0023"
              latency="847ms"
              status="success"
            />
            <RequestItem 
              timestamp="5s ago"
              model="GPT-4"
              tokens="189 → 423"
              cost="$0.0031"
              latency="1.2s"
              status="success"
            />
            <RequestItem 
              timestamp="12s ago"
              model="Gemini Pro"
              tokens="312 → 789"
              cost="$0.0018"
              latency="932ms"
              status="success"
            />
          </div>
        </Card>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard 
            icon={<Activity className="w-6 h-6 text-primary" />}
            title="Request Tracing"
            description="Follow every request from input to output"
          />
          <FeatureCard 
            icon={<BarChart3 className="w-6 h-6 text-accent" />}
            title="Token Analytics"
            description="Track usage patterns and optimize costs"
          />
          <FeatureCard 
            icon={<Shield className="w-6 h-6 text-secondary" />}
            title="Error Monitoring"
            description="Real-time alerts for failures"
          />
          <FeatureCard 
            icon={<Zap className="w-6 h-6 text-warning" />}
            title="Performance Metrics"
            description="Latency, throughput, and uptime"
          />
        </div>
      </div>
    </section>
  );
};

const RequestItem = ({ 
  timestamp, 
  model, 
  tokens, 
  cost, 
  latency, 
  status 
}: { 
  timestamp: string; 
  model: string; 
  tokens: string; 
  cost: string; 
  latency: string; 
  status: string;
}) => (
  <div className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/50 text-sm">
    <div className="flex items-center gap-4">
      <div className={`w-2 h-2 rounded-full ${status === 'success' ? 'bg-accent' : 'bg-destructive'}`} />
      <span className="text-muted-foreground font-mono text-xs">{timestamp}</span>
      <span className="font-semibold">{model}</span>
    </div>
    <div className="flex items-center gap-6 text-xs">
      <span className="text-muted-foreground">Tokens: <span className="text-foreground font-mono">{tokens}</span></span>
      <span className="text-muted-foreground">Cost: <span className="text-accent font-mono">{cost}</span></span>
      <span className="text-muted-foreground">Latency: <span className="text-primary font-mono">{latency}</span></span>
    </div>
  </div>
);

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <Card className="p-6 bg-card border-border hover:border-primary/50 transition-all duration-300">
    <div className="mb-3">{icon}</div>
    <h3 className="font-semibold mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground">{description}</p>
  </Card>
);
