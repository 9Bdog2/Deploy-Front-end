import { useState } from "react";

import { useNavigate } from "react-router-dom";

const Backoffice = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const newProduct = { name, description, brand, price, category };
  const navigate = useNavigate();

  const url = "http://localhost:3001/products";
  const request = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newProduct),
  };

  const newProductPost = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(url, request);
      if (response.ok) {
        const data = await response.json();
        uploadImage(data);
      } else {
        console.error("Fetch Failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const uploadImage = async (data) => {
    const formData = new FormData();
    formData.append("image", image);
    try {
      const response = await fetch(
        `http://localhost:3001/products/${data.id}/uploadImage`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (response.ok) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="container">
        <h2 className="my-4 text-center page-heading">Add A New Product</h2>
        <div className="alertMsg d-none" role="alert" />
        <form onSubmit={newProductPost}>
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
              defaultValue={""}
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
            <label htmlFor="image">Product Image</label>
            <input
              type="file"
              className="form-control"
              onChange={(event) => setImage(event.target.files[0])}
              id="image"
              placeholder="Image Link - https://source.unsplash.com/random/800x600"
              required
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
              onChange={(event) => setCategory(event.target.value)}/>
          </div>
          <div className="d-flex justify-content-between btn-area">
            <div className="creation">
              <button type="submit" className="btn btn-success create-edit">
                Create
              </button>
              <button type="submit"  className="btn btn-success create-edit">Create</button>
              <button type="reset" className="btn btn-warning ml-auto">
                Clear
              </button>
            </div>
            <div className="deletion"></div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Backoffice
