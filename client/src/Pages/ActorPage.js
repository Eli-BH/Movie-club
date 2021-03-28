import React, { useEffect } from "react";
import { Accordion, Button, Card, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchActorInfo, actorSelector } from "../slices/actor";

const ActorPage = ({ match }) => {
  const dispatch = useDispatch();
  const id = match.params.id;

  const { actorData, loading } = useSelector(actorSelector);

  useEffect(() => {
    dispatch(fetchActorInfo(id));
  }, [dispatch, id]);

  console.log(
    actorData?.combined_credits?.cast.filter(
      (item) => item.media_type === "movie"
    )
  );
  return (
    <div className="actorPageContainer">
      {loading && <h1>Loading</h1>}
      {actorData ? (
        <div>
          <div className="d-flex align-items-center">
            <div>
              <img
                src={`https://www.themoviedb.org/t/p/original${actorData.profile_path}`}
                alt={actorData.name}
                className="actorPageImage"
                width="200"
                height="300"
              />
              <h4>{actorData?.name}</h4>
            </div>
          </div>

          <div>
            <Accordion>
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="4">
                  Biography
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="4">
                  <Card.Body>
                    <div>
                      {actorData?.birthday && (
                        <p>
                          <b>Born: </b>
                          {actorData?.birthday.replaceAll("-", "/")}
                        </p>
                      )}

                      {actorData?.deathday && (
                        <p>
                          <b>Died: </b>
                          {actorData?.deathday.replaceAll("-", "/")}
                        </p>
                      )}
                      <p>
                        <b>Place of birth: </b>
                        {actorData?.place_of_birth}
                      </p>
                      <p>
                        {" "}
                        <b>Biography: </b>
                        {actorData?.biography}
                      </p>
                    </div>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>

              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0">
                  Cast
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <Row className="justify-content-center">
                      {actorData?.combined_credits?.cast
                        .filter((item) => item.media_type === "movie")
                        .map((item, index) => (
                          <Link to={`/movie/${item.id}`}>
                            <Card
                              key={index}
                              style={{ width: "18rem" }}
                              className="castCards m-2"
                            >
                              <Card.Body
                                style={{
                                  textAlign: "center",
                                  margin: 0,
                                  padding: 3,
                                  color: "black",
                                }}
                              >
                                <p>{item.title}</p>
                              </Card.Body>
                              <Card.Img
                                variant="top"
                                src={
                                  item.poster_path
                                    ? `https://www.themoviedb.org/t/p/original${item.poster_path} `
                                    : `https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png`
                                }
                                alt={item.title}
                                style={{ height: 429 }}
                              />
                              <Card.Footer>
                                <p>
                                  <b>Character: </b>
                                  {item.character}
                                </p>
                                <p>
                                  <b>Release Date: </b>
                                  {item.release_date}
                                </p>
                              </Card.Footer>
                            </Card>
                          </Link>
                        ))}
                    </Row>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>

              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="2">
                  Crew
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="2">
                  <Card.Body>
                    <div>
                      <ul>
                        {actorData?.combined_credits?.crew
                          .filter((item) => item.media_type === "movie")
                          .map((item, index) => (
                            <Link to={`/movie/${item.id}`}>
                              <Card.Body>
                                <p>
                                  <b>{item.title}:</b> {item.job}
                                </p>
                              </Card.Body>
                            </Link>
                          ))}
                      </ul>
                    </div>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>

              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="3">
                  Images
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="3">
                  <Card.Body>
                    <Row>
                      {actorData?.images?.profiles.map((item, index) => (
                        <Card>
                          <Card.Img
                            src={`https://www.themoviedb.org/t/p/original${item.file_path}`}
                            alt={`image number ${index}`}
                            style={{ maxHeight: 300, width: "auto" }}
                          />
                        </Card>
                      ))}
                      {actorData?.tagged_images?.results.map((item, index) => (
                        <Card>
                          <Card.Img
                            src={`https://www.themoviedb.org/t/p/original${item.file_path}`}
                            alt={`image number ${item.image_type}`}
                            style={{ maxHeight: 300, width: "auto" }}
                          />
                        </Card>
                      ))}
                    </Row>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ActorPage;
