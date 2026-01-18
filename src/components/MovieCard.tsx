import { Heart, Popcorn } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import { TypeBadge } from "./TypeBadge";
import { cn } from "@/lib/utils";

export interface MovieCardProps {
  title: string;
  posterUrl: string;
  type: "movie" | "series";
  status: "pending" | "watching" | "completed";
  showHeart?: boolean;
}

const statusLabels = {
  pending: "Pendiente",
  watching: "Viendo juntos",
  completed: "Completado",
};

export function MovieCard({
  title,
  posterUrl,
  type,
  status,
  showHeart = true,
}: MovieCardProps) {
  return (
    <div
      className={cn(
        "group relative bg-card rounded-2xl overflow-hidden shadow-card card-hover",
        "border-2 border-border/50"
      )}
    >
      {/* Poster Container */}
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={posterUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent" />
        
        {/* Heart/Popcorn icon */}
        {showHeart && (
          <div className="absolute top-3 right-3">
            {status === "watching" ? (
              <Popcorn className="w-6 h-6 text-popcorn drop-shadow-lg animate-float" />
            ) : (
              <Heart
                className={cn(
                  "w-6 h-6 drop-shadow-lg transition-all duration-300",
                  status === "completed"
                    ? "text-heart fill-heart animate-pulse-heart"
                    : "text-cloud/80 group-hover:text-heart group-hover:scale-110"
                )}
              />
            )}
          </div>
        )}

        {/* Type badge */}
        <div className="absolute top-3 left-3">
          <TypeBadge type={type} />
        </div>

        {/* Title and status at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="font-display text-lg font-bold text-cloud mb-2 drop-shadow-md line-clamp-2">
            {title}
          </h3>
          <StatusBadge status={status} label={statusLabels[status]} />
        </div>
      </div>
    </div>
  );
}
