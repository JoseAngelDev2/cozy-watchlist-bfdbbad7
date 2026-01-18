import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface TMDBSearchResult {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  media_type: "movie" | "tv";
  release_date: string;
  vote_average: number;
  popularity: number;
}

export interface SearchResponse {
  results: TMDBSearchResult[];
  page: number;
  total_pages: number;
  total_results: number;
}

export function useSearchTMDB() {
  const [results, setResults] = useState<TMDBSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const search = useCallback(async (query: string, type: "multi" | "movie" | "tv" = "multi") => {
    if (!query.trim()) {
      setResults([]);
      setHasSearched(false);
      return;
    }

    setIsSearching(true);
    setHasSearched(true);

    try {
      const { data, error } = await supabase.functions.invoke("search-tmdb", {
        body: { query, type },
      });

      if (error) throw error;

      setResults(data.results || []);
    } catch (error) {
      console.error("Search error:", error);
      toast.error("Error al buscar. Intenta de nuevo.");
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  const clearResults = useCallback(() => {
    setResults([]);
    setHasSearched(false);
  }, []);

  return {
    results,
    isSearching,
    hasSearched,
    search,
    clearResults,
  };
}
