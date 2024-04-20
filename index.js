const inputElement = document.getElementById("search");
const productsCenter = document.querySelector(".products-center");
const filterBtnsContainer = document.querySelector(".filter-box");

const app = axios.create({
  baseURL: "http://localhost:3000",
});

let productsData = [];
const filters = {
  searchItems: "",
};

// Loading and getting data
document.addEventListener("DOMContentLoaded", getData);

async function getData() {
  try {
    const data = await app.get("/items");
    productsData = data.data;

    // render products
    renderProducts(productsData, filters);
  } catch (err) {
    err.response && console.log(err.response.data);
  }
}

// search input event
inputElement.addEventListener("input", (e) => {
  filters.searchItems = e.target.value;
  renderProducts(productsData, filters);
});

// filter buttons event
filterBtnsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn")) {
    filters.searchItems = e.target.dataset.filter;
    renderProducts(productsData, filters);
  }
});

// render products on DOM
function renderProducts(products, filters) {
  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(filters.searchItems.toLowerCase())
  );
  productsCenter.innerHTML = "";
  filteredProducts.forEach((product) => createProductHtml(product));
}

function createProductHtml(product, index) {
  const div = document.createElement("div");
  div.setAttribute("id", `${product.id}`);
  div.classList.add("product");
  div.innerHTML = `<div class="img-container">
                           <img src=${product.image} class="product-${index}" />
                         </div>
                         <div class="product-desc">
                           <p class="product-price">$ ${product.price}</p>
                           <p class="product-title">${product.title}</p>
                        </div>`;
  productsCenter.appendChild(div);
}
