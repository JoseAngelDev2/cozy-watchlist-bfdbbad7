import { IndividualHeroHeader } from "@/components/IndividualHeroHeader";
import { IndividualWatchlistGrid } from "@/components/IndividualWatchlistGrid";

const Individual = () => {
  return (
    <div className="min-h-screen bg-background">
      <IndividualHeroHeader />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <IndividualWatchlistGrid />
      </main>
      
      {/* Footer decoration */}
      <footer className="py-8 text-center">
        <p className="text-muted-foreground font-body text-sm flex items-center justify-center gap-2">
          Hecho con <span className="text-heart animate-pulse-heart inline-block">❤️</span> para disfrutar a mi ritmo
        </p>
      </footer>
    </div>
  );
};

export default Individual;
