export type NavLinkDashboardProps = {
  href: string;
  current: boolean;
  children: React.ReactNode;
};

export type NavLinkProps = {
  href: string;
  label: string;
  onClick?: () => void;
};
