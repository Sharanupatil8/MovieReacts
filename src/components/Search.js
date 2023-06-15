import React, { useRef } from "react";
import { useKey } from "./useKey";

function Search(props) {
  const inputElement = useRef(null);

  useKey("enter", function () {
    if (document.activeElement === inputElement.current) return;
    inputElement?.current.focus();
    props.setQuery("");
  });

  return (
    <input
      value={props.query}
      onChange={(e) => props.setQuery(e.target.value)}
      className="search"
      type="search"
      placeholder="Search movies..."
      ref={inputElement}
    />
  );
}

export default Search;
