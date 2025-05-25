"use client";

import { useEffect, useRef } from "react";

interface ClickSoundProps {
  volume?: number;
}

export default function ClickSound({ volume = 0.3 }: ClickSoundProps) {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    audioRef.current = new Audio("/click.wav");
    audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    function handleClick(event: Event) {
      const target = event.target as HTMLElement;
      if (
        !target.closest('button, a, input, select, textarea, [role="button"]')
      )
        return;

      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      }
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
