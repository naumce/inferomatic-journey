import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Clock, DollarSign, TrendingUp } from "lucide-react";

interface ModelResponseCardProps {
  name: string;
  provider: string;
  response: string;
  cost: string;
  latency: string;
  quality: number;
  selected: boolean;
}

export const ModelResponseCard = ({ 
  name, 
  provider, 
  response, 
  cost, 
  latency, 
  quality, 
  selected 
}: ModelResponseCardProps) => {
  return (
    <Card className={`p-5 h-full flex flex-col bg-card border transition-all duration-300 ${
      selected 
        ? 'border-primary shadow-glow' 
        : 'border-border hover:border-primary/50'
    }`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-bold text-lg">{name}</h3>
          <p className="text-xs text-muted-foreground">{provider}</p>
        </div>
        {selected && (
          <Badge className="bg-primary/20 text-primary border-primary/50">
            <Check className="w-3 h-3 mr-1" />
            Selected
          </Badge>
        )}
      </div>

      {/* Response text */}
      <div className="flex-1 mb-4">
        <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-line">
          {response}
        </p>
      </div>

      {/* Metrics */}
      <div className="space-y-2 mb-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-1 text-muted-foreground">
            <DollarSign className="w-3 h-3" />
            Cost
          </span>
          <span className="font-mono font-semibold text-accent">{cost}</span>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-1 text-muted-foreground">
            <Clock className="w-3 h-3" />
            Latency
          </span>
          <span className="font-mono font-semibold text-primary">{latency}</span>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-1 text-muted-foreground">
            <TrendingUp className="w-3 h-3" />
            Quality
          </span>
          <span className="font-mono font-semibold text-secondary">{quality}%</span>
        </div>
      </div>

      {/* Action button */}
      <Button 
        variant={selected ? "default" : "outline"} 
        className={`w-full ${selected ? 'bg-primary text-primary-foreground' : ''}`}
      >
        {selected ? 'Using This Model' : 'Use This Model'}
      </Button>
    </Card>
  );
};
