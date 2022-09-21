import React from "react";
import { Spinner } from "reactstrap";

const Loading = ({ padding = true, style = {} }) => {
  return (
    <div
      className="spinner-position"
      style={padding ? { padding: "1rem" } : {}}
    >
      <Spinner style={style}>Loading...</Spinner>
    </div>
  );
};

export default Loading;
