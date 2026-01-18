import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useCallback } from "react";

export type WatchlistStatus = "pendiente" | "viendo" | "completado";
export type MediaType = "movie" | "tv";
export type DbMediaType = "pelicula" | "serie";
export type Usuario = "karen" | "rafa";

const mapMediaType = (type: MediaType): DbMediaType => {
  return type === "movie" ? "pelicula" : "serie";
};

export interface IndividualWatchlistItem {
  id: string;
  tmdb_id: number;
  titulo: string;
  tipo: string;
  poster: string | null;
  estado: string;
  usuario: Usuario;
  fecha_agregado: string;
  created_at: string;
  updated_at: string;
}

export interface AddToIndividualWatchlistParams {
  tmdb_id: number;
  titulo: string;
  tipo: MediaType;
  poster: string | null;
  usuario: Usuario;
}

export function useIndividualWatchlist(selectedUser?: Usuario) {
  const queryClient = useQueryClient();

  const { data: watchlist = [], isLoading, error } = useQuery({
    queryKey: ["individual-watchlist", selectedUser],
    queryFn: async () => {
      let query = supabase
        .from("watchlist_individual")
        .select("*")
        .order("fecha_agregado", { ascending: false });

      if (selectedUser) {
        query = query.eq("usuario", selectedUser);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as IndividualWatchlistItem[];
    },
  });

  const addMutation = useMutation({
    mutationFn: async (params: AddToIndividualWatchlistParams) => {
      const { data, error } = await supabase
        .from("watchlist_individual")
        .insert({
          tmdb_id: params.tmdb_id,
          titulo: params.titulo,
          tipo: mapMediaType(params.tipo),
          poster: params.poster,
          estado: "pendiente",
          usuario: params.usuario,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["individual-watchlist"] });
      toast.success("¡Agregado a la lista! 🎬");
    },
    onError: (error: any) => {
      console.error("Error adding to individual watchlist:", error);
      if (error.code === "23505") {
        toast.error("Ya está en la lista de este usuario");
      } else {
        toast.error("Error al agregar a la lista");
      }
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, estado }: { id: string; estado: WatchlistStatus }) => {
      const { data, error } = await supabase
        .from("watchlist_individual")
        .update({ estado })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["individual-watchlist"] });
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
        .from("watchlist_individual")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["individual-watchlist"] });
      toast.success("Eliminado de la lista 🗑️");
    },
    onError: (error) => {
      console.error("Error deleting from individual watchlist:", error);
      toast.error("Error al eliminar de la lista");
    },
  });

  const isInWatchlist = useCallback((tmdbId: number, usuario: Usuario) => {
    return watchlist.some((item) => item.tmdb_id === tmdbId && item.usuario === usuario);
  }, [watchlist]);

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
