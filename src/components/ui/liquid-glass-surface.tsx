"use client";

import { useEffect, useId, useRef } from "react";
import type { CSSProperties } from "react";

// Reuse maps as the existing dock animation moves through the same sizes.
const displacementMaps = new Map<string, string>();
const MAX_CACHED_MAPS = 96;

function createDisplacementMap(
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
) {
  const key = `${width}x${height}`;
  const cached = displacementMaps.get(key);
  if (cached) return cached;

  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (!context) return null;

  const image = context.createImageData(width, height);
  const radius = Math.min(width, height) / 2;
  const bevel = Math.min(radius * 0.6, 14);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const px = x + 0.5 - width / 2;
      const py = y + 0.5 - height / 2;
      const qx = Math.abs(px) - width / 2 + radius;
      const qy = Math.abs(py) - height / 2 + radius;
      const outsideX = Math.max(qx, 0);
      const outsideY = Math.max(qy, 0);
      const length = Math.hypot(outsideX, outsideY);
      const distance = Math.min(Math.max(qx, qy), 0) + length - radius;
      const depth = Math.max(0, -distance);
      const weight = distance <= 0 ? Math.pow(Math.max(0, 1 - depth / bevel), 2) : 0;
      let nx = 0;
      let ny = 0;

      if (length > 0) {
        nx = (outsideX / length) * Math.sign(px);
        ny = (outsideY / length) * Math.sign(py);
      } else if (qx > qy) {
        nx = Math.sign(px);
      } else {
        ny = Math.sign(py);
      }

      // R/G encode horizontal/vertical refraction; the interior stays clear.
      const index = (y * width + x) * 4;
      image.data[index] = Math.round(127.5 - nx * weight * 127.5);
      image.data[index + 1] = Math.round(127.5 - ny * weight * 127.5);
      image.data[index + 2] = 128;
      image.data[index + 3] = 255;
    }
  }

  context.putImageData(image, 0, 0);
  const url = canvas.toDataURL();
  if (displacementMaps.size >= MAX_CACHED_MAPS) {
    displacementMaps.delete(displacementMaps.keys().next().value!);
  }
  displacementMaps.set(key, url);
  return url;
}

export function LiquidGlassSurface({
  variant,
}: {
  variant: "dock" | "button";
}) {
  const id = `liquid-glass-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const surfaceRef = useRef<HTMLSpanElement>(null);
  const filterRef = useRef<SVGFilterElement>(null);
  const imageRef = useRef<SVGFEImageElement>(null);
  const displacementRef = useRef<SVGFEDisplacementMapElement>(null);

  useEffect(() => {
    const surface = surfaceRef.current;
    if (!surface) return;

    const canvas = document.createElement("canvas");
    let frame = 0;
    let previousSize = "";

    function updateMap() {
      frame = 0;
      if (!surface) return;
      const bounds = surface.getBoundingClientRect();
      const width = Math.max(1, Math.round(bounds.width));
      const height = Math.max(1, Math.round(bounds.height));
      const size = `${width}x${height}`;
      if (size === previousSize) return;
      const url = createDisplacementMap(canvas, width, height);
      if (!url) return;
      previousSize = size;

      filterRef.current?.setAttribute("width", String(width));
      filterRef.current?.setAttribute("height", String(height));
      imageRef.current?.setAttribute("width", String(width));
      imageRef.current?.setAttribute("height", String(height));
      imageRef.current?.setAttribute("href", url);
      displacementRef.current?.setAttribute(
        "scale",
        String(Math.min(height * 0.18, 11) * 2),
      );
      surface?.setAttribute("data-ready", "true");
    }

    const observer = new ResizeObserver(() => {
      if (!frame) frame = requestAnimationFrame(updateMap);
    });
    observer.observe(surface);
    updateMap();

    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <span
      ref={surfaceRef}
      aria-hidden="true"
      className={`liquid-glass-surface liquid-glass-surface--${variant}`}
      style={{ "--liquid-glass-filter": `url(#${id})` } as CSSProperties}
    >
      <svg
        width="0"
        height="0"
        className="pointer-events-none absolute"
        focusable="false"
      >
        <defs>
          <filter
            ref={filterRef}
            id={id}
            filterUnits="userSpaceOnUse"
            x="0"
            y="0"
            colorInterpolationFilters="sRGB"
          >
            <feImage ref={imageRef} result="refraction" />
            <feDisplacementMap
              ref={displacementRef}
              in="SourceGraphic"
              in2="refraction"
              xChannelSelector="R"
              yChannelSelector="G"
              scale="0"
            />
          </filter>
        </defs>
      </svg>
    </span>
  );
}
