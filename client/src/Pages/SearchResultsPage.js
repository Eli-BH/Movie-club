import React, { useEffect, useState } from "react";
import { Button, Card, Col, Pagination, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchSearchResults, searchResultsSelector } from "../slices/search";

const SearchResultsPage = ({ match }) => {
  const [page, setPage] = useState(1);

  const [searchData, setSearchData] = useState(null);

  const dispatch = useDispatch();
  const { searchResults, loading, hasError } = useSelector(
    searchResultsSelector
  );

  let items = [];

  useEffect(() => {
    dispatch(fetchSearchResults(match.params.query, page));
  }, [dispatch, match.params.query, page]);
  useEffect(() => {
    if (searchResults) {
      setSearchData(searchResults);
    }
  }, [searchResults]);

  const handlePaginate = (number) => {
    setPage(number);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (searchData) {
    for (let number = 1; number <= searchData?.total_pages; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === page}
          onClick={() => handlePaginate(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
  } else {
    return <></>;
  }

  hasError && console.log("error in page");

  return (
    <div className="search-results-page">
      {searchData.total_results > 0 ? (
        <div className="search-results-container">
          <div className="search-results-map">
            <h3>Results for: {match.params.query}</h3>
            {searchData?.results.map((item) => {
              return (
                <Link to={`/movie/${item.id}`}>
                  <Card className="search-results-cards">
                    <Card.Body>
                      <Row className="search-results-card-info">
                        <Col sm={11} lg={1}>
                          {item.poster_path ? (
                            (
                              <img
                                src={`https://www.themoviedb.org/t/p/original${item.poster_path}`}
                                alt={item.original_title}
                                style={{ width: 100 }}
                              />
                            ) || <h5>Loading</h5>
                          ) : (
                            <p>No image available</p>
                          )}
                        </Col>
                        <Col sm={11} lg={11} className="search-results-text">
                          <div>
                            <p>
                              {item.release_date ? (
                                item.release_date.replaceAll("-", "/")
                              ) : (
                                <p>
                                  <i>Not yet released</i>
                                </p>
                              )}
                            </p>
                            <p>
                              <strong>{item.original_title}</strong>
                            </p>
                            <p>{item.overview}</p>
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="noResults-search-page">
          <div>
            <p>
              No Results found for: <b>{match.params.query}</b>
            </p>
          </div>
        </div>
      )}
      <div className="search-page-pagination">
        {loading ? (
          <h1>Loading</h1>
        ) : (
          <Pagination size="sm">{items}</Pagination>
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;
