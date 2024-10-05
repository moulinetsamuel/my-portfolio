import Link from "next/link";

export default function NavLink({
  href,
  current,
  children,
}: {
  href: string;
  current: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
        current
          ? "border-primary text-foreground"
          : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
      }`}
    >
      {children}
    </Link>
  );
}
