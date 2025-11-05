import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code2, Check } from "lucide-react";

export const CodeExampleSection = () => {
  return (
    <section className="py-24 px-6 bg-gradient-card">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-primary/20 text-primary border-primary/50">
            <Code2 className="w-3 h-3 mr-1" />
            Developer First
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            OpenAI SDK Compatible
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Drop-in replacement for OpenAI. No code changes required.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Code example */}
          <Card className="p-6 bg-background border-border shadow-card">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold">Python Example</span>
              <Badge variant="outline" className="border-accent/50 text-accent">
                <Check className="w-3 h-3 mr-1" />
                Copy
              </Badge>
            </div>
            
            <pre className="text-sm font-mono overflow-x-auto">
              <code className="block">
                <span className="text-secondary">from</span> <span className="text-foreground">openai</span> <span className="text-secondary">import</span> <span className="text-foreground">OpenAI</span>
                {'\n\n'}
                <span className="text-muted-foreground"># Drop-in replacement</span>
                {'\n'}
                <span className="text-foreground">client</span> <span className="text-secondary">=</span> <span className="text-foreground">OpenAI</span><span className="text-muted-foreground">(</span>
                {'\n'}
                <span className="text-foreground">    base_url</span><span className="text-secondary">=</span><span className="text-accent">"https://api.infere.ai/v1"</span><span className="text-muted-foreground">,</span>
                {'\n'}
                <span className="text-foreground">    api_key</span><span className="text-secondary">=</span><span className="text-accent">"your-infere-key"</span>
                {'\n'}
                <span className="text-muted-foreground">)</span>
                {'\n\n'}
                <span className="text-foreground">response</span> <span className="text-secondary">=</span> <span className="text-foreground">client.chat.completions.create</span><span className="text-muted-foreground">(</span>
                {'\n'}
                <span className="text-foreground">    model</span><span className="text-secondary">=</span><span className="text-accent">"gpt-4"</span><span className="text-muted-foreground">,</span>
                {'\n'}
                <span className="text-foreground">    messages</span><span className="text-secondary">=</span><span className="text-muted-foreground">[</span>
                {'\n'}
                <span className="text-foreground">        </span><span className="text-muted-foreground">{'{'}</span><span className="text-accent">"role"</span><span className="text-muted-foreground">:</span> <span className="text-accent">"user"</span><span className="text-muted-foreground">,</span> <span className="text-accent">"content"</span><span className="text-muted-foreground">:</span> <span className="text-accent">"Hello!"</span><span className="text-muted-foreground">{'}'}</span>
                {'\n'}
                <span className="text-foreground">    </span><span className="text-muted-foreground">]</span>
                {'\n'}
                <span className="text-muted-foreground">)</span>
              </code>
            </pre>
          </Card>

          {/* Features checklist */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold mb-6">What You Get</h3>
            
            <FeatureCheckItem text="OpenAI SDK compatible - zero changes" />
            <FeatureCheckItem text="REST API with full documentation" />
            <FeatureCheckItem text="Webhooks for async operations" />
            <FeatureCheckItem text="SDKs for Python, Node.js, Go" />
            <FeatureCheckItem text="Automatic retries and fallbacks" />
            <FeatureCheckItem text="Built-in rate limiting" />
            <FeatureCheckItem text="99.9% uptime SLA" />
            <FeatureCheckItem text="24/7 support for enterprise" />
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureCheckItem = ({ text }: { text: string }) => (
  <div className="flex items-center gap-3">
    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center">
      <Check className="w-3 h-3 text-accent" />
    </div>
    <span className="text-foreground">{text}</span>
  </div>
);
