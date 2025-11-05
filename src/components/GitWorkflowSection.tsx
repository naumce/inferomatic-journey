import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GitBranch, GitMerge, GitPullRequest, Rocket } from "lucide-react";

export const GitWorkflowSection = () => {
  return (
    <section className="py-24 px-6 bg-gradient-card">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-secondary/20 text-secondary border-secondary/50">
            <GitBranch className="w-3 h-3 mr-1" />
            Hero Feature #1
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Git-Powered Prompts
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Version control for AI prompts. Track changes, create branches, review with pull requests, and deploy with confidence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Visual diagram */}
          <div className="relative">
            <Card className="p-8 bg-card border-border shadow-card">
              <div className="space-y-6">
                {/* Main branch */}
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 rounded-full bg-primary animate-glow-pulse" />
                  <div className="flex-1">
                    <p className="font-mono text-sm text-primary">main</p>
                    <p className="text-xs text-muted-foreground">Production prompts</p>
                  </div>
                </div>

                {/* Arrow down */}
                <div className="ml-1.5 h-8 w-0.5 bg-gradient-to-b from-primary to-secondary" />

                {/* Feature branch */}
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 rounded-full bg-secondary" />
                  <div className="flex-1">
                    <p className="font-mono text-sm text-secondary">feature/improve-prompt</p>
                    <p className="text-xs text-muted-foreground">Experiment safely</p>
                  </div>
                  <GitBranch className="w-4 h-4 text-secondary" />
                </div>

                <div className="ml-1.5 h-8 w-0.5 bg-gradient-to-b from-secondary to-warning" />

                {/* Pull request */}
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 rounded-full bg-warning" />
                  <div className="flex-1">
                    <p className="font-mono text-sm text-warning">Pull Request #42</p>
                    <p className="text-xs text-muted-foreground">Team review & approval</p>
                  </div>
                  <GitPullRequest className="w-4 h-4 text-warning" />
                </div>

                <div className="ml-1.5 h-8 w-0.5 bg-gradient-to-b from-warning to-accent" />

                {/* Merge */}
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 rounded-full bg-accent" />
                  <div className="flex-1">
                    <p className="font-mono text-sm text-accent">Merged to main</p>
                    <p className="text-xs text-muted-foreground">Auto-deployed</p>
                  </div>
                  <GitMerge className="w-4 h-4 text-accent" />
                </div>

                <div className="ml-1.5 h-8 w-0.5 bg-gradient-to-b from-accent to-primary" />

                {/* Deploy */}
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 rounded-full bg-primary shadow-glow" />
                  <div className="flex-1">
                    <p className="font-mono text-sm text-primary">Deploy to Production</p>
                    <p className="text-xs text-muted-foreground">Live in seconds</p>
                  </div>
                  <Rocket className="w-4 h-4 text-primary" />
                </div>
              </div>
            </Card>
          </div>

          {/* Features list */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Why This Matters</h3>
              
              <div className="space-y-3">
                <FeatureItem 
                  icon={<GitBranch className="w-5 h-5 text-primary" />}
                  title="Track Every Change"
                  description="See who changed what, when, and why. Full audit trail."
                />
                
                <FeatureItem 
                  icon={<GitPullRequest className="w-5 h-5 text-secondary" />}
                  title="Team Collaboration"
                  description="Pull requests for prompt reviews. No more ad-hoc changes."
                />
                
                <FeatureItem 
                  icon={<GitMerge className="w-5 h-5 text-accent" />}
                  title="Safe Experiments"
                  description="Branch, test, and merge. Rollback instantly if needed."
                />
                
                <FeatureItem 
                  icon={<Rocket className="w-5 h-5 text-warning" />}
                  title="Deploy with Confidence"
                  description="CI/CD for prompts. Test before production."
                />
              </div>
            </div>

            {/* Code example */}
            <Card className="p-4 bg-background/50 border-border font-mono text-sm">
              <div className="space-y-1">
                <p className="text-muted-foreground"># Version your prompts like code</p>
                <p className="text-accent">git checkout -b feature/improve-prompt</p>
                <p className="text-muted-foreground"># Edit your prompt</p>
                <p className="text-primary">git commit -m "Improved response quality"</p>
                <p className="text-secondary">git push origin feature/improve-prompt</p>
                <p className="text-muted-foreground"># Create PR → Deploy ✨</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureItem = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="flex gap-3">
    <div className="flex-shrink-0 mt-0.5">{icon}</div>
    <div>
      <h4 className="font-semibold mb-1">{title}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  </div>
);
