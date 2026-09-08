import { socials } from "@/data/site";
import { FacebookIcon, InstagramIcon, MessengerIcon } from "@/components/Icons";

export function SocialLinks() {
  return (
    <div className="flex gap-2.5" aria-label="Social links">
      <a className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-ink transition hover:bg-cyan/10" href={socials.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
        <FacebookIcon />
      </a>
      <a className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-ink transition hover:bg-cyan/10" href={socials.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
        <InstagramIcon />
      </a>
      <a className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-ink transition hover:bg-cyan/10" href={socials.messenger} target="_blank" rel="noreferrer" aria-label="Messenger">
        <MessengerIcon />
      </a>
    </div>
  );
}
