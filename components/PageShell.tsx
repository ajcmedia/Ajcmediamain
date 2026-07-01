import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export function PageShell({ children, footerAdminLabel, footerAdminHref }: { children: React.ReactNode; footerAdminLabel?: string; footerAdminHref?: string }) {
  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter adminLabel={footerAdminLabel} adminHref={footerAdminHref} />
    </>
  );
}
