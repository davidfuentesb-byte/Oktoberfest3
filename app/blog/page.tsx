// app/blog/page.tsx
import { getAllPosts } from "@/lib/posts";
import BlogCard from "@/components/BlogCard";
import FeaturedPostCard from "@/components/FeaturedPostCard";

export const metadata = {
  title: "Blog — Oktoberfest Puyuhuapi 2025",
  description: "Noticias y novedades del festival. Artículos con fotos, ordenados por fecha.",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const featured = posts.filter((p) => p.featured);
  const regular = posts.filter((p) => !p.featured);

  return (
    <section className="section">
      <div className="container-default">
        <h1 className="text-3xl md:text-4xl font-extrabold">Blog</h1>
        <p className="text-gray-700 mt-2">
          Novedades, anuncios y backstage del Oktoberfest Puyuhuapi 2025.
        </p>

        {/* DESTACADOS (arriba, mismas dimensiones que el listado) */}
        {featured.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-3">Destacados</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((p) => (
                <FeaturedPostCard
                  key={p.slug}
                  slug={p.slug}
                  title={p.title}
                  date={p.date}
                  excerpt={p.excerpt}
                  cover={p.cover}
                />
              ))}
            </div>
          </div>
        )}

        {/* LISTADO NORMAL */}
        {regular.length === 0 ? (
          <p className="mt-8 text-gray-600">Aún no hay artículos publicados.</p>
        ) : (
          <div className="mt-10">
            <h2 className="text-xl font-bold mb-3">Todos los artículos</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {regular.map((p) => (
                <BlogCard
                  key={p.slug}
                  slug={p.slug}
                  title={p.title}
                  date={p.date}
                  excerpt={p.excerpt}
                  cover={p.cover}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
