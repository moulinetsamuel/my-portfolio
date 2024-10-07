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
    <Link href={href} className="group relative" onClick={onClick}>
      {label}
      <span className="absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 bg-primary transition-transform group-hover:scale-x-100"></span>
    </Link>
  );
}
