import type { Metadata } from "next";
import { AdminDashboard } from "@/components/AdminDashboard";
import { PageShell } from "@/components/PageShell";
import { getSiteContent } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Admin"
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const content = await getSiteContent();
  return (
    <PageShell footerAdminLabel="Public site" footerAdminHref="/">
      <AdminDashboard initialContent={content} />
    </PageShell>
  );
}
