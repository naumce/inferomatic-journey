import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { DifferentiatorsSection } from "@/components/DifferentiatorsSection";
import { GitWorkflowSection } from "@/components/GitWorkflowSection";
import { ObservabilitySection } from "@/components/ObservabilitySection";
import { CodeExampleSection } from "@/components/CodeExampleSection";
import { CTASection } from "@/components/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <DifferentiatorsSection />
      <GitWorkflowSection />
      <ObservabilitySection />
      <CodeExampleSection />
      <CTASection />
    </div>
  );
};

export default Index;
