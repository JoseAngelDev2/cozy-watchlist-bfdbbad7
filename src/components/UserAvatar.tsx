import { cn } from "@/lib/utils";

interface UserAvatarProps {
  name: string;
  avatarUrl: string;
  className?: string;
}

export function UserAvatar({ name, avatarUrl, className }: UserAvatarProps) {
  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <div className="relative">
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-wood shadow-lg">
          <img
            src={avatarUrl}
            alt={`Avatar de ${name}`}
            className="w-full h-full object-cover"
          />
        </div>
        {/* Decorative star */}
        <span className="absolute -top-1 -right-1 text-xl animate-pulse-heart">⭐</span>
      </div>
      <h3 className="font-display text-xl md:text-2xl font-bold text-wood text-shadow-wood">
        {name}
      </h3>
    </div>
  );
}
