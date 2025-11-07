import { useEffect, useState } from "react";

interface StatCardProps {
  value: string;
  label: string;
  delay: number;
}

const StatCard = ({ value, label, delay }: StatCardProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`flex flex-col items-center p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-lg hover:-translate-y-1 ${
        isVisible ? "animate-counter" : "opacity-0"
      }`}
    >
      <div className="text-5xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
        {value}
      </div>
      <div className="text-muted-foreground text-sm md:text-base font-medium">{label}</div>
    </div>
  );
};

export const StatsSection = () => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard value="20T" label="Monthly Tokens" delay={0} />
          <StatCard value="4.2M+" label="Global Users" delay={100} />
          <StatCard value="60+" label="Active Providers" delay={200} />
          <StatCard value="500+" label="Models" delay={300} />
        </div>
      </div>
    </section>
  );
};
