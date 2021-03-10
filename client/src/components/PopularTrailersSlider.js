import React, { useState } from "react";
import { FiPlayCircle } from "react-icons/fi";
import Modal from "react-bootstrap/Modal";

const PopularTrailersSlider = ({ videos, loading }) => {
  const [show, setShow] = useState(false);
  const [trailer, setTrailer] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleOpen = (trailer) => {
    handleShow();
    setTrailer(trailer);
  };

  return videos ? (
    <div className="trailer-scroll-list my-5">
      <div className="trailer-scroll-container">
        <Modal show={show} onHide={handleClose} centered>
          <iframe
            width="560"
            height="315"
            src={trailer}
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            title={trailer}
          ></iframe>
        </Modal>

        {videos ? (
          videos.map((vid) => {
            return (
              <div className="mr-5 trailer-list-item" key={vid.name}>
                <img
                  src={vid.backdrop}
                  alt={vid.name}
                  className="trailer-backdrop"
                />

                <div className="play" onClick={() => handleOpen(vid.link)}>
                  <FiPlayCircle className="play-btn" />
                </div>

                <p>{vid.name}</p>
              </div>
            );
          })
        ) : (
          <h6>Loading</h6>
        )}
      </div>
    </div>
  ) : (
    <div>
      <h1>Loading</h1>
    </div>
  );
};

export default PopularTrailersSlider;
