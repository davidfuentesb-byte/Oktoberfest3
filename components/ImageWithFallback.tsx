// components/ImageWithFallback.tsx
"use client";

import React from "react";

type Props = {
  src?: string;
  alt: string;
  className?: string;
  placeholderSrc?: string; // default: /img/placeholder.png
};

export default function ImageWithFallback({
  src,
  alt,
  className,
  placeholderSrc = "/img/placeholder.png",
}: Props) {
  const [currentSrc, setCurrentSrc] = React.useState(
    src && src.trim() ? src : placeholderSrc
  );

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={currentSrc}
      alt={currentSrc === placeholderSrc ? "Imagen no disponible" : alt}
      className={className}
      onError={() => {
        if (currentSrc !== placeholderSrc) setCurrentSrc(placeholderSrc);
      }}
    />
  );
}
