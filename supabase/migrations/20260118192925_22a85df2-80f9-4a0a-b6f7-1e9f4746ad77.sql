-- Crear tabla para watchlist individual
CREATE TABLE public.watchlist_individual (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tmdb_id INTEGER NOT NULL,
  titulo TEXT NOT NULL,
  tipo TEXT NOT NULL CHECK (tipo IN ('pelicula', 'serie')),
  poster TEXT,
  estado TEXT NOT NULL DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'viendo', 'completado')),
  usuario TEXT NOT NULL CHECK (usuario IN ('karen', 'rafa')),
  fecha_agregado TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(tmdb_id, usuario)
);

-- Enable Row Level Security
ALTER TABLE public.watchlist_individual ENABLE ROW LEVEL SECURITY;

-- RLS policies para acceso público (igual que watchlist_juntos)
CREATE POLICY "Anyone can view individual watchlist"
ON public.watchlist_individual FOR SELECT
USING (true);

CREATE POLICY "Anyone can add to individual watchlist"
ON public.watchlist_individual FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can update individual watchlist"
ON public.watchlist_individual FOR UPDATE
USING (true);

CREATE POLICY "Anyone can delete from individual watchlist"
ON public.watchlist_individual FOR DELETE
USING (true);

-- Trigger para updated_at
CREATE TRIGGER update_watchlist_individual_updated_at
BEFORE UPDATE ON public.watchlist_individual
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();