import { Github, Linkedin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-background border-t mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 sm:mb-0">
            © {new Date().getFullYear()} Moulinet Samuel. Tous droits réservés.
          </p>
          <div className="flex space-x-4">
            <Link
              href="https://www.linkedin.com/in/samuel-moulinet-a48576305/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="w-6 h-6 text-muted-foreground hover:text-primary transition-colors" />
            </Link>
            <Link
              href="https://github.com/moulinetsamuel"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-6 h-6 text-muted-foreground hover:text-primary transition-colors" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
