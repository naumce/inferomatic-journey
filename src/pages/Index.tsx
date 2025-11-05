import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { WhatIsInfere } from "@/components/WhatIsInfere";
import { DifferentiatorsSection } from "@/components/DifferentiatorsSection";
import { CTASection } from "@/components/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <WhatIsInfere />
      <DifferentiatorsSection />
      <CTASection />
    </div>
  );
};

export default Index;
