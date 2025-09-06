// components/Carousel.tsx
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type PerView = { base: number; md?: number; lg?: number };

type CarouselProps = {
  children: React.ReactNode[];
  perView?: PerView;
  /** pausa entre tarjetas (ms) */
  perCardMs?: number;        // default 2200
  /** pausa al final antes de reiniciar (ms) */
  pauseEndMs?: number;       // default 2500
  /** pausa al hover */
  pauseOnHover?: boolean;    // default true
  /** pausa tras interacción del usuario (ms) */
  pauseAfterUserMs?: number; // default 2500
  /** espera inicial para evitar rebote (ms) */
  initialDelayMs?: number;   // default 800
  /** autoplay solo cuando el carrusel es visible (≥ threshold) */
  onlyAutoplayWhenInView?: boolean; // default true
  /** porcentaje visible requerido (0..1) */
  viewThreshold?: number;    // default 0.6
  ariaLabel?: string;
};

export default function Carousel({
  children,
  perView = { base: 1, md: 2, lg: 3 },
  perCardMs = 6000,
  pauseEndMs = 1500,
  pauseOnHover = true,
  pauseAfterUserMs = 1500,
  initialDelayMs = 1000,
  onlyAutoplayWhenInView = true,
  viewThreshold = 0.6,
  ariaLabel,
}: CarouselProps) {
  const GAP_PX = 16; // coincide con gap-4
  const trackRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [isHover, setIsHover] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(perView.base);
  const [lastUserInteractAt, setLastUserInteractAt] = useState<number>(Date.now());
  const [isInView, setIsInView] = useState(true); // se ajustará con IO
  const [stableLayout, setStableLayout] = useState(false);

  const startedRef = useRef(false);          // evita autoplay antes de estar estable
  const animatingRef = useRef(false);        // evita órdenes mientras anima
  const lastResetRef = useRef(0);            // deboucea el reset al final
  const resizeTimerRef = useRef<number | null>(null);

  // IntersectionObserver: solo auto-play si el carrusel está ≥ viewThreshold visible y la pestaña visible
  useEffect(() => {
    if (!onlyAutoplayWhenInView) return;
    const node = wrapperRef.current;
    if (!node) return;

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsInView(entry.intersectionRatio >= viewThreshold);
      },
      { threshold: [0, viewThreshold, 1] }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [onlyAutoplayWhenInView, viewThreshold]);

  // También pausa si la pestaña está oculta
  const docVisible = typeof document !== "undefined" ? document.visibilityState === "visible" : true;

  // medir ancho del wrapper con debounce para evitar “rebote”
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const ro = new ResizeObserver((entries) => {
      const w = Math.floor(entries[0].contentRect.width);
      // debounce 120ms y descarta cambios minúsculos (<1px)
      if (resizeTimerRef.current) window.clearTimeout(resizeTimerRef.current);
      resizeTimerRef.current = window.setTimeout(() => {
        if (Math.abs(w - containerWidth) >= 1) {
          setContainerWidth(w);
          // al cambiar tamaño, consideramos el layout inestable por un momento
          setStableLayout(false);
        }
      }, 120);
    });

    ro.observe(el);
    setContainerWidth(el.clientWidth);
    return () => {
      ro.disconnect();
      if (resizeTimerRef.current) window.clearTimeout(resizeTimerRef.current);
    };
  }, [containerWidth]);

  // breakpoints → cuántas tarjetas visibles
  useEffect(() => {
    function computePerView() {
      const w = window.innerWidth;
      if (w >= 1024 && perView.lg) return setCardsPerView(perView.lg);
      if (w >= 768 && perView.md) return setCardsPerView(perView.md);
      setCardsPerView(perView.base);
    }
    computePerView();
    window.addEventListener("resize", computePerView);
    return () => window.removeEventListener("resize", computePerView);
  }, [perView.base, perView.md, perView.lg]);

  // ancho por tarjeta para que entren perView (con gaps)
  const cardWidthPx = useMemo(() => {
    if (!containerWidth || !cardsPerView) return 320;
    const totalGaps = GAP_PX * (cardsPerView - 1);
    const usable = containerWidth - totalGaps;
    return Math.max(240, Math.floor(usable / cardsPerView));
  }, [containerWidth, cardsPerView]);

  const stepPx = cardWidthPx + GAP_PX;
  const total = children.length;

  // espera inicial/tras resize para evitar rebotes antes del primer autoplay
  useEffect(() => {
    startedRef.current = false;
    const id = window.setTimeout(() => {
      startedRef.current = true;
      setStableLayout(true);
    }, initialDelayMs);
    return () => window.clearTimeout(id);
  }, [containerWidth, cardsPerView, initialDelayMs]);

  function currentIndex(): number {
    const el = trackRef.current;
    if (!el) return 0;
    return Math.floor((el.scrollLeft + 1) / stepPx);
  }

  function scrollToIndex(idx: number, behavior: ScrollBehavior = "smooth") {
    const el = trackRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(idx, Math.max(0, total - 1)));
    animatingRef.current = behavior !== "auto";
    el.scrollTo({ left: clamped * stepPx, behavior });
    if (behavior !== "auto") {
      const animMs = 380;
      window.setTimeout(() => {
        animatingRef.current = false;
      }, animMs);
    }
  }

  function stepForward() {
    if (!startedRef.current || animatingRef.current) return;
    const idx = currentIndex();
    const lastVisibleStart = Math.max(0, total - cardsPerView);
    const atLast = idx >= lastVisibleStart;
    if (atLast) {
      const now = Date.now();
      if (now - lastResetRef.current < pauseEndMs - 50) return; // ya programado
      lastResetRef.current = now;
      window.setTimeout(() => {
        scrollToIndex(0, "auto"); // reinicia sin animación
      }, pauseEndMs);
    } else {
      scrollToIndex(idx + 1, "smooth");
    }
  }

  // autoplay: avanza UNA tarjeta cada perCardMs, solo si está en vista + layout estable + pestaña visible
  useEffect(() => {
    if (perCardMs < 400) return;
    const tick = () => {
      const now = Date.now();
      if (!startedRef.current || !stableLayout) return;
      if (animatingRef.current) return;
      if (now - lastUserInteractAt < pauseAfterUserMs) return;
      if (pauseOnHover && isHover) return;
      if (onlyAutoplayWhenInView && !isInView) return;
      if (!docVisible) return;
      stepForward();
    };
    const id = window.setInterval(tick, perCardMs);
    return () => window.clearInterval(id);
  }, [
    perCardMs,
    pauseAfterUserMs,
    lastUserInteractAt,
    pauseOnHover,
    isHover,
    stepPx,
    cardsPerView,
    total,
    pauseEndMs,
    isInView,
    onlyAutoplayWhenInView,
    stableLayout,
    docVisible,
  ]);

  // marcar interacción para pausar
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const mark = () => setLastUserInteractAt(Date.now());
    el.addEventListener("pointerdown", mark, { passive: true });
    el.addEventListener("wheel", mark, { passive: true });
    el.addEventListener("touchstart", mark, { passive: true });
    el.addEventListener("keydown", mark, { passive: true });
    return () => {
      el.removeEventListener("pointerdown", mark);
      el.removeEventListener("wheel", mark);
      el.removeEventListener("touchstart", mark);
      el.removeEventListener("keydown", mark);
    };
  }, []);

  // si por scroll manual llegas al final, pausa y reinicia una vez
  function handleScrollNormalize() {
    if (!startedRef.current || animatingRef.current) return;
    const el = trackRef.current;
    if (!el) return;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 2;
    if (atEnd) {
      const now = Date.now();
      if (now - lastResetRef.current < pauseEndMs - 50) return;
      lastResetRef.current = now;
      window.setTimeout(() => {
        scrollToIndex(0, "auto");
      }, pauseEndMs);
    }
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      ref={wrapperRef}
    >
      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto scroll-smooth pb-2"
        style={{ scrollbarWidth: "none" }}
        onScroll={handleScrollNormalize}
        aria-label={ariaLabel}
      >
        <style jsx>{`div::-webkit-scrollbar { display: none; }`}</style>
        {children.map((child, idx) => (
          <div key={idx} className="shrink-0" style={{ width: `${cardWidthPx}px` }}>
            {child}
          </div>
        ))}
      </div>

      {/* Controles */}
      <button
        type="button"
        aria-label="Anterior"
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white border rounded-full w-9 h-9 flex items-center justify-center shadow"
        onClick={() => {
          setLastUserInteractAt(Date.now());
          const idx = currentIndex();
          scrollToIndex(Math.max(0, idx - 1));
        }}
      >
        ‹
      </button>
      <button
        type="button"
        aria-label="Siguiente"
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white border rounded-full w-9 h-9 flex items-center justify-center shadow"
        onClick={() => {
          setLastUserInteractAt(Date.now());
          scrollToIndex(currentIndex() + 1);
        }}
      >
        ›
      </button>
    </div>
  );
}
