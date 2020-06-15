import React from "react";
import Paper from "@material-ui/core/Paper";
import "./Error.css";

const Error = () => {
  return (
    <div id="errorContainer">
      <Paper
        elevation={3}
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        <h2>Not authorized</h2>
        <p>
          You are not yet authorized to view this page, please try again at a
          later point in time.
        </p>
        <img
          id="lock"
          src={"https://image.flaticon.com/icons/png/512/61/61457.png"}
          alt=""
        />
      </Paper>
    </div>
  );
};

export default Error;
