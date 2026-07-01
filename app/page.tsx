import { AboutSection } from "@/components/AboutSection";
import { BookingSection } from "@/components/BookingSection";
import { BeforeAfterSection } from "@/components/BeforeAfterSection";
import { CinematicExperienceSection } from "@/components/CinematicExperienceSection";
import { ContactSection } from "@/components/ContactSection";
import { EditorialExhibitSection } from "@/components/EditorialExhibitSection";
import { ExhibitPortalSection } from "@/components/ExhibitPortalSection";
import { FeaturedStorySection } from "@/components/FeaturedStorySection";
import { GalleryExperience } from "@/components/GalleryExperience";
import { HeroSection } from "@/components/HeroSection";
import { IntroStrip } from "@/components/IntroStrip";
import { PageShell } from "@/components/PageShell";
import { PricingSection } from "@/components/PricingSection";
import { ServicesSection } from "@/components/ServicesSection";

export default function HomePage() {
  return (
    <PageShell>
      <main>
        <HeroSection />
        <IntroStrip />
        <AboutSection />
        <CinematicExperienceSection />
        <ExhibitPortalSection />
        <ServicesSection />
        <FeaturedStorySection />
        <BeforeAfterSection />
        <PricingSection />
        <EditorialExhibitSection />
        <GalleryExperience />
        <BookingSection />
        <ContactSection />
      </main>
    </PageShell>
  );
}
