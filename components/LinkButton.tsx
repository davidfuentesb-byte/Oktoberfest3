// components/LinkButton.tsx
import React from "react";
import Link from "next/link";

type Href =
  | string
  | {
      pathname: string;
      hash?: string;
      query?: Record<string, string>;
    };

type Props = React.PropsWithChildren<{
  href: Href;
  target?: "_blank" | "_self";
  rel?: string;
  variant?: "brand" | "outline";
  /** Si true, fuerza usar <a> en vez de <Link> (útil para anchors) */
  asExternal?: boolean;
  className?: string;
}>;

export default function LinkButton({
  href,
  target,
  rel,
  variant = "brand",
  asExternal = false,
  className,
  children,
}: Props) {
  const base = variant === "brand" ? "btn-brand" : "btn-ghost";
  const cls = `${base} ${className ?? ""}`;

  // Si es string con hash (/#algo), conviene usar <a> para hacer scroll directo al id
  const isHashString = typeof href === "string" && href.includes("#");
  const shouldUseAnchor = asExternal || isHashString;

  if (shouldUseAnchor) {
    const hrefStr = typeof href === "string" ? href : `${href.pathname}${href.hash ? `#${href.hash}` : ""}`;
    return (
      <a href={hrefStr} target={target} rel={rel} className={cls}>
        {children}
      </a>
    );
  }

  // Para rutas internas normales, usamos <Link>
  return (
    <Link href={href as any} className={cls}>
      {children}
    </Link>
  );
}
