import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const typeBadgeVariants = cva(
  "inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium",
  {
    variants: {
      type: {
        movie: "bg-popcorn/20 text-primary",
        series: "bg-sky/50 text-primary",
      },
    },
    defaultVariants: {
      type: "movie",
    },
  }
);

export interface TypeBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof typeBadgeVariants> {}

export function TypeBadge({ type, className, ...props }: TypeBadgeProps) {
  const labels = {
    movie: "🎬 Película",
    series: "📺 Serie",
  };

  return (
    <span className={cn(typeBadgeVariants({ type }), className)} {...props}>
      {labels[type || "movie"]}
    </span>
  );
}
