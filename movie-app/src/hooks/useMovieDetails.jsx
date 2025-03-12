import { useEffect, useState } from "react";
const api_key = import.meta.env.VITE_TMDB_API_KEY;
export function useMovieDetails(id) {
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(
    function () {
      async function getMovieDetails() {
        setLoading(true);
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}`
        );
        const data = await response.json();
        setMovie(data);
        setLoading(false);
      }
      getMovieDetails();
    },
    [id]
  );
  return { movie, loading };
}
