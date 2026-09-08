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
import { getSiteContent } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const content = await getSiteContent();

  return (
    <PageShell>
      <main>
        <HeroSection content={content.hero} />
        <IntroStrip />
        <AboutSection content={content.about} />
        <CinematicExperienceSection content={content.experience} />
        <ExhibitPortalSection content={content.portals} />
        <ServicesSection content={content.services} />
        <FeaturedStorySection content={content.featuredStory} />
        <BeforeAfterSection content={content.beforeAfter} />
        <PricingSection content={content.pricing} />
        <EditorialExhibitSection content={content.editorial} />
        <GalleryExperience content={content.gallery} />
        <BookingSection />
        <ContactSection />
      </main>
    </PageShell>
  );
}
