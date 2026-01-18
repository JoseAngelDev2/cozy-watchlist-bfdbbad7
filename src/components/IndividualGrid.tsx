import { UserMovieList } from "./UserMovieList";
import type { MovieCardProps } from "./MovieCard";

// Mock data for Lucy
const lucyMovies: MovieCardProps[] = [
  {
    title: "Dark",
    posterUrl: "https://image.tmdb.org/t/p/w500/apbrbWs8M9lyOpJYU5WXrpFbk1Z.jpg",
    type: "series",
    status: "watching",
  },
  {
    title: "Aladdin",
    posterUrl: "https://image.tmdb.org/t/p/w500/3iYQTLGoy7QnjcUYRJy4YrAgGvp.jpg",
    type: "movie",
    status: "completed",
  },
  {
    title: "Bridgerton",
    posterUrl: "https://image.tmdb.org/t/p/w500/luoKpgVwi1E5nQsi7W0UuKHu2Rq.jpg",
    type: "series",
    status: "pending",
  },
];

// Mock data for Charlie
const charlieMovies: MovieCardProps[] = [
  {
    title: "Breaking Bad",
    posterUrl: "https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
    type: "series",
    status: "watching",
  },
  {
    title: "Dune",
    posterUrl: "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
    type: "movie",
    status: "pending",
  },
  {
    title: "The Mandalorian",
    posterUrl: "https://image.tmdb.org/t/p/w500/sWgBv7LV2PRoQgkxwlibdGXKz1S.jpg",
    type: "series",
    status: "completed",
  },
];

export function IndividualGrid() {
  return (
    <section className="py-8 px-4">
      <div className="container mx-auto">
        {/* Section subtitle */}
        <div className="text-center mb-8">
          <p className="font-body text-muted-foreground flex items-center justify-center gap-2">
            <span>🎬</span>
            Cada uno con sus favoritos
            <span>🎬</span>
          </p>
        </div>

        {/* Two columns layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Lucy's list */}
          <UserMovieList
            userName="Lucy"
            avatarUrl="https://api.dicebear.com/7.x/adventurer/svg?seed=Lucy&backgroundColor=ffd5dc"
            movies={lucyMovies}
          />

          {/* Charlie's list */}
          <UserMovieList
            userName="Charlie"
            avatarUrl="https://api.dicebear.com/7.x/adventurer/svg?seed=Charlie&backgroundColor=c9e4ff"
            movies={charlieMovies}
          />
        </div>
      </div>
    </section>
  );
}
