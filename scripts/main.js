const API_URL = 'https://web-api-products.runasp.net/api/Products';
const productsContainer = document.getElementById('products-container');
const categoryContainer = document.getElementById('categorys-container');
const busqForm = document.getElementById('search-form');
const busqInput = document.getElementById('search-input');
let allProducts = [];
let allCategories = [];
const API_CATEGORIES = "https://web-api-products.runasp.net/api/Categories";


document.addEventListener("click", (e) => {
  const card = e.target.closest(".product-card");
  if (card && !e.target.closest(".add-to-cart-btn")) {
    const id = card.dataset.id;
    window.location.href = `./docs/detalle.html?id=${id}`;
  }
});

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
      <div class="col-12 col-sm-6 col-lg-4 product-card"" data-id="${product.id}">
        <div class="card h-100 shadow-sm">
          <img src="${product.image}" class="card-img-top" alt="${product.title}">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text text-muted small">
              ${product.description.substring(0, 100)}...
            </p>
             <div class="d-flex justify-content-between align-items-center mt-auto">
               <span class="fw-bold fs-5">$${product.price}</span>
               <div class="d-flex gap-2">
                 <button class="btn btn-success btn-sm add-to-cart-btn" data-product-id="${product.id}">
                   Agregar al carrito
                 </button>
                 
               </div>
             </div>

          </div>
        </div>
      </div>
    `;
  }).join('');
}

function renderCategory(category = []) {
  if (!categoryContainer) return;

  if (!category.length) {
    categoryContainer.innerHTML = `
      <div class="col-12">
        <p class="text-muted">No hay productos para mostrar.</p>
      </div>
    `;
    return;
  }

  categoryContainer.innerHTML = products.map((category) => {
    return `
      <button class="btn btn-outline-primary active flex-shrink-0" id="${category.id}">${category.name}</button>
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

if (productsContainer) {
  productsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart-btn')) {
      const productId = Number(e.target.dataset.productId);
      const product = allProducts.find(p => p.id === productId);
      if (product) {
        window.cartUtils?.addProductToCart(product);
        
        const elementoOffCanvas = document.getElementById('offcanvasRight');
        if (elementoOffCanvas && typeof bootstrap !== 'undefined') {
          const offcanvas = bootstrap.Offcanvas.getOrCreateInstance(elementoOffCanvas);
          offcanvas.show();
        }
      }
    }
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

fetch(API_CATEGORIES)
  .then((response) => response.json())
  .then((data) => {
    allCategories = data;
    console.log('categorias cargados:', data);
    renderCategory(allCategories)
  })
  .catch(() => {
    console.log('Error al cargar categorías');
  });