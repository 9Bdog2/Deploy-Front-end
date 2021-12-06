import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Reviews from "./Reviews";
import { Modal, Button } from "react-bootstrap";

const DetailsPage = () => {
  const { productId } = useParams();

  const [products, setProducts] = useState(null);
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const getProducts = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/products/" + productId,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) throw new Error("Fetch Failed");
      const body = await response.json();
      console.log(body);
      setProducts(body);
      setName(body.name);
      setDescription(body.description);
      setBrand(body.brand);
      setPrice(body.price);
      setCategory(body.category);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleDelete = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/products/" + productId,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) throw new Error("Fetch Failed");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = async () => {
    const newProduct = { name, description, brand, price, category };

    try {
      const response = await fetch(
        "http://localhost:3001/products/" + productId,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newProduct),
        }
      );
      if (!response.ok) throw new Error("Fetch Failed");
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {products && (
        <>
          <div className="container d-flex ">
            <div className="col-12 col-md-6">
              <img src={products.image} className="img-fluid" alt="" />
            </div>
            <div className="col-12 col-md-6">
              <div className="row">
                <div className="col-12 text-center">
                  <p>
                    <strong>Brand - </strong>
                    {products.brand}
                  </p>
                </div>
                <div className="col-12 text-center">
                  <p>
                    <strong>Description - </strong>
                    {products.description}
                  </p>
                </div>
                <div className="col-12 text-center">
                  <p>
                    <strong>Price - </strong>£$
                    {products.price
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </p>
                </div>
                <div className="col-12 text-center">
                  <button className="btn btn-primary" onClick={handleShow}>
                    Edit
                  </button>
                  <button className="btn btn-danger" onClick={handleDelete}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={handleEdit}>
                <div className="form-group">
                  <label htmlFor="name">Product Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Name"
                    required
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Product Description</label>
                  <textarea
                    className="form-control"
                    id="description"
                    placeholder="Description..."
                    rows={3}
                    required
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="brand">Brand</label>
                  <input
                    type="text"
                    className="form-control"
                    id="brand"
                    placeholder="Brand"
                    required
                    value={brand}
                    onChange={(event) => setBrand(event.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="price">Price</label>
                  <input
                    type="number"
                    className="form-control"
                    id="price"
                    placeholder="£10"
                    required
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="category">Category</label>
                  <input
                    type="text"
                    className="form-control"
                    id="category"
                    placeholder="Category"
                    required
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                  />
                </div>
                <div className="d-flex justify-content-between btn-area">
                  <div className="creation">
                    <button
                      type="submit"
                      className="btn btn-success create-edit"
                    >
                      Create
                    </button>
                    <button type="reset" className="btn btn-warning ml-auto">
                      Clear
                    </button>
                  </div>
                  <div className="deletion"></div>
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}

      <Reviews productId={productId} />
    </>
  );
};

export default DetailsPage;
