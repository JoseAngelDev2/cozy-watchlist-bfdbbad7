import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { IndividualSearchResults } from "@/components/IndividualSearchResults";
import { IndividualWatchlistCard } from "@/components/IndividualWatchlistCard";
import { UserSelector } from "@/components/UserSelector";
import { useIndividualWatchlist, Usuario } from "@/hooks/useIndividualWatchlist";
import { useSearchTMDB } from "@/hooks/useSearchTMDB";
import { Loader2 } from "lucide-react";

export function IndividualWatchlistGrid() {
  const [selectedUser, setSelectedUser] = useState<Usuario>("karen");
  const { 
    watchlist, 
    isLoading, 
    addToWatchlist, 
    updateStatus, 
    removeFromWatchlist,
    isInWatchlist,
    isAdding 
  } = useIndividualWatchlist(selectedUser);
  
  const { results, isSearching, hasSearched, search, clearResults } = useSearchTMDB();

  const handleAddToWatchlist = (result: any) => {
    addToWatchlist({
      tmdb_id: result.id,
      titulo: result.title || result.name,
      tipo: result.media_type,
      poster: result.poster_path,
      usuario: selectedUser,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <UserSelector selectedUser={selectedUser} onSelectUser={setSelectedUser} />
      </div>

      <SearchBar 
        onSearch={search} 
        onClear={clearResults} 
        isSearching={isSearching} 
      />

      <IndividualSearchResults
        results={results}
        isSearching={isSearching}
        hasSearched={hasSearched}
        onAdd={handleAddToWatchlist}
        isInWatchlist={isInWatchlist}
        selectedUser={selectedUser}
        isAdding={isAdding}
      />

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : watchlist.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-2xl mb-2">📺</p>
          <p className="text-muted-foreground">
            {selectedUser === "karen" ? "Karen" : "Rafa"} no tiene nada en su lista aún
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            ¡Busca algo para agregar! 🔍
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {watchlist.map((item) => (
            <IndividualWatchlistCard
              key={item.id}
              item={item}
              onUpdateStatus={(id, status) => updateStatus({ id, estado: status })}
              onDelete={removeFromWatchlist}
            />
          ))}
        </div>
      )}
    </div>
  );
}
