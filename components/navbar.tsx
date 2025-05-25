"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/app/utils";

export interface INavbarItem {
  url: string;
  label: string;
}

interface INavbarProps {
  items: INavbarItem[];
}

export default function Navbar({ items }: INavbarProps) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-row gap-2 items-center lowercase mb-2">
      {items.map(({ url, label }) => (
        <Link
          className={cn(
            "text-accent font-body text-xs hover:text-foreground ease-linear duration-200 !no-underline",
            { "text-foreground": pathname === url },
          )}
          key={label}
          href={url}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
