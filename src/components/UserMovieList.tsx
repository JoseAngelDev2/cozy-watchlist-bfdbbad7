import { UserAvatar } from "./UserAvatar";
import { MovieCard, MovieCardProps } from "./MovieCard";

interface UserMovieListProps {
  userName: string;
  avatarUrl: string;
  movies: MovieCardProps[];
}

export function UserMovieList({ userName, avatarUrl, movies }: UserMovieListProps) {
  return (
    <div className="bg-card/50 rounded-3xl p-6 border-2 border-border/30 shadow-card">
      {/* User header */}
      <div className="flex flex-col items-center mb-6">
        <UserAvatar name={userName} avatarUrl={avatarUrl} />
        <div className="mt-4 w-full max-w-xs">
          <div className="h-1 bg-gradient-to-r from-transparent via-wood to-transparent rounded-full" />
        </div>
      </div>

      {/* Movies grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {movies.map((movie, index) => (
          <MovieCard
            key={index}
            {...movie}
            showHeart={true}
          />
        ))}
      </div>
    </div>
  );
}
