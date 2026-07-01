import type { Metadata } from "next";
import { AdminDashboard } from "@/components/AdminDashboard";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Admin"
};

export default function AdminPage() {
  return (
    <PageShell footerAdminLabel="Public site" footerAdminHref="/">
      <AdminDashboard />
    </PageShell>
  );
}
