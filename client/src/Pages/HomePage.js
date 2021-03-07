import React, { useEffect } from "react";
import axios from "axios";
import JumbotronComponent from "../components/JumbotronComponent";

export const HomePage = () => {
  const images = [];

  useEffect(() => {
    async function fetchPosters() {
      await axios
        .get(
          "https://api.themoviedb.org/3/trending/movie/day?api_key=0ca4f16446cc1bca4c690abae99b5e52"
        )
        .then((res) => {
          for (let i = 0; i < 3; i++) {
            images.push(res.data.results[i]);
          }
        });
    }
    fetchPosters();
  });

  return (
    <div className="homepage">
      <JumbotronComponent images={images} />
    </div>
  );
};

export default HomePage;
