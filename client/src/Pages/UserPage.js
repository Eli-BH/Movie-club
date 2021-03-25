import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { userInfoSelector } from "../slices/userInfo";

const UserPage = ({ match }) => {
  const userId = match.params.id;

  const { loading, hasError, userInfo } = useSelector(userInfoSelector);

  return (
    <div>
      <h1>{userInfo && userInfo?.email}</h1>
    </div>
  );
};

export default UserPage;
