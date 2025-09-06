// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="w-full border-t mt-12">
      <div className="container-default py-6 text-sm text-gray-600 flex flex-col gap-2">
        <div>© {new Date().getFullYear()} Cervecería Los Porteños — Oktoberfest Puyuhuapi</div>
        <div className="flex gap-4">
          <a href="https://www.instagram.com" target="_blank" rel="noreferrer" className="link">Instagram</a>
          <a href="https://www.facebook.com" target="_blank" rel="noreferrer" className="link">Facebook</a>
        </div>
      </div>
    </footer>
  );
}
