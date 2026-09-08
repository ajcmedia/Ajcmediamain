import Link from "next/link";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  icon?: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
};

export function ButtonLink({ href, children, icon, variant = "ghost", className = "" }: ButtonLinkProps) {
  const variantClass = variant === "primary" ? "pill-button-primary" : "pill-button-ghost";

  return (
    <Link href={href} className={`pill-button ${variantClass} ${className}`}>
      {icon ? <span className="inline-flex h-5 w-5">{icon}</span> : null}
      {children}
    </Link>
  );
}
