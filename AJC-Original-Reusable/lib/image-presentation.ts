import type { CSSProperties } from "react";
import type { ImagePosition } from "@/types/site";

export const defaultImagePosition: Required<ImagePosition> = {
  x: 50,
  y: 50,
  zoom: 1
};

export function normalizeImagePosition(position?: ImagePosition): Required<ImagePosition> {
  return {
    x: clamp(position?.x ?? defaultImagePosition.x, 0, 100),
    y: clamp(position?.y ?? defaultImagePosition.y, 0, 100),
    zoom: clamp(position?.zoom ?? defaultImagePosition.zoom, 1, 3)
  };
}

export function getObjectPosition(position?: ImagePosition, fallback = "50% 50%") {
  return position ? `${normalizeImagePosition(position).x}% ${normalizeImagePosition(position).y}%` : fallback;
}

export function getZoomStyle(position?: ImagePosition): CSSProperties {
  const normalized = normalizeImagePosition(position);
  const transformOrigin = `${normalized.x}% ${normalized.y}%`;
  return {
    transform: `scale(${normalized.zoom})`,
    transformOrigin
  };
}

export function getImagePresentationStyle(position?: ImagePosition, fallback = "50% 50%"): CSSProperties {
  return {
    objectPosition: getObjectPosition(position, fallback),
    ...getZoomStyle(position)
  };
}

function clamp(value: number, minimum: number, maximum: number) {
  return Math.max(minimum, Math.min(maximum, value));
}
