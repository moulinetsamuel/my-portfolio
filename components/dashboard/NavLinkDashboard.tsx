import Link from "next/link";
import type { NavLinkDashboardProps } from "@/types/portfolio";

export default function NavLinkDashboard({
  href,
  current,
  children,
}: NavLinkDashboardProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${
        current
          ? "border-primary text-foreground"
          : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
      }`}
    >
      {children}
    </Link>
  );
}
