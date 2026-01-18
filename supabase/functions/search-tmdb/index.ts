import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const TMDB_API_KEY = Deno.env.get('TMDB_API_KEY');
    
    if (!TMDB_API_KEY) {
      console.error('TMDB_API_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'TMDB API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { query, type = 'multi', page = 1 } = await req.json();

    if (!query || query.trim() === '') {
      return new Response(
        JSON.stringify({ error: 'Query parameter is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Searching TMDB for: "${query}", type: ${type}, page: ${page}`);

    // Determine the search endpoint based on type
    let endpoint: string;
    switch (type) {
      case 'movie':
        endpoint = 'search/movie';
        break;
      case 'tv':
        endpoint = 'search/tv';
        break;
      default:
        endpoint = 'search/multi';
    }

    const url = `https://api.themoviedb.org/3/${endpoint}?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&page=${page}&language=es-ES`;
    
    console.log(`Fetching from TMDB: ${endpoint}`);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`TMDB API error: ${response.status} - ${errorText}`);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch from TMDB', details: errorText }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    
    // Transform results to include poster URLs and normalize data
    const results = data.results.map((item: any) => ({
      id: item.id,
      title: item.title || item.name,
      original_title: item.original_title || item.original_name,
      overview: item.overview,
      poster_path: item.poster_path 
        ? `https://image.tmdb.org/t/p/w500${item.poster_path}` 
        : null,
      backdrop_path: item.backdrop_path
        ? `https://image.tmdb.org/t/p/original${item.backdrop_path}`
        : null,
      media_type: item.media_type || type,
      release_date: item.release_date || item.first_air_date,
      vote_average: item.vote_average,
      popularity: item.popularity,
    })).filter((item: any) => item.media_type !== 'person'); // Filter out person results

    console.log(`Found ${results.length} results`);

    return new Response(
      JSON.stringify({
        results,
        page: data.page,
        total_pages: data.total_pages,
        total_results: data.total_results,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error in search-tmdb function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
