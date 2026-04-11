const API_URL = 'https://fakestoreapi.com/products';
const productsContainer = document.getElementById('products-container');

function renderProducts(products = []) {
  if (!productsContainer) return;

  if (!products.length) {
    productsContainer.innerHTML = `
      <div class="col-12">
        <p class="text-muted">No hay productos para mostrar.</p>
      </div>
    `;
    return;
  }

  productsContainer.innerHTML = products.map((product) => {
    return `
      <div class="col-12 col-sm-6 col-lg-4">
        <div class="card h-100 shadow-sm">
          <img src="${product.image}" class="card-img-top" alt="${product.title}">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text text-muted small">
              ${product.description.substring(0, 100)}...
            </p>
            <div class="d-flex justify-content-between align-items-center mt-auto">
              <span class="fw-bold fs-5">$${product.price}</span>
              <a href="./docs/detalle.html?id=${product.id}" class="btn btn-outline-primary btn-sm">
                Ver más
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

fetch(API_URL)
  .then((response) => response.json())
  .then((data) => {
    renderProducts(data);
  })
  .catch((error) => {
    console.error('Error al obtener los productos:', error);
    renderProducts();
  });