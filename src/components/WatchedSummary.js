import React from "react";

function WatchedSummary({ watched }) {
  const avgImdbRating = watched
    .map((movies) => movies.imdbRating)
    .reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

  const avgUserRating = watched
    .map((movies) => movies.userRating)
    .reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

  const avgRuntime = Number(
    watched
      .map((movies) => movies.runTime)
      .reduce((acc, cur, i, arr) => acc + cur / arr.length, 0)
  );

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{Number(avgRuntime.toFixed(2))} min</span>
        </p>
      </div>
    </div>
  );
}

export default WatchedSummary;
