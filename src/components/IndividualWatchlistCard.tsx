import { useState } from "react";
import { MoreVertical, Trash2, Heart, Popcorn, Clock } from "lucide-react";
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
import { StatusBadge } from "@/components/StatusBadge";
import { TypeBadge } from "@/components/TypeBadge";
import { IndividualWatchlistItem, WatchlistStatus } from "@/hooks/useIndividualWatchlist";
import { cn } from "@/lib/utils";

interface IndividualWatchlistCardProps {
  item: IndividualWatchlistItem;
  onUpdateStatus: (id: string, status: WatchlistStatus) => void;
  onDelete: (id: string) => void;
}

const statusOptions: { value: WatchlistStatus; label: string; icon: React.ReactNode }[] = [
  { value: "pendiente", label: "Pendiente", icon: <Clock className="w-4 h-4" /> },
  { value: "viendo", label: "Viendo", icon: <Popcorn className="w-4 h-4" /> },
  { value: "completado", label: "Completado", icon: <Heart className="w-4 h-4" /> },
];

export function IndividualWatchlistCard({ item, onUpdateStatus, onDelete }: IndividualWatchlistCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const getStatusIcon = () => {
    switch (item.estado) {
      case "completado":
        return <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />;
      case "viendo":
        return <Popcorn className="w-5 h-5 text-yellow-500" />;
      default:
        return null;
    }
  };

  return (
    <>
      <div
        className={cn(
          "group relative overflow-hidden rounded-xl",
          "bg-gradient-to-br from-card to-card/50",
          "border border-border/50 hover:border-primary/50",
          "transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
        )}
      >
        <div className="aspect-[2/3] relative overflow-hidden">
          {item.poster ? (
            <img
              src={item.poster}
              alt={item.titulo}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
              <span className="text-4xl">🎬</span>
            </div>
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          <div className="absolute top-2 right-2 flex items-center gap-1">
            {getStatusIcon()}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 bg-black/50 hover:bg-black/70 text-white"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {statusOptions.map((option) => (
                  <DropdownMenuItem
                    key={option.value}
                    onClick={() => onUpdateStatus(item.id, option.value)}
                    className={cn(
                      "flex items-center gap-2",
                      item.estado === option.value && "bg-primary/10"
                    )}
                  >
                    {option.icon}
                    <span>{option.label}</span>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem
                  onClick={() => setShowDeleteDialog(true)}
                  className="text-destructive focus:text-destructive flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Eliminar</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="absolute top-2 left-2">
            <TypeBadge type={item.tipo === "pelicula" ? "movie" : "series"} />
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="font-bold text-white text-lg leading-tight mb-2 line-clamp-2">
              {item.titulo}
            </h3>
            <StatusBadge 
              status={item.estado === "pendiente" ? "pending" : item.estado === "viendo" ? "watching" : "completed"} 
              label={item.estado === "pendiente" ? "Pendiente" : item.estado === "viendo" ? "Viendo" : "Completado"}
            />
          </div>
        </div>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar de la lista?</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Estás seguro de que quieres eliminar "{item.titulo}" de tu lista individual?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => onDelete(item.id)}
              className="bg-destructive hover:bg-destructive/90"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
