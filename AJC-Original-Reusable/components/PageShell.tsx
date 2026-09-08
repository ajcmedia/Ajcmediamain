import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SectionTransition } from "@/components/SectionTransition";

export function PageShell({ children, footerAdminLabel, footerAdminHref }: { children: React.ReactNode; footerAdminLabel?: string; footerAdminHref?: string }) {
  return (
    <>
      <SectionTransition />
      <SiteHeader />
      {children}
      <SiteFooter adminLabel={footerAdminLabel} adminHref={footerAdminHref} />
    </>
  );
}
