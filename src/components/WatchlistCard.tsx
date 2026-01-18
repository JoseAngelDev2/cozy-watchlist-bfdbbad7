import { useState } from "react";
import { Heart, Popcorn, Trash2, ChevronDown } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import { TypeBadge } from "./TypeBadge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { WatchlistItem, WatchlistStatus } from "@/hooks/useWatchlist";

interface WatchlistCardProps {
  item: WatchlistItem;
  onUpdateStatus: (id: string, status: WatchlistStatus) => void;
  onDelete: (id: string) => void;
}

const statusLabels: Record<string, string> = {
  pendiente: "Pendiente",
  viendo: "Viendo juntos",
  completado: "Completado",
};

const statusOptions: { value: WatchlistStatus; label: string; icon: string }[] = [
  { value: "pendiente", label: "Pendiente", icon: "○" },
  { value: "viendo", label: "Viendo juntos", icon: "▶" },
  { value: "completado", label: "Completado", icon: "✓" },
];

export function WatchlistCard({ item, onUpdateStatus, onDelete }: WatchlistCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const status = item.estado as WatchlistStatus;
  const type = item.tipo === "movie" ? "movie" : "series";

  // Map DB status to component status
  const componentStatus = status === "viendo" ? "watching" : status === "completado" ? "completed" : "pending";

  return (
    <>
      <div
        className={cn(
          "group relative bg-card rounded-2xl overflow-hidden shadow-card card-hover",
          "border-2 border-border/50"
        )}
      >
        {/* Poster Container */}
        <div className="relative aspect-[2/3] overflow-hidden">
          {item.poster ? (
            <img
              src={item.poster}
              alt={item.titulo}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <span className="text-4xl">🎬</span>
            </div>
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent" />

          {/* Heart/Popcorn icon */}
          <div className="absolute top-3 right-3">
            {status === "viendo" ? (
              <Popcorn className="w-6 h-6 text-popcorn drop-shadow-lg animate-float" />
            ) : (
              <Heart
                className={cn(
                  "w-6 h-6 drop-shadow-lg transition-all duration-300",
                  status === "completado"
                    ? "text-heart fill-heart animate-pulse-heart"
                    : "text-cloud/80 group-hover:text-heart group-hover:scale-110"
                )}
              />
            )}
          </div>

          {/* Type badge */}
          <div className="absolute top-3 left-3">
            <TypeBadge type={type} />
          </div>

          {/* Delete button (hover) */}
          <Button
            variant="destructive"
            size="icon"
            onClick={() => setShowDeleteDialog(true)}
            className={cn(
              "absolute top-12 right-3 h-8 w-8 rounded-full",
              "opacity-0 group-hover:opacity-100",
              "transition-opacity duration-200"
            )}
          >
            <Trash2 className="w-4 h-4" />
          </Button>

          {/* Title and status at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="font-display text-lg font-bold text-cloud mb-2 drop-shadow-md line-clamp-2">
              {item.titulo}
            </h3>

            {/* Status dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity">
                  <StatusBadge status={componentStatus} label={statusLabels[status] || "Pendiente"} />
                  <ChevronDown className="w-4 h-4 text-cloud/80" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                {statusOptions.map((option) => (
                  <DropdownMenuItem
                    key={option.value}
                    onClick={() => onUpdateStatus(item.id, option.value)}
                    className={cn(
                      "flex items-center gap-2 cursor-pointer",
                      status === option.value && "bg-muted"
                    )}
                  >
                    <span>{option.icon}</span>
                    <span>{option.label}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Delete confirmation dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar de la lista?</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Estás seguro de que quieres eliminar "{item.titulo}" de la lista? Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => onDelete(item.id)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
