import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { chatSelector, fetchChat, newMessage } from "../slices/chat";
import { singleMovieSelector } from "../slices/singleMovie";
import { Row, Col, Card, Media } from "react-bootstrap";

import io from "socket.io-client";
let socket;

//put this back in the movie page to prevent reload

const ChatComponent = () => {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [room, setRoom] = useState("");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const CONNECTION_PORT = "localhost:3001";
  const dispatch = useDispatch();

  const { chatMessageList } = useSelector(chatSelector);
  const { singleMovie } = useSelector(singleMovieSelector);

  useEffect(() => {
    socket = io(CONNECTION_PORT);
  }, [CONNECTION_PORT]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList([...messageList, data]);
    });
  }, [messageList]);

  useEffect(() => {
    singleMovie?.title && setRoom(singleMovie?.title);
    socket.emit("join_room", room);
    room !== "" && dispatch(fetchChat(room));
  }, [room, dispatch, singleMovie?.title]);

  const sendMessage = async (e) => {
    e.preventDefault();
    let messageContent = {
      room,
      content: {
        author: user.username,
        message: message,
      },
    };
    await socket.emit("send_message", messageContent);
    setMessageList([...messageList, messageContent.content]);
    dispatch(newMessage({ name: room, author: user.username, message }));

    setMessage("");
  };

  console.log(messageList);

  let today = new Date();
  let time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;

  return (
    <div className="chatContainer">
      <Row>
        <div
          style={{
            width: "100%",
            height: 200,
            overflowY: "scroll",
            borderWidth: 2,
            borderColor: "black",
            borderStyle: "solid",
          }}
        >
          {chatMessageList.length > 0 ? (
            chatMessageList.map((item) => (
              <Card>
                <Card.Body>
                  <Media>
                    <Media.Body>
                      <h6>{item.message}</h6>
                      <p style={{ fontSize: 10 }} className="mb-0">
                        <i>{item.author}</i>
                      </p>
                      <p style={{ fontSize: 10 }} className="mt-0">
                        <i>{time}</i>
                      </p>
                    </Media.Body>
                  </Media>
                </Card.Body>
              </Card>
            ))
          ) : (
            <p>Start chatting</p>
          )}
        </div>{" "}
      </Row>
      <form onSubmit={sendMessage}>
        <Row>
          <Col lg={10} className="p-0">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{ width: "100%" }}
            />
          </Col>
          <Col lg={2} className="p-0">
            <button type="submit" style={{ width: "100%" }}>
              send
            </button>
          </Col>
        </Row>
      </form>
    </div>
  );
};

export default ChatComponent;
