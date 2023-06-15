import { useState, useEffect } from "react";

const KEY = "3fae6293";

export function useMovies(search, callback) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    callback?.();
    const controller = new AbortController();
    async function fetchMoviesData() {
      try {
        setIsLoading(true);
        setError("");
        const movieData = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&s=${search}`,
          { signal: controller.signal }
        );
        if (!movieData.ok)
          throw new Error("Something went wrong with fetching movies");
        const movieDataResults = await movieData.json();
        if (movieDataResults.Response === "False")
          throw new Error("Movie not found");
        setMovies(movieDataResults.Search);
        setError("");
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    // handleCloseSelectedMovie();

    if (search.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    fetchMoviesData();
    return function () {
      controller.abort();
    };
  }, [search, callback]);

  return { isLoading, movies, error };
}
