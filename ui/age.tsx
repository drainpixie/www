"use client";

import { useEffect, useRef } from "react";

export default function Age({ birthday }: { birthday: Date }) {
  const ref = useRef<HTMLSpanElement>(null);

  function update() {
    const age =
      (new Date().getTime() - birthday.getTime()) /
      (1000 * 60 * 60 * 24 * 365.25);
    if (ref.current) ref.current.innerText = age.toFixed(10);
  }

  useEffect(() => {
    const interval = setInterval(update, 1);
    return () => clearInterval(interval);
  }, []);

  return <span ref={ref} />;
}
