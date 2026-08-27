import { useCallback, useEffect, useRef, useState } from "react";
import type { PixelFrame, SpriteAnimation } from "./sprite-types";

export type AnimationName = "idle" | "blink" | "walk" | "wave" | "jump";

type UseSpriteAnimationOptions = {
  /** Animation lookup table provided by the sprite config. */
  animations: Record<string, SpriteAnimation>;
  /** Starting animation. @default "idle" */
  initial?: AnimationName;
  /** Playback speed multiplier. @default 1 */
  speed?: number;
  /** Auto-play animation on mount. @default true */
  autoPlay?: boolean;
  /** Respect prefers-reduced-motion. @default true */
  respectReducedMotion?: boolean;
  /** Callback when a non-looping animation ends. */
  onComplete?: (name: AnimationName) => void;
};

const EMPTY_FRAME: PixelFrame = [];

export function useSpriteAnimation({
  animations,
  initial = "idle",
  speed = 1,
  autoPlay = true,
  respectReducedMotion = true,
  onComplete,
}: UseSpriteAnimationOptions) {
  const [currentAnim, setCurrentAnim] = useState<AnimationName>(initial);
  const [frameIndex, setFrameIndex] = useState(0);
  const [playing, setPlaying] = useState(autoPlay);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const queueRef = useRef<AnimationName | null>(null);

  const animation = animations[currentAnim] ?? animations.idle;
  const frames = animation?.frames ?? [];
  const frame = frames[frameIndex] ?? frames[0] ?? EMPTY_FRAME;
  const frameDuration = Math.max(animation?.frameDuration ?? 0, 1) / speed;

  const play = useCallback(
    (name: AnimationName) => {
      setCurrentAnim(name);
      setFrameIndex(0);
      setPlaying(true);
    },
    [],
  );

  const queueNext = useCallback((name: AnimationName) => {
    queueRef.current = name;
  }, []);

  const stop = useCallback(() => setPlaying(false), []);

  // Advance the frame index on a timer. Callbacks are invoked outside the
  // state updater so React state updates remain predictable.
  useEffect(() => {
    if (!playing || respectReducedMotion === false || !animation || frames.length === 0) {
      return;
    }

    if (
      respectReducedMotion &&
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    timerRef.current = setInterval(() => {
      setFrameIndex((prev) => {
        const next = prev + 1;
        if (next < frames.length) return next;
        if (animation.loop) return 0;
        return prev;
      });

      if (!animation.loop) {
        setPlaying(false);
        onComplete?.(currentAnim);
      }
    }, frameDuration);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = null;
    };
  }, [
    animation,
    currentAnim,
    frameDuration,
    frames.length,
    onComplete,
    playing,
    respectReducedMotion,
  ]);

  // Pause while the tab is hidden.
  useEffect(() => {
    const handler = () => {
      if (document.hidden) {
        setPlaying(false);
      }
    };

    document.addEventListener("visibilitychange", handler);
    return () => document.removeEventListener("visibilitychange", handler);
  }, []);

  return { frame, frameIndex, currentAnim, playing, play, stop, queueNext };
}
