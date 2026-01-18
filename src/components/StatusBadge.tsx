import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const statusBadgeVariants = cva(
  "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold transition-all duration-200",
  {
    variants: {
      status: {
        pending: "bg-status-pending-bg text-status-pending",
        watching: "bg-status-watching-bg text-status-watching",
        completed: "bg-status-completed-bg text-status-completed",
      },
    },
    defaultVariants: {
      status: "pending",
    },
  }
);

export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof statusBadgeVariants> {
  label: string;
}

export function StatusBadge({ status, label, className, ...props }: StatusBadgeProps) {
  const icons = {
    pending: "○",
    watching: "▶",
    completed: "✓",
  };

  return (
    <span className={cn(statusBadgeVariants({ status }), className)} {...props}>
      <span className="text-xs">{icons[status || "pending"]}</span>
      {label}
    </span>
  );
}
