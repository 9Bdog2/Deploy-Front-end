import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loader from "../components/loader/Loader";
export default function Gallery({ images, loading }) {
  if (loading) {
    return <Loader />;
  } else {
    return (
      <Container>
        <div style={{ paddingTop: 50 }}>
          <Row>
            {images.map((image) => (
              <Col xs={12} md={3} style={{ marginBottom: "1em" }}>
                <Link to={`/edit/${image.id}`}>
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    src={image.url}
                    alt={image.fileName}
                  />
                </Link>
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    );
  }
}
