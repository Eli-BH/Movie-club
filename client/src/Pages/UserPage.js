import React from "react";
import { Card, Image, Row } from "react-bootstrap";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userInfoSelector } from "../slices/userInfo";

const UserPage = ({ match }) => {
  const { userInfo } = useSelector(userInfoSelector);
  //page uses cards to show likes
  //needs unlike function
  return (
    <div className="profileContainer container">
      <div className="profileUserInfo">
        <Image
          src={userInfo.userIcon}
          alt={userInfo.userName}
          className="profileIcon"
          roundedCircle
          width="150"
          height="150"
        />
        <h4>{userInfo.userName}</h4>
      </div>

      <div className="profileLikes">
        <Row>
          {userInfo?.likes
            ? userInfo?.likes.map((item, index) => (
                <Link to={`/movie/${item.id}`}>
                  <Card
                    key={index}
                    style={{
                      width: "14rem",
                      color: "black",
                      textDecoration: "none",
                    }}
                    className="profileLikeCards m-3"
                  >
                    <Card.Body>
                      <Card.Img
                        src={`https://www.themoviedb.org/t/p/original${item.image}`}
                        alt={item.title}
                      />
                      <hr />
                      <Card.Text>
                        <h6>{item?.title}</h6>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              ))
            : null}
        </Row>
      </div>
    </div>
  );
};

export default UserPage;
