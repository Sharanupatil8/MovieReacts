import { useState, useCallback } from "react";
import Header from "./components/Header";
import MoviesData from "./components/MoviesData";
import MovieList from "./components/MovieList";
import MoviesWatched from "./components/MoviesWatched";
import WatchedMoviesList from "./components/WatchedMoviesList";
import WatchedSummary from "./components/WatchedSummary";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import SelectedMovie from "./components/SelectedMovie";
import { useMovies } from "./components/useMovies";
import { useLocalStorageState } from "./components/useLocalStorageState";
import { useKey } from "./components/useKey";

function App() {
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  // const [watchedMovies, setWatchedMovies] = useState(function () {
  //   const storedMovies = localStorage.getItem("watched");
  //   return JSON.parse(storedMovies);
  // });

  const handleCloseSelectedMovie = useCallback(() => {
    setSelectedId(null);
  }, []);

  const { movies, isLoading, error } = useMovies(
    search,
    handleCloseSelectedMovie
  );

  const [watchedMovies, setWatchedMovies] = useLocalStorageState([], "watched");

  useKey("escape", handleCloseSelectedMovie);

  // const searchMovies = (searchInput) => {
  //   setSearch(searchInput);
  // };

  const handleSelectedMovie = (id) => {
    setSelectedId((selectedId) => (selectedId === id ? null : id));
  };

  function handleWatchedMovied(watched) {
    setWatchedMovies((movies) => [...movies, watched]);
    // localStorage.setItem("watched", JSON.stringify([...movies, watched]));
  }

  function handleDeleteWatchedMovie(id) {
    setWatchedMovies((movies) => movies.filter((movie) => movie.imdbId !== id));
  }

  return (
    <>
      <Header query={search} setQuery={setSearch} movies={movies} />
      <MoviesData watched={watchedMovies} movies={movies}>
        {isLoading && <Loader />}
        {!isLoading && !error && (
          <MovieList
            handleSelectedMovie={handleSelectedMovie}
            movies={movies}
          />
        )}
        {error && <ErrorMessage message={error} />}
        {/* {isLoading ? <Loader /> : <MovieList  />} */}
        <MoviesWatched>
          {selectedId ? (
            <SelectedMovie
              handleWatchedMovied={handleWatchedMovied}
              handleCloseSelectedMovie={handleCloseSelectedMovie}
              selectedId={selectedId}
              watched={watchedMovies}
            />
          ) : (
            <>
              <WatchedSummary watched={watchedMovies} />
              <WatchedMoviesList
                watched={watchedMovies}
                handleDeleteWatchedMovie={handleDeleteWatchedMovie}
              />
            </>
          )}
        </MoviesWatched>
      </MoviesData>
    </>
  );
}

export default App;
