import { NavLink } from "./NavLink";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export function Navigation() {
  const location = useLocation();

  return (
    <nav className="bg-cloud/80 backdrop-blur-sm border-b-2 border-border/30 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-center gap-4">
          <NavLink
            to="/"
            className={cn(
              "px-6 py-3 rounded-full font-display text-sm md:text-base font-semibold transition-all duration-300",
              "border-2 shadow-md"
            )}
            activeClassName="bg-wood text-primary-foreground border-wood shadow-lg transform scale-105"
            pendingClassName="bg-cloud text-wood border-border"
          >
            {location.pathname === "/" ? (
              <span>💕 Para Ver Juntos</span>
            ) : (
              <span className="hover:scale-102">💕 Para Ver Juntos</span>
            )}
          </NavLink>
          <NavLink
            to="/individual"
            className={cn(
              "px-6 py-3 rounded-full font-display text-sm md:text-base font-semibold transition-all duration-300",
              "border-2 shadow-md bg-cloud text-wood border-border hover:bg-secondary"
            )}
            activeClassName="!bg-wood !text-primary-foreground !border-wood shadow-lg transform scale-105"
          >
            📺 Viendo Individualmente
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
