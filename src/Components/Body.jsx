import { useEffect, useState } from "react";

const Body = () => {
  const [products, setProducts] = useState([]);
  

  const getProducts = async () => {
    try {
      const response = await fetch("http://localhost:3001/products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Fetch Failed");
      const body = await response.json();
      console.log(body);
      setProducts(body);
     
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <h2 className="my-4 text-center">Choose A Product To Buy</h2>
      {products.map((product) => (
        <div key={product.id}>
          <div className="container product-container mb-5">
            <div className="row  justify-content-center">
              <a href={`/detailsPage/${product.id}`}>
                <img className="card-img-top" src={product.image} alt="" />
              </a>

              <div className="col-4 col-md-6 d-flex">
                <div className="row">
                  <h4 className="card-title text-center col-12">
                    <a href={`/detailsPage/${product.id}`}>{product.name}</a>
                  </h4>
                  <div className="col-12 text-center ">
                    <p>
                      <strong>Brand - </strong>
                      {product.brand}
                    </p>
                  </div>
                  <div className="col-12 text-center">
                    <p>
                      <strong>Category - </strong>
                      {product.category}
                    </p>
                  </div>
                  <div className="col-12 text-center">
                    <p>
                      <strong>Description - </strong>
                      {product.description}
                    </p>
                  </div>
                  <div className="col-12 text-center">
                    <p>
                      <strong>Price - </strong>£$
                      {product.price
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Body;
