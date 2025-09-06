// components/DirectionsButtons.tsx
"use client";

type Props = {
  lat: number;
  lng: number;
  placeName?: string;
  className?: string;
};

export default function DirectionsButtons({ lat, lng, placeName, className }: Props) {
  const q = encodeURIComponent(placeName ?? `Destino`);
  const googleMaps = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`;
  const waze = `https://waze.com/ul?ll=${lat},${lng}&navigate=yes&zoom=17`;

  return (
    <div className={`flex flex-wrap gap-3 ${className ?? ""}`}>
      <a
        className="btn-brand"
        href={googleMaps}
        target="_blank"
        rel="noreferrer"
        aria-label={`Cómo llegar en Google Maps a ${q}`}
      >
        Cómo llegar (Google Maps)
      </a>
      <a
        className="btn-outline"
        href={waze}
        target="_blank"
        rel="noreferrer"
        aria-label={`Cómo llegar en Waze a ${q}`}
      >
        Cómo llegar (Waze)
      </a>
    </div>
  );
}
