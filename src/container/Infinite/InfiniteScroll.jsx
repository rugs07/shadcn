import React, { useCallback, useRef, useState } from "react";
import UseBookSearch from "../../UseBookSearch";

const InfiniteScroll = () => {
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  const observer = useRef();
  const { books, loading, hasMore, error } = UseBookSearch(query, pageNumber);

  const lastBookElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const handlesearch = (e) => {
    setQuery(e.target.value);
    setPageNumber(1);
  };

  return (
    <div className="p-2">
      <input
        type="text"
        value={query}
        className="border"
        onChange={(e) => handlesearch(e)}
      ></input>
      {books.map((book, index) => {
        if (books.length === index + 1) {
          return (
            <div ref={lastBookElementRef} key={index}>
              {book}
            </div>
          );
        } else {
          return <div key={index}>{book}</div>;
        }
      })}
      <div>{loading && "Loading..."}</div>
      <div>{error && "Error..."}</div>
    </div>
  );
};

export default InfiniteScroll;
