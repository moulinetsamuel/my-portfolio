import Link from "next/link";

export default function NavLink({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick?: () => void;
}) {
  return (
    <Link href={href} className="relative group" onClick={onClick}>
      {label}
      <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
    </Link>
  );
}
