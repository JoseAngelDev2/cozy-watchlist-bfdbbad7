import { cn } from "@/lib/utils";
import { Usuario } from "@/hooks/useIndividualWatchlist";

interface UserSelectorProps {
  selectedUser: Usuario;
  onSelectUser: (user: Usuario) => void;
}

export function UserSelector({ selectedUser, onSelectUser }: UserSelectorProps) {
  return (
    <div className="flex gap-3">
      <button
        onClick={() => onSelectUser("karen")}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200",
          "border-2 font-medium",
          selectedUser === "karen"
            ? "bg-pink-500/20 border-pink-500 text-pink-300"
            : "bg-card/50 border-border/50 text-muted-foreground hover:border-pink-500/50"
        )}
      >
        <span className="text-lg">👩</span>
        <span>Karen</span>
      </button>
      <button
        onClick={() => onSelectUser("rafa")}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200",
          "border-2 font-medium",
          selectedUser === "rafa"
            ? "bg-blue-500/20 border-blue-500 text-blue-300"
            : "bg-card/50 border-border/50 text-muted-foreground hover:border-blue-500/50"
        )}
      >
        <span className="text-lg">👨</span>
        <span>Rafa</span>
      </button>
    </div>
  );
}
