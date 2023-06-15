import React from "react";
import Search from "./Search";

function Header(props) {
  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <span role="img">🍿</span>
          <h1>MovieReacts</h1>
        </div>
        <Search setQuery={props.setQuery} query={props.query} />
        <p className="num-results">
          Found
          <strong> {props.movies.length ? props.movies.length : ""} </strong>
          results
        </p>
      </nav>
    </>
  );
}

export default Header;
