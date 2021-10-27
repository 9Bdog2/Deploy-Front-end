import React from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import { MdMonochromePhotos } from "react-icons/md";
import { useLocation, useHistory } from "react-router-dom";
export default function NavBar(props) {
  const location = useLocation();
  const history = useHistory();

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand
          href="/"
          style={{ display: "flex", alignItems: "center" }}
        >
          <MdMonochromePhotos size={30} />
          <span style={{ marginLeft: "1em" }}> PNG Editor</span>
        </Navbar.Brand>
        {location.pathname.includes("edit") ? (
          <Button
            variant="light"
            onClick={() => {
              props.onSave(location.pathname.split("/")[2], () => {
                history.push("/");
              });
            }}
          >
            Save
          </Button>
        ) : (
          <Button variant="light" onClick={props.onUpload}>
            Upload
          </Button>
        )}
      </Container>
    </Navbar>
  );
}
