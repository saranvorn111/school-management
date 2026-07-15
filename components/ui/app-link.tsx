import Link from "next/link";
import { cn } from "@/lib/utils";

interface AppLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function AppLink({ href, children, className }: AppLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "font-medium text-primary transition-colors hover:underline",
        className,
      )}
    >
      {children}
    </Link>
  );
}
