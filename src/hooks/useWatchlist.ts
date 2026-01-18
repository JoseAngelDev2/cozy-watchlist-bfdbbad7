import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export type WatchlistStatus = "pendiente" | "viendo" | "completado";
export type MediaType = "movie" | "tv";

export interface WatchlistItem {
  id: string;
  tmdb_id: number;
  titulo: string;
  tipo: string;
  poster: string | null;
  estado: string;
  fecha_agregado: string;
  created_at: string;
  updated_at: string;
}

export interface AddToWatchlistParams {
  tmdb_id: number;
  titulo: string;
  tipo: MediaType;
  poster: string | null;
}

export function useWatchlist() {
  const queryClient = useQueryClient();

  const { data: watchlist = [], isLoading, error } = useQuery({
    queryKey: ["watchlist"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("watchlist_juntos")
        .select("*")
        .order("fecha_agregado", { ascending: false });

      if (error) throw error;
      return data as WatchlistItem[];
    },
  });

  const addMutation = useMutation({
    mutationFn: async (params: AddToWatchlistParams) => {
      const { data, error } = await supabase
        .from("watchlist_juntos")
        .insert({
          tmdb_id: params.tmdb_id,
          titulo: params.titulo,
          tipo: params.tipo,
          poster: params.poster,
          estado: "pendiente",
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["watchlist"] });
      toast.success("¡Agregado a la lista! 🎬");
    },
    onError: (error) => {
      console.error("Error adding to watchlist:", error);
      toast.error("Error al agregar a la lista");
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, estado }: { id: string; estado: WatchlistStatus }) => {
      const { data, error } = await supabase
        .from("watchlist_juntos")
        .update({ estado })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["watchlist"] });
      toast.success("Estado actualizado ✨");
    },
    onError: (error) => {
      console.error("Error updating status:", error);
      toast.error("Error al actualizar el estado");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("watchlist_juntos")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["watchlist"] });
      toast.success("Eliminado de la lista 🗑️");
    },
    onError: (error) => {
      console.error("Error deleting from watchlist:", error);
      toast.error("Error al eliminar de la lista");
    },
  });

  const isInWatchlist = (tmdbId: number) => {
    return watchlist.some((item) => item.tmdb_id === tmdbId);
  };

  return {
    watchlist,
    isLoading,
    error,
    addToWatchlist: addMutation.mutate,
    updateStatus: updateStatusMutation.mutate,
    removeFromWatchlist: deleteMutation.mutate,
    isInWatchlist,
    isAdding: addMutation.isPending,
    isUpdating: updateStatusMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}
