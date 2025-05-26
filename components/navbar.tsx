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
    <nav className="md:flex md:relative md:flex-row md:items-center md:bottom-auto md:left-auto md:right-auto md:mx-0 md:mt-0 md:w-auto pb-2 gap-2 lowercase fixed bottom-8 left-0 right-0 m-auto w-fit">
      {items.map(({ url, label }, index) => (
        <Link
          className={cn(
            "text-accent font-body md:text-xs md:p-0 hover:text-foreground ease-linear duration-200 !no-underline",
            { "text-foreground": pathname === url },
            { "pl-2": index !== 0 },
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
