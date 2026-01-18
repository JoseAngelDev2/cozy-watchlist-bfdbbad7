import { WatchlistCard } from "./WatchlistCard";
import { SearchBar } from "./SearchBar";
import { SearchResults } from "./SearchResults";
import { useWatchlist, WatchlistStatus } from "@/hooks/useWatchlist";
import { useSearchTMDB, TMDBSearchResult } from "@/hooks/useSearchTMDB";
import { Skeleton } from "@/components/ui/skeleton";

export function WatchlistGrid() {
  const {
    watchlist,
    isLoading,
    addToWatchlist,
    updateStatus,
    removeFromWatchlist,
    isInWatchlist,
    isAdding,
  } = useWatchlist();

  const { results, isSearching, hasSearched, search, clearResults } = useSearchTMDB();

  const handleAddToWatchlist = (result: TMDBSearchResult) => {
    addToWatchlist({
      tmdb_id: result.id,
      titulo: result.title,
      tipo: result.media_type,
      poster: result.poster_path,
    });
  };

  const handleUpdateStatus = (id: string, status: WatchlistStatus) => {
    updateStatus({ id, estado: status });
  };

  return (
    <section className="container mx-auto px-4 py-12">
      {/* Search section */}
      <div className="mb-8">
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="text-2xl">🔍</span>
          <h2 className="text-xl md:text-2xl font-display font-semibold text-foreground">
            Buscar y Agregar
          </h2>
        </div>
        <SearchBar onSearch={search} isSearching={isSearching} onClear={clearResults} />

        {/* Search results */}
        <div className="mt-6 max-w-2xl mx-auto">
          <SearchResults
            results={results}
            isSearching={isSearching}
            hasSearched={hasSearched}
            onAdd={handleAddToWatchlist}
            isInWatchlist={isInWatchlist}
            isAdding={isAdding}
          />
        </div>
      </div>

      {/* Watchlist section */}
      <div className="mt-12">
        <div className="flex items-center justify-center gap-3 mb-8">
          <span className="text-2xl">🎬</span>
          <h2 className="text-xl md:text-2xl font-display font-semibold text-foreground">
            Nuestra Lista de Películas y Series
          </h2>
          <span className="text-2xl">🍿</span>
        </div>

        {/* Loading skeleton */}
        {isLoading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="aspect-[2/3] rounded-2xl" />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!isLoading && watchlist.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <span className="text-6xl">📽️</span>
            <p className="text-muted-foreground font-body text-center max-w-md">
              ¡La lista está vacía! Busca películas o series arriba para agregar a tu lista de "Ver Juntos"
            </p>
          </div>
        )}

        {/* Grid */}
        {!isLoading && watchlist.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6">
            {watchlist.map((item) => (
              <WatchlistCard
                key={item.id}
                item={item}
                onUpdateStatus={handleUpdateStatus}
                onDelete={removeFromWatchlist}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
