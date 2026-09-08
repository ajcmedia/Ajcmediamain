import Image from "next/image";
import { ButtonLink } from "@/components/ButtonLink";
import { FramedImage } from "@/components/FramedImage";
import { Reveal } from "@/components/Reveal";
import { getImagePresentationStyle } from "@/lib/image-presentation";
import type { ImageSlot, SiteContent } from "@/types/site";

export function AboutSection({ content, photographs = [] }: { content: SiteContent["about"]; photographs?: ImageSlot[] }) {
  return (
    <section id="about" className="beige-about" data-scroll-anchor>
      <div className="beige-about-collage">
        {photographs[0] && <div className="about-image-small"><FramedImage src={photographs[0].image} alt={photographs[0].alt} position={photographs[0].position} fit="cover" sizes="(max-width:640px) 42vw, 24vw" /></div>}
        <div className="about-image-main"><Image src={content.portraitImage} alt={content.portraitAlt} fill sizes="(max-width:640px) 64vw, 30vw" className="object-cover" style={getImagePresentationStyle(content.portraitPosition)} /></div>
      </div>
      <Reveal className="beige-about-copy">
        <p className="eyebrow">Behind the photographs / Jayson</p>
        <h2>Capturing <em>the</em><br />feeling <em>of</em><br />being there.</h2>
        <p>I'm Jayson, the photographer behind AJC Media. I look for the honest moments—the fleeting expressions, the quiet connections, the feeling of being there.</p>
        <p>From weddings and family milestones to portraits and brand stories, my approach is personal, considered, and led by you.</p>
        <ButtonLink href="/#booking">Let's plan your session</ButtonLink>
      </Reveal>
      {photographs[1] && <div className="about-image-side"><FramedImage src={photographs[1].image} alt={photographs[1].alt} position={photographs[1].position} fit="cover" sizes="(max-width:900px) 38vw, 20vw" /></div>}
    </section>
  );
}
