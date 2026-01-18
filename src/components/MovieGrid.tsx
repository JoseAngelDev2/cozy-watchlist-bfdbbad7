import { MovieCard, type MovieCardProps } from "./MovieCard";

const mockMovies: MovieCardProps[] = [
  {
    title: "Interstellar",
    posterUrl: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    type: "movie",
    status: "pending",
  },
  {
    title: "Up: Una Aventura de Altura",
    posterUrl: "https://image.tmdb.org/t/p/w500/vpbaStTMt8qqXaEgnOR2EE4DNJk.jpg",
    type: "movie",
    status: "pending",
  },
  {
    title: "La La Land",
    posterUrl: "https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg",
    type: "movie",
    status: "watching",
  },
  {
    title: "El Señor de los Anillos: La Comunidad del Anillo",
    posterUrl: "https://image.tmdb.org/t/p/w500/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg",
    type: "movie",
    status: "completed",
  },
  {
    title: "Breaking Bad",
    posterUrl: "https://image.tmdb.org/t/p/w500/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg",
    type: "series",
    status: "pending",
  },
  {
    title: "Stranger Things",
    posterUrl: "https://image.tmdb.org/t/p/w500/uOOtwVbSr4QDjAGIifLDwpb2Pdl.jpg",
    type: "series",
    status: "watching",
  },
  {
    title: "The Mandalorian",
    posterUrl: "https://image.tmdb.org/t/p/w500/eU1i6eHXlzMOlEq0ku1Rzq7Y4wA.jpg",
    type: "series",
    status: "completed",
  },
  {
    title: "Dune",
    posterUrl: "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
    type: "movie",
    status: "pending",
  },
];

export function MovieGrid() {
  return (
    <section className="container mx-auto px-4 py-12">
      {/* Section subtitle */}
      <div className="flex items-center justify-center gap-3 mb-8">
        <span className="text-2xl">🎬</span>
        <h2 className="text-xl md:text-2xl font-display font-semibold text-foreground">
          Nuestra Lista de Películas y Series
        </h2>
        <span className="text-2xl">🍿</span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6">
        {mockMovies.map((movie, index) => (
          <MovieCard key={index} {...movie} />
        ))}
      </div>
    </section>
  );
}
