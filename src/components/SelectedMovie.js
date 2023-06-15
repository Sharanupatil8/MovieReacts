import React, { useEffect, useState } from "react";
import StarRating from "./StarRating";
import Loader from "./Loader";

const KEY = "3fae6293";

function SelectedMovie({
  selectedId,
  handleCloseSelectedMovie,
  handleWatchedMovied,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);

  const isWatched = watched.map((movie) => movie.imdbId).includes(selectedId);

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Plot: plot,
    Runtime: runTime,
    imdbRating,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  useEffect(() => {
    async function fetchSelectedIdData() {
      setIsLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
      );
      const data = await res.json();
      setMovie(data);
      setIsLoading(false);
    }
    fetchSelectedIdData();
  }, [selectedId]);

  useEffect(() => {
    if (!title) return;
    document.title = `Movie | ${title}`;

    return function () {
      document.title = "MovieReacts";
    };
  }, [title]);

  const handleAddSelectedMovie = () => {
    const newWatchedMovie = {
      title,
      imdbId: selectedId,
      poster,
      runTime: runTime.split(" ").at(0),
      imdbRating: Number(imdbRating),
      year,
      userRating,
    };
    handleWatchedMovied(newWatchedMovie);
    handleCloseSelectedMovie();
  };

  const userRated = watched.find(
    (movie) => movie.imdbId === selectedId
  )?.userRating;

  return (
    <div style={{ zIndex: 11 }}>
      <div className="details">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {" "}
            <header>
              <button
                className="btn-back"
                onClick={() => handleCloseSelectedMovie()}
              >
                {" "}
                &larr;{" "}
              </button>

              <img src={poster} alt={`${title} poster`} />
              <div className="details-overview">
                <h2>{title}</h2>
                <p>
                  {" "}
                  {released} &bull; {runTime}
                </p>
                <p>{genre}</p>
                <p>
                  <span> ⭐ {imdbRating} IMDb rating </span>{" "}
                </p>
              </div>
            </header>
            <section>
              <div className="rating">
                {!isWatched ? (
                  <>
                    <StarRating
                      onSetRating={setUserRating}
                      maxRating={10}
                      size={24}
                    />
                    {userRating > 0 && (
                      <button
                        className="btn-add"
                        onClick={handleAddSelectedMovie}
                      >
                        Add to list
                      </button>
                    )}
                  </>
                ) : (
                  <p>
                    You have already rated this movie {userRated}{" "}
                    <span>⭐</span>
                  </p>
                )}
              </div>
              <p>
                <em>{plot}</em>
              </p>
              <p>starring : {actors}</p>
              <p>Directed by : {director}</p>
            </section>
          </>
        )}
      </div>
    </div>
  );
}

export default SelectedMovie;
