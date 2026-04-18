const API_URL = 'https://web-api-products.runasp.net/api/Products';
const productsContainer = document.getElementById('products-container');
const busqForm = document.getElementById('search-form');
const busqInput = document.getElementById('search-input');
let allProducts = [];

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

function filtrarProductos(terminosBusq = '') {
  const busqueda = terminosBusq.trim().toLowerCase();

  if (!busqueda) {
    renderProducts(allProducts);
    return;
  }

  const prodFiltrados = allProducts.filter((product) => {
    const coincidenciaTitulo = product.title.toLowerCase().includes(busqueda);
    const coincidenciaDesc = product.description.toLowerCase().includes(busqueda);

    return coincidenciaTitulo || coincidenciaDesc;
  });

  renderProducts(prodFiltrados);
}

if (busqForm) {
  busqForm.addEventListener('submit', (event) => {
    event.preventDefault();
    filtrarProductos(busqInput ? busqInput.value : '');
  });
}

if (busqInput) {
  busqInput.addEventListener('input', () => {
    filtrarProductos(busqInput.value);
  });
}

fetch(API_URL)
  .then((response) => response.json())
  .then((data) => {
    allProducts = data;
    renderProducts(allProducts);
    console.log('Productos cargados:', data);
  })
  .catch(() => {
    renderProducts();
  });
