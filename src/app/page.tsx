import { isDemoMode } from '@/lib/supabase';
import { DemoBanner } from '@/components/shared/DemoBanner';
import { Header } from '@/components/shared/Header';
import { HeroSection } from '@/components/landing/HeroSection';
import { ThreePillarsSection } from '@/components/landing/ThreePillarsSection';
import { SystemShowcaseSection } from '@/components/landing/SystemShowcaseSection';
import { OutcomeStoriesSection } from '@/components/landing/OutcomeStoriesSection';
import { IntelligenceBriefingsSection } from '@/components/landing/IntelligenceBriefingsSection';
import { ArchitectureCTA } from '@/components/landing/ArchitectureCTA';
import { Footer } from '@/components/shared/Footer';

export default function HomePage() {
  const isDemo = isDemoMode();

  return (
    <div className="min-h-screen bg-midnight">
      {isDemo && <DemoBanner />}
      <Header />
      <main>
        <HeroSection />
        <ThreePillarsSection />
        <SystemShowcaseSection />
        <OutcomeStoriesSection />
        <IntelligenceBriefingsSection />
        <ArchitectureCTA />
      </main>
      <Footer />
    </div>
  );
}
