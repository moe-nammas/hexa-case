import React from "react";
import { Spinner } from "reactstrap";

const Loading = ({ padding = true }) => {
  return (
    <div
      className="spinner-position"
      style={padding ? { padding: "1rem" } : {}}
    >
      <Spinner>Loading...</Spinner>
    </div>
  );
};

export default Loading;
