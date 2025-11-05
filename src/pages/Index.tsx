import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { DifferentiatorsSection } from "@/components/DifferentiatorsSection";
import { CTASection } from "@/components/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <DifferentiatorsSection />
      <CTASection />
    </div>
  );
};

export default Index;
