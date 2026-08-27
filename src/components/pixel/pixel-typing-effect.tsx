"use client";

import { useEffect, useRef, useState } from "react";

type Phase = "idle" | "deleting" | "typing";

interface PixelTypingEffectProps {
  phrases: Array<string>;
  /** ms to hold text before starting delete (default 2000) */
  holdDelay?: number;
  /** ms per character when typing (default 80) */
  typeSpeed?: number;
  /** ms per character when deleting (default 50) */
  deleteSpeed?: number;
  /** ms pause between delete-complete and next type start (default 400) */
  pauseDelay?: number;
  className?: string;
  /** Reserve the width of the full phrase so typing does not shift surrounding content. */
  reserveWidth?: boolean;
}

export function PixelTypingEffect({
  phrases,
  holdDelay = 2000,
  typeSpeed = 80,
  deleteSpeed = 50,
  pauseDelay = 400,
  className,
  reserveWidth = false,
}: PixelTypingEffectProps) {
  const safePhrases = phrases.length > 0 ? phrases : [""];
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState(safePhrases[0]);
  const [phase, setPhase] = useState<Phase>("idle");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const currentPhrase = safePhrases[phraseIndex % safePhrases.length];

  useEffect(() => {
    if (phase === "idle") {
      timeoutRef.current = setTimeout(() => setPhase("deleting"), holdDelay);
    } else if (phase === "deleting") {
      if (displayText.length === 0) {
        timeoutRef.current = setTimeout(() => {
          setPhraseIndex((prev) => (prev + 1) % safePhrases.length);
          setPhase("typing");
        }, pauseDelay);
      } else {
        timeoutRef.current = setTimeout(() => {
          setDisplayText((prev) => prev.slice(0, -1));
        }, deleteSpeed);
      }
    } else if (displayText.length >= currentPhrase.length) {
      timeoutRef.current = setTimeout(() => setPhase("idle"), holdDelay);
    } else {
      timeoutRef.current = setTimeout(() => {
        setDisplayText(currentPhrase.slice(0, displayText.length + 1));
      }, typeSpeed);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [
    currentPhrase,
    deleteSpeed,
    displayText,
    holdDelay,
    pauseDelay,
    phase,
    safePhrases.length,
    typeSpeed,
  ]);

  return (
    <span
      className={`relative inline-block ${className ?? ""}`}
      aria-label={currentPhrase}
    >
      {/* Invisible full-width copy reserves the complete phrase plus cursor. */}
      <span aria-hidden="true" className="invisible whitespace-nowrap">
        {currentPhrase}
        <span className="ml-px inline-block h-[9px] w-[5px] translate-y-px bg-current" />
      </span>

      {/* Visible text renders over the reserved width without shifting pets. */}
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 whitespace-nowrap"
      >
        <span>{displayText}</span>
        <span className="ml-px inline-block h-[9px] w-[5px] translate-y-px animate-pulse bg-current" />
      </span>
    </span>
  );
}