// components/MediaCard.tsx
import React from "react";

type Props = {
  title: string;
  desc?: string;
  image?: string;
  meta?: string; // día/hora o tags
  href?: string;
};

export default function MediaCard({ title, desc, image, meta, href }: Props) {
  const Wrapper = ({ children }: { children: React.ReactNode }) =>
    href ? (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="block hover:shadow transition focus:outline-none focus:ring-2 focus:ring-amber-400 rounded-xl"
      >
        {children}
      </a>
    ) : (
      <>{children}</>
    );

  return (
    <div className="card overflow-hidden p-0 h-full">
      {image && (
        <div className="aspect-[4/3] w-full bg-gray-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="p-4">
        <Wrapper>
          <div>
            <h3 className="font-semibold leading-snug">{title}</h3>
            {meta && <div className="text-xs text-gray-500 mt-1">{meta}</div>}
            {desc && <p className="text-gray-700 mt-2 text-sm">{desc}</p>}
          </div>
        </Wrapper>
      </div>
    </div>
  );
}
