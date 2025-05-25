"use client";

interface IProjectProps {
  name: string;
  href: string;
  stack: string[];
  description: string;
}

export function Project({ name, description, stack, href }: IProjectProps) {
  return (
    <li className="cursor-pointer pb-1 last:pb-0">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="!no-underline !text-foreground"
      >
        <b>{name}</b>, <span>{description}</span>
        <br />
        <span>{stack.join(", ")}</span>
      </a>
    </li>
  );
}
