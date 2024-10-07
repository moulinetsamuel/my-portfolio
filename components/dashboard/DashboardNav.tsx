"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import NavLinkDashboard from "./NavLinkDashboard";

export default function DashboardNav() {
  const pathname = usePathname();

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex shrink-0 items-center">
              <Link href="/dashboard" className="text-xl font-bold">
                Dashboard
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <NavLinkDashboard
                href="/dashboard/cv"
                current={pathname === "/dashboard/cv"}
              >
                Gestion du CV
              </NavLinkDashboard>
              <NavLinkDashboard
                href="/dashboard/projects"
                current={pathname === "/dashboard/projects"}
              >
                Gestion des projets
              </NavLinkDashboard>
              <NavLinkDashboard
                href="/dashboard/skills"
                current={pathname === "/dashboard/skills"}
              >
                Gestion des compétences
              </NavLinkDashboard>
            </div>
          </div>
          <div className="flex items-center">
            <Button variant="ghost" onClick={handleLogout}>
              Déconnexion
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
