import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchResults, searchResultsSelector } from "../slices/search";

const SearchResultsPage = ({ match }) => {
  const [page, setPage] = useState(1);
  const query = match.params.query;

  const dispatch = useDispatch();
  const { searchResults, loading, hasError } = useSelector(
    searchResultsSelector
  );

  hasError && console.log(hasError);

  useEffect(() => {
    dispatch(fetchSearchResults(query));
  }, [dispatch]);

  return <div>{match.params.query}</div>;
};

export default SearchResultsPage;
