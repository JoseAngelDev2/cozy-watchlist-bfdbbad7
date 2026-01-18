import { Plus, Check, Film, Tv } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TMDBSearchResult } from "@/hooks/useSearchTMDB";
import { Usuario } from "@/hooks/useIndividualWatchlist";
import { cn } from "@/lib/utils";

interface IndividualSearchResultsProps {
  results: TMDBSearchResult[];
  isSearching: boolean;
  hasSearched: boolean;
  onAdd: (result: TMDBSearchResult) => void;
  isInWatchlist: (tmdbId: number, usuario: Usuario) => boolean;
  selectedUser: Usuario;
  isAdding: boolean;
}

export function IndividualSearchResults({
  results,
  isSearching,
  hasSearched,
  onAdd,
  isInWatchlist,
  selectedUser,
  isAdding,
}: IndividualSearchResultsProps) {
  if (isSearching) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-pulse text-muted-foreground">Buscando...</div>
      </div>
    );
  }

  if (hasSearched && results.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No se encontraron resultados 😅
      </div>
    );
  }

  if (results.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2 max-h-80 overflow-y-auto">
      {results.map((result) => {
        const alreadyAdded = isInWatchlist(result.id, selectedUser);
        
        return (
          <div
            key={result.id}
            className={cn(
              "flex items-center gap-3 p-3 rounded-lg",
              "bg-card/50 border border-border/30",
              "hover:bg-card/80 transition-colors"
            )}
          >
            {result.poster_path ? (
              <img
                src={result.poster_path}
                alt={result.title || result.name}
                className="w-12 h-16 object-cover rounded"
              />
            ) : (
              <div className="w-12 h-16 bg-muted rounded flex items-center justify-center">
                {result.media_type === "movie" ? (
                  <Film className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <Tv className="w-5 h-5 text-muted-foreground" />
                )}
              </div>
            )}
            
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">
                {result.title || result.name}
              </p>
              <p className="text-sm text-muted-foreground">
                {result.media_type === "movie" ? "Película" : "Serie"}
              </p>
            </div>
            
            <Button
              size="sm"
              variant={alreadyAdded ? "secondary" : "default"}
              disabled={alreadyAdded || isAdding}
              onClick={() => onAdd(result)}
              className={cn(
                "shrink-0",
                alreadyAdded && "bg-green-500/20 text-green-400"
              )}
            >
              {alreadyAdded ? (
                <>
                  <Check className="w-4 h-4 mr-1" />
                  Agregado
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
