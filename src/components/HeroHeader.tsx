import heroImage from "@/assets/hero-watching-together.png";

export function HeroHeader() {
  return (
    <header className="relative overflow-hidden gradient-sky pb-8">
      {/* Decorative clouds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-12 bg-cloud rounded-full opacity-60 animate-float" style={{ animationDelay: "0s" }} />
        <div className="absolute top-16 right-20 w-16 h-10 bg-cloud rounded-full opacity-50 animate-float" style={{ animationDelay: "0.5s" }} />
        <div className="absolute top-8 left-1/3 w-24 h-14 bg-cloud rounded-full opacity-40 animate-float" style={{ animationDelay: "1s" }} />
      </div>

      <div className="container mx-auto px-4 pt-8">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          {/* Hero Illustration */}
          <div className="relative">
            <img
              src={heroImage}
              alt="Personajes viendo películas juntos"
              className="w-64 md:w-80 h-auto rounded-3xl shadow-card border-4 border-cloud"
            />
          </div>

          {/* Title Section */}
          <div className="text-center md:text-left">
            {/* Wood-style title banner */}
            <div className="inline-block relative">
              <div className="bg-wood px-8 py-4 rounded-xl shadow-lg transform -rotate-1">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary-foreground text-shadow-wood">
                  Para Ver Juntos
                </h1>
              </div>
            </div>
            
            <p className="mt-6 text-lg md:text-xl text-muted-foreground font-body flex items-center justify-center md:justify-start gap-2">
              <span className="text-heart">💕</span>
              Películas y Series Pendientes
              <span className="text-heart">💕</span>
            </p>
          </div>
        </div>
      </div>

      {/* Grass decoration at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-8 gradient-grass" />
    </header>
  );
}
