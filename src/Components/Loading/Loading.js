import React from "react";
import { Spinner } from "reactstrap";

const Loading = () => {
  return (
    <div className="spinner-position">
      <Spinner>Loading...</Spinner>
    </div>
  );
};

export default Loading;
