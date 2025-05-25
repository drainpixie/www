"use client";

interface IExperienceProps {
  company: string;
  start: string;
  role: string;
  end: string;
}

export function Experience({ company, start, role, end }: IExperienceProps) {
  return (
    <li className="pb-1 last:pb-0">
      <b>{role}</b> @ {company}
      <br />
      <span>
        {start} – {end}
      </span>
    </li>
  );
}
