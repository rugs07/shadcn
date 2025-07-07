import { useState, useEffect } from "react";
import axios from "axios";

const UseBookSearch = (query, pageNumber) => {
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() =>{
    setBooks([]);
  },[query])

  useEffect(() => {
    setLoading(true);
    setError(false);
    const controller = new AbortController();
    axios({
      method: "GET",
      url: "http://openlibrary.org/search.json",
      params: { q: query, page: pageNumber },
      signal: controller.signal,
    })
      .then((res) => {
        setBooks((prevBooks) =>  ([
          ...new Set([...prevBooks, ...res.data.docs.map((b) => b.title)]),
        ]));
        setLoading(false);
        setHasMore(res.data.docs.length > 0);
        console.log(res.data);
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log("request Cancelled");
        } else {
          console.log(err);
          setError(true);
        }
      });

    return () => {
      controller.abort();
      console.log("cleanup function called");
    };
  }, [query, pageNumber]);
  return { loading, error, books, hasMore };
};

export default UseBookSearch;
