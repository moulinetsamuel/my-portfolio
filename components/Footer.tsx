import { Github, Linkedin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto w-full border-t bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-between sm:flex-row">
          <p className="mb-4 text-sm text-muted-foreground sm:mb-0">
            © {new Date().getFullYear()} Moulinet Samuel. Tous droits réservés.
          </p>
          <div className="flex space-x-4">
            <Link
              href="https://www.linkedin.com/in/samuel-moulinet-a48576305/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Profil LinkedIn"
            >
              <Linkedin className="size-6 text-muted-foreground transition-colors hover:text-primary" />
            </Link>
            <Link
              href="https://github.com/moulinetsamuel"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Profil GitHub"
            >
              <Github className="size-6 text-muted-foreground transition-colors hover:text-primary" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
