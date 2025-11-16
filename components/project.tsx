"use client";

interface IProjectProps {
  name: string;
  href: string;
  description: string;
}

export function Project({ name, description, href }: IProjectProps) {
  return (
    <li className="cursor-pointer">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="!not-italic !text-foreground"
      >
        {name}, <span>{description}</span>
      </a>
    </li>
  );
}
