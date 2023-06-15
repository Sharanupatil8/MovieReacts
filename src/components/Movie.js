import React, { useState } from "react";

function Movie({ movie, handleSelectedMovie }) {
  const [isActive, setIsActive] = useState(false);

  function showMovieDetails() {
    handleSelectedMovie(movie.imdbID);
    setIsActive((prev) => !prev);
  }

  return (
    <li
      onClick={showMovieDetails}
      className={isActive ? "active" : ""}
      key={movie.imdbID}
    >
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

export default Movie;
