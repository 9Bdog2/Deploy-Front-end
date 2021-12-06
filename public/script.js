/* const myToken = config.TOKEN */

const loadData = async () => {
  try {
    const response = await fetch("https://localhost:3001/products", {
      method: "GET",
      /* headers: {
                "Authorization": myToken
            } */
    });
    if (!response.ok) throw new Error("Fetch Failed");
    const body = await response.json();
    displayData(body);
  } catch (error) {
    console.error(error);
  }
};

const displayData = (body) => {
  const productContainer = document.querySelector(".product-container");
  productContainer.innerHTML = body
    .map(
      ({ name, imageUrl: image, description, price, brand, _id: id }) => `
    <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
        <div class="card">
            <img src=${image} class="card-img-top product-image" alt="...">
            <div class="card-body">
                <div class="d-flex justify-content-between">
                    <h5 class="card-title product-description">${name}</h5>
                    <p class="card-text">£${price
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                </div>
                <p class="card-text product-description">${brand} - ${description}</p>
                <a class="btn btn-outline-primary w-100" href="product-details.html?productId=${id}">See More</a>
            </div>
        </div>
    </div>
    `
    )
    .join("");
};

loadData();
