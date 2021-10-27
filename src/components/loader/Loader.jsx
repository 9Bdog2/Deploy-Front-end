import React from "react";
import { Spinner } from "react-bootstrap";

export default function Loader() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Spinner animation="grow" />
    </div>
  );
}
