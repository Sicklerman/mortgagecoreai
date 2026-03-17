import { HeroSection } from "@/components/home/HeroSection";
import { StatsBar } from "@/components/home/StatsBar";
import { ProblemSection } from "@/components/home/ProblemSection";
import { SolutionOverview } from "@/components/home/SolutionOverview";
import { FeaturesGrid } from "@/components/home/FeaturesGrid";
import { AICapabilities } from "@/components/home/AICapabilities";
import { DemoPreview } from "@/components/home/DemoPreview";
import { Integrations } from "@/components/home/Integrations";
import { CTASection } from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <ProblemSection />
      <SolutionOverview />
      <FeaturesGrid />
      <AICapabilities />
      <DemoPreview />
      <Integrations />
      <CTASection />
    </>
  );
}
