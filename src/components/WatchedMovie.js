import React from "react";

function WatchedMovie({ movie, handleDeleteWatchedMovie }) {
  return (
    <li key={movie.imdbId}>
      <img src={movie.poster} alt={`${movie.Title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runTime} min</span>
        </p>
        <button
          className="btn-delete"
          onClick={() => handleDeleteWatchedMovie(movie.imdbId)}
        >
          x
        </button>
      </div>
    </li>
  );
}

export default WatchedMovie;
