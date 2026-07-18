import Image from "next/image";
import Link from "next/link";
import { SocialLinks } from "@/components/SocialLinks";

export function SiteFooter({ adminLabel = "Admin dashboard", adminHref = "/admin" }: { adminLabel?: string; adminHref?: string }) {
  return (
    <footer className="grid gap-7 border-t border-white/15 px-[clamp(18px,5vw,70px)] pb-7 pt-12">
      <div className="grid gap-7 lg:grid-cols-[minmax(260px,1.45fr)_repeat(3,minmax(150px,0.7fr))]">
        <div className="grid max-w-[430px] gap-5">
          <Image className="footer-logo" src="/assets/brand/ajc-logo.svg" alt="AJC Media" width={112} height={31} />
          <p className="body-copy">Freelance photography in Vancouver, BC. Weddings, portraits, family milestones, events, and content sessions.</p>
          <SocialLinks />
        </div>

        <FooterColumn title="Explore">
          <Link href="/#experience">Experience reel</Link>
          <Link href="/#portals">Gallery portals</Link>
          <Link href="/#services">Services</Link>
          <Link href="/#pricing">Pricing</Link>
          <Link href="/#gallery">Full gallery</Link>
        </FooterColumn>

        <FooterColumn title="Studio Info">
          <p>Vancouver, BC</p>
          <p>By appointment only</p>
          <p>Preview edits within 48 hours</p>
        </FooterColumn>

        <FooterColumn title="Contact">
          <a href="mailto:hello@ajcmedia.ca">ajcmedia888@gmail.com</a>
          <a href="tel:+16045550188">(778) 883-4378</a>
          <Link href="/#booking">Request availability</Link>
        </FooterColumn>
      </div>

      <div className="flex flex-col gap-4 border-t border-white/15 pt-5 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <span>© 2026 AJC Media. Vancouver photography for weddings, events, portraits, and brand stories.</span>
        <Link className="transition hover:text-ink" href={adminHref}>
          {adminLabel}
        </Link>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="grid content-start gap-2.5 text-sm text-muted [&_a]:transition [&_a:hover]:text-ink">
      <h3 className="mb-1 text-sm font-extrabold uppercase tracking-[0.08em] text-ink">{title}</h3>
      {children}
    </div>
  );
}
