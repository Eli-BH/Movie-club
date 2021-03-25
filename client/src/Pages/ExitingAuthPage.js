import React from "react";
import { Link } from "react-router-dom";

const ExitingAuthPage = () => {
  return (
    <div className="existingAuth">
      <h3>Hey, What are you doing here!? </h3>
      <Link>
        <h1>Go back Home</h1>
      </Link>
    </div>
  );
};

export default ExitingAuthPage;
