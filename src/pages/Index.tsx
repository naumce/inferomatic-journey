import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { LiveRoutingDemo } from "@/components/LiveRoutingDemo";
import { StatsSection } from "@/components/StatsSection";
import { FeaturedModels } from "@/components/FeaturedModels";
import { GettingStarted } from "@/components/GettingStarted";
import { ProvidersShowcase } from "@/components/ProvidersShowcase";
import { FeatureShowcase } from "@/components/FeatureShowcase";
import { CTASection } from "@/components/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <LiveRoutingDemo />
      <StatsSection />
      <FeaturedModels />
      <GettingStarted />
      <ProvidersShowcase />
      <FeatureShowcase />
      <CTASection />
    </div>
  );
};

export default Index;
