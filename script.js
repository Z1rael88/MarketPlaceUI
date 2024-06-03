const addButton = document.querySelector("#btnAdd");
const productContainer = document.querySelector("#product-container");
const ratingInput = document.querySelector("#rating");
const priceInput = document.querySelector("#price");
const nameInput = document.querySelector("#name");

// Retrieve the Bearer token from localStorage
const bearerToken = localStorage.getItem("bearerToken");

// Redirect to login if no token is found
if (!bearerToken) {
  window.location.href = "login.html";
}

//Function which clear form
function clearForm() {
  ratingInput.value = "";
  priceInput.value = "";
  nameInput.value = "";
}
function addProduct(name, rating, price) {
  const body = {
    name: name,
    rating: rating,
    price: price,
    isVisible: true,
  };
  fetch("https://localhost:5001/api/products", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${bearerToken}`,
    },
  })
    .then((data) => data.json())
    .then((response) => {
      clearForm();
      getProducts();
    });
}
function getProducts() {
  fetch("https://localhost:5001/api/products", {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  })
    .then((data) => data.json())
    .then((response) => displayProducts(response));
}
function displayProducts(products) {
  let allProducts = "";
  products.forEach((product) => {
    const productElement = `
    <div class="product" data-id="${product.id}">
    <h3>${product.name}</h3>
    <p>${product.rating}</p>
    <p>${product.price}</p>
    </div>
    `;
    allProducts += productElement;
  });
  productContainer.innerHTML = allProducts;

  //add event listeners
  document.querySelectorAll(".product").forEach((product) => {
    product.addEventListener("click", function () {
      populateForm(product.dataset.id);
    });
  });
}
function populateForm(id) {
  getProductById(id);
}
function getProductById(id) {
  fetch(`https://localhost:5001/api/products/${id}`, {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  })
    .then((data) => data.json())
    .then((response) => displayProductInForm(response));
}
function displayProductInForm(product) {
  ratingInput.value = product.rating;
  nameInput.value = product.name;
  priceInput.value = product.price;
  addButton.classList.remove("hidden");
  addButton.setAttribute("data-id", product.id);
}

getProducts();

addButton.addEventListener("click", function () {
  const id = addButton.dataset.id;
  if (id) {
    updateProduct(id, nameInput.value, ratingInput.value, priceInput.value);
  } else {
    addProduct(nameInput.value, ratingInput.value, priceInput.value);
  }
});
