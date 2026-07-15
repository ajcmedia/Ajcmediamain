import Image from "next/image";

const portraitImages = new Set([
  "/assets/gallery/wedding-waterfront.png",
  "/assets/gallery/baby-shower.png",
  "/assets/gallery/neon-portrait.png",
  "/assets/gallery/corporate-branding.png",
  "/assets/gallery/baptism-church.png",
  "/assets/gallery/coastal-maternity.png"
]);

const focalPoints: Record<string, string> = {
  "/assets/gallery/birthday-candles.png": "50% 46%",
  "/assets/gallery/family-park.png": "52% 43%",
  "/assets/gallery/rain-engagement.png": "39% 44%",
  "/assets/gallery/reception-dance.png": "51% 45%",
  "/assets/gallery/commercial-cafe.png": "42% 45%",
  "/assets/gallery/studio-family.png": "54% 43%",
  "/assets/gallery/graduation-family.png": "54% 43%",
  "/assets/gallery/forest-engagement.png": "52% 48%",
  "/assets/gallery/wedding-details.png": "53% 50%"
};

type FramedImageProps = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
  draggable?: boolean;
  fit?: "auto" | "cover" | "contain";
};

export function FramedImage({
  src,
  alt,
  sizes,
  className = "",
  priority = false,
  draggable,
  fit = "auto"
}: FramedImageProps) {
  const showFullImage = fit === "contain" || (fit === "auto" && portraitImages.has(src));
  const objectPosition = focalPoints[src] ?? "50% 50%";

  return (
    <>
      {showFullImage ? (
        <>
          <Image
            className="scale-110 object-cover opacity-45 blur-xl saturate-75"
            src={src}
            alt=""
            aria-hidden="true"
            fill
            sizes={sizes}
            style={{ objectPosition }}
          />
          <div className="absolute inset-0 bg-black/20" aria-hidden="true" />
        </>
      ) : null}
      <Image
        className={`h-full w-full ${showFullImage ? "object-contain" : "object-cover"} ${className}`}
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        draggable={draggable}
        style={{ objectPosition }}
      />
    </>
  );
}
