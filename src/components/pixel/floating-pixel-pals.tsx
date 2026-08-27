"use client";

import { PixelSpriteRenderer } from "./pixel-sprite-renderer";
import { PixelTypingEffect } from "./pixel-typing-effect";

const PHRASES = ["hello world"];

/**
 * A self-contained fixed overlay. It is outside the normal document flow,
 * so it cannot affect any page layout, scrolling, or existing styles.
 */
export function FloatingPixelPals() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed bottom-6 right-6 z-40 isolate select-none"
      style={{ contain: "layout paint" }}
    >
      <div className="flex items-end gap-3">
        <div className="flex items-end gap-2">
          <PixelSpriteRenderer variant="codex" animation="idle" scale={4} />
          <PixelSpriteRenderer variant="claude" animation="idle" scale={3} />
          <PixelSpriteRenderer variant="cat" animation="idle" scale={3} />
        </div>
        <PixelTypingEffect
          phrases={PHRASES}
          reserveWidth
          className="mb-1 inline-block text-left font-mono text-[11px] leading-none tracking-wider text-muted-foreground/60"
        />
      </div>
    </div>
  );
}
