export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  ACCOUNT_ID: process.env.EXPO_PUBLIC_TMDB_ACCOUNT_ID,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  },
};

export const fetchMovies = async ({ query }: { query: string }) => {
  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch movies: ${response.statusText}`);
  }

  const data = await response.json();
  return data.results;
};

export const fetchSeries = async ({ query }: { query: string }) => {
  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/tv?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}/discover/tv?sort_by=popularity.desc`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch movies: ${response.statusText}`);
  }

  const data = await response.json();
  return data.results;
};

export const fetchMovieDetails = async (
  movieId: string
): Promise<MovieDetails> => {
  try {
    const response = await fetch(
      `${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`,
      {
        method: "GET",
        headers: TMDB_CONFIG.headers,
      }
    );

    if (!response.ok) throw new Error("Failed to fetch movie details");

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchWatchList = async () => {
  const endpoint = `${TMDB_CONFIG.BASE_URL}/account/${TMDB_CONFIG.ACCOUNT_ID}/watchlist/movies?language=en-US&page=1&sort_by=created_at.asc`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch watchlist: ${response.statusText}`);
  }
  const data = await response.json();
  return data.results;
};

export const fetchProfile = async (): Promise<Profile> => {
  const endpoint = `${TMDB_CONFIG.BASE_URL}/account?api_key=${TMDB_CONFIG.API_KEY}`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch profile: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};

export const fetchFavoriteMovies = async () => {
  const endpoint = `${TMDB_CONFIG.BASE_URL}/account/${TMDB_CONFIG.ACCOUNT_ID}/favorite/movies?language=en-US&page=1&sort_by=created_at.asc`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch favorite movies: ${response.statusText}`);
  }
  const data = await response.json();
  return data.results;
};

export const fetchFavoriteTVShows = async () => {
  try {
    const response = await fetch(
      `${TMDB_CONFIG.BASE_URL}/account/${TMDB_CONFIG.ACCOUNT_ID}/favorite/tv?language=en-US&page=1&sort_by=created_at.asc`,
      {
        method: "GET",
        headers: TMDB_CONFIG.headers,
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch favorite TV shows: ${response.statusText}`
      );
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchTVShowsDetails = async (tvId: string): Promise<TVshows> => {
  try {
    const response = await fetch(
      `${TMDB_CONFIG.BASE_URL}/tv/${tvId}?api_key=${TMDB_CONFIG.API_KEY}`,
      {
        method: "GET",
        headers: TMDB_CONFIG.headers,
      }
    );

    if (!response.ok) throw new Error("Failed to fetch TV show details");

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchLists = async () => {
  try {
    const response = await fetch(
      `${TMDB_CONFIG.BASE_URL}/account/${TMDB_CONFIG.ACCOUNT_ID}/lists?language=en-US&page=1`,
      {
        method: "GET",
        headers: TMDB_CONFIG.headers,
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch lists: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Obtiene los ítems (películas/series) de una lista específica por su ID
export const fetchListItems = async (listId: number | string) => {
  try {
    const response = await fetch(
      `${TMDB_CONFIG.BASE_URL}/list/${listId}?language=en-US`,
      {
        method: "GET",
        headers: TMDB_CONFIG.headers,
      }
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch list items: ${response.statusText}`);
    }
    const data = await response.json();
    return { results: data.items || [] };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
