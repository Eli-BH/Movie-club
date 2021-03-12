import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTrailers, trailersSelector } from "../slices/trailers";
import { Modal } from "react-bootstrap";

const TrailerSlider = () => {
  const [trailerData, setTrailerData] = useState([]);
  const [show, setShow] = useState(false);
  const [id, setId] = useState("");
  const dispatch = useDispatch();
  const { trailers, loading } = useSelector(trailersSelector);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    dispatch(fetchTrailers());
    setTrailerData(trailers);
  }, [dispatch, trailers]);

  const handleOpen = (id) => {
    setId(id);
    handleShow();
  };
  //from Youtube api

  return trailerData[0] ? (
    <div className="trailer-container container-sm">
      <Modal show={show} onHide={handleClose} centered>
        <iframe
          title="Youtube Title"
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${id}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </Modal>

      {trailerData[0].items.map((vid) => {
        return (
          <div
            key={vid.id}
            onClick={() => handleOpen(vid.contentDetails.videoId)}
          >
            <img
              src={vid.snippet.thumbnails.medium.url}
              alt={vid.snippet.title}
              className="trailer-slider-img"
            />
            <p>{vid.snippet.title}</p>
          </div>
        );
      })}
    </div>
  ) : (
    loading && <p>loading</p>
  );
};

export default TrailerSlider;
