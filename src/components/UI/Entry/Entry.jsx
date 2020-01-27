import React from "react";
import "./Entry.scss";

const entry = props => (
  <div className="entry-background">
    <div className="entry">{props.children}</div>
  </div>
);

export default entry;
