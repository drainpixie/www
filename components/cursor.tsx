"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/app/utils";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isInViewport, setIsInViewport] = useState(true);

  useEffect(() => {
    const checkTouchDevice = () => {
      setIsTouchDevice(
        "ontouchstart" in window ||
          navigator.maxTouchPoints > 0 ||
          window.matchMedia("(pointer: coarse)").matches,
      );
    };

    checkTouchDevice();

    const mediaQuery = window.matchMedia("(pointer: coarse)");
    const handleMediaChange = () => checkTouchDevice();
    mediaQuery.addEventListener("change", handleMediaChange);

    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    const moveCursor = (e: MouseEvent) =>
      cursorRef.current &&
      ((cursorRef.current.style.left = `${e.clientX}px`),
      (cursorRef.current.style.top = `${e.clientY}px`));

    const handleMouseOver = (e: MouseEvent) =>
      (e.target as HTMLElement).closest("a") && setHovering(true);

    const handleMouseOut = (e: MouseEvent) =>
      (e.target as HTMLElement).closest("a") && setHovering(false);

    const handleMouseEnter = () => setIsInViewport(true);
    const handleMouseLeave = () => setIsInViewport(false);

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <div
      ref={cursorRef}
      className={cn(
        "fixed z-[1000] w-8 h-8 rounded-full bg-background pointer-events-none mix-blend-difference transition-transform duration-200s ease-in-out  -translate-x-1/2 -translate-y-1/2",
        "hidden md:block",
        {
          "scale-100 opacity-100": hovering && isInViewport,
          "scale-[0.3] opacity-100": !hovering && isInViewport,
          "opacity-0": !isInViewport,
        },
      )}
    />
  );
}
