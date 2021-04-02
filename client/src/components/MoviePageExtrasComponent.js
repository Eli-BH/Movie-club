import React from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

import { Row, Col, Media, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import ChatComponent from "./ChatComponent";

const MoviePageExtrasComponent = ({
  comments,
  comment,
  handleComment,
  singleMovie,
  setComment,
}) => {
  return (
    <div>
      <div>
        <div>
          <h2>Extras</h2>
        </div>
      </div>

      <Tabs defaultActiveKey="videos" className="extras-tabs">
        <Tab eventKey="videos" title="Videos">
          <div className="container m-3 media-videos">
            {singleMovie.videos ? (
              singleMovie.videos.results.map((item) => {
                return (
                  <div key={item.id} className="media-video-item">
                    <iframe
                      title={item.name}
                      width="360"
                      height="215"
                      src={`https://www.youtube.com/embed/${item.key}`}
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen
                    ></iframe>
                  </div>
                );
              })
            ) : (
              <p>No videos</p>
            )}
          </div>
        </Tab>

        {singleMovie?.similar?.results.length > 0 && (
          <Tab eventKey="similar" title="Similar Movies">
            <div className="container m-3 media-similar">
              {singleMovie.similar.results.map((item) => {
                return (
                  <div className="similar-img-div">
                    <Link to={`/movie/${item.id}`}>
                      <img
                        className="similar-img"
                        src={`https://www.themoviedb.org/t/p/original${item.poster_path}`}
                        alt={item.id}
                      />
                      <p>{item.title}</p>
                    </Link>
                  </div>
                );
              })}
            </div>
          </Tab>
        )}
        <Tab eventKey="comments" title="Comments">
          <div className="comment-div">
            <Row>
              <div className="comments-box">
                {comments.length > 0 ? (
                  comments.map((item) => (
                    <Card>
                      <Card.Body>
                        <Media>
                          <Media.Body>
                            <h6>{item.userName}</h6>
                            <p>{item.comment}</p>
                          </Media.Body>
                        </Media>
                      </Card.Body>
                    </Card>
                  ))
                ) : (
                  <h6>No Comments Yet</h6>
                )}
              </div>
            </Row>

            <form className="comment-form" onSubmit={handleComment}>
              <Row>
                <Col lg={10} className="p-0">
                  <input
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </Col>
                <Col lg={2} className="p-0">
                  <button type="submit">Submit</button>
                </Col>
              </Row>
            </form>
          </div>
        </Tab>
        <Tab eventKey="Chat" title="Chat">
          <ChatComponent />
        </Tab>
      </Tabs>
    </div>
  );
};

export default MoviePageExtrasComponent;
