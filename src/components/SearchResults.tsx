import { Plus, Check, Film, Tv } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TMDBSearchResult } from "@/hooks/useSearchTMDB";
import { cn } from "@/lib/utils";

interface SearchResultsProps {
  results: TMDBSearchResult[];
  isSearching: boolean;
  hasSearched: boolean;
  onAdd: (result: TMDBSearchResult) => void;
  isInWatchlist: (tmdbId: number) => boolean;
  isAdding: boolean;
}

export function SearchResults({
  results,
  isSearching,
  hasSearched,
  onAdd,
  isInWatchlist,
  isAdding,
}: SearchResultsProps) {
  if (isSearching) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-4">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
        <p className="text-muted-foreground font-body">Buscando...</p>
      </div>
    );
  }

  if (hasSearched && results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-2">
        <span className="text-4xl">🔍</span>
        <p className="text-muted-foreground font-body">No se encontraron resultados</p>
      </div>
    );
  }

  if (results.length === 0) {
    return null;
  }

  return (
    <div className="grid gap-3 max-h-[400px] overflow-y-auto pr-2">
      {results.map((result) => {
        const inList = isInWatchlist(result.id);
        return (
          <div
            key={result.id}
            className={cn(
              "flex items-center gap-4 p-3 rounded-xl",
              "bg-card border-2 border-border/30",
              "hover:border-primary/30 hover:shadow-soft",
              "transition-all duration-200"
            )}
          >
            {/* Poster thumbnail */}
            <div className="flex-shrink-0 w-14 h-20 rounded-lg overflow-hidden bg-muted">
              {result.poster_path ? (
                <img
                  src={result.poster_path}
                  alt={result.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  {result.media_type === "movie" ? (
                    <Film className="w-6 h-6 text-muted-foreground" />
                  ) : (
                    <Tv className="w-6 h-6 text-muted-foreground" />
                  )}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h4 className="font-display font-semibold text-foreground truncate">
                {result.title}
              </h4>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  {result.media_type === "movie" ? (
                    <>
                      <Film className="w-3 h-3" />
                      Película
                    </>
                  ) : (
                    <>
                      <Tv className="w-3 h-3" />
                      Serie
                    </>
                  )}
                </span>
                {result.release_date && (
                  <>
                    <span>•</span>
                    <span>{result.release_date.split("-")[0]}</span>
                  </>
                )}
                {result.vote_average > 0 && (
                  <>
                    <span>•</span>
                    <span>⭐ {result.vote_average.toFixed(1)}</span>
                  </>
                )}
              </div>
            </div>

            {/* Add button */}
            <Button
              size="sm"
              variant={inList ? "secondary" : "default"}
              disabled={inList || isAdding}
              onClick={() => onAdd(result)}
              className={cn(
                "flex-shrink-0 rounded-full",
                inList && "bg-status-completed-bg text-status-completed"
              )}
            >
              {inList ? (
                <>
                  <Check className="w-4 h-4 mr-1" />
                  En lista
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-1" />
                  Agregar
                </>
              )}
            </Button>
          </div>
        );
      })}
    </div>
  );
}
