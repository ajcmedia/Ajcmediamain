import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SectionTransition } from "@/components/SectionTransition";

export function PageShell({ children, footerAdminLabel, footerAdminHref, light = true }: { children: React.ReactNode; footerAdminLabel?: string; footerAdminHref?: string; light?: boolean }) {
  return (
    <div className={light ? "public-light" : undefined}>
      <SectionTransition />
      <SiteHeader />
      {children}
      <SiteFooter adminLabel={footerAdminLabel} adminHref={footerAdminHref} />
    </div>
  );
}
