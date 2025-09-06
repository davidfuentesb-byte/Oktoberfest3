// components/Header.tsx
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full border-b bg-white/70 backdrop-blur">
      <div className="container-default py-3 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg">
          Oktoberfest Puyuhuapi
        </Link>

        <nav className="hidden md:flex gap-5 text-sm">
          <Link href="/evento" className="hover:underline">Evento</Link>
          <Link href="/blog" className="hover:underline">Blog</Link>
          <Link href="/entradas" className="hover:underline">Entradas</Link>
          <a href="/#contacto" className="hover:underline">Contacto</a>
        </nav>

        <a href="/entradas" className="btn-brand hidden md:inline-block">Comprar</a>

        {/* Menú móvil (placeholder simple) */}
        <button className="md:hidden text-sm text-gray-600" aria-label="Abrir menú">☰</button>
      </div>
    </header>
  );
}
