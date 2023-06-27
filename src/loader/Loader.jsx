import React from "react";
import "./Loader.scss";

export const Loader = () => {
  return (
    <div className="wrapper">
      <div className="lds_ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
export default Loader;
