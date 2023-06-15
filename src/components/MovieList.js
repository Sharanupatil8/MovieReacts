import React from "react";
import Movie from "./Movie";

function MovieList({ movies, handleSelectedMovie }) {
  return (
    <div className="box box-left">
      <ul className="list list-movies">
        {movies
          ? movies.map((movie, index) => {
              return (
                <Movie
                  handleSelectedMovie={handleSelectedMovie}
                  key={movie.imdbID}
                  movie={movie}
                />
              );
            })
          : ""}
      </ul>
    </div>
  );
}

export default MovieList;
