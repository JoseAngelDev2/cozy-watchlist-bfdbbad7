import { HeroHeader } from "@/components/HeroHeader";
import { WatchlistGrid } from "@/components/WatchlistGrid";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroHeader />
      <WatchlistGrid />
      
      {/* Footer decoration */}
      <footer className="py-8 text-center">
        <p className="text-muted-foreground font-body text-sm flex items-center justify-center gap-2">
          Hecho con <span className="text-heart animate-pulse-heart inline-block">❤️</span> para ver juntos
        </p>
      </footer>
    </div>
  );
};

export default Index;
