import React from "react";
import WatchedMovie from "./WatchedMovie";

function WatchedMoviesList({ watched, handleDeleteWatchedMovie }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          key={movie.imdbId}
          handleDeleteWatchedMovie={handleDeleteWatchedMovie}
          movie={movie}
        />
      ))}
    </ul>
  );
}

export default WatchedMoviesList;
