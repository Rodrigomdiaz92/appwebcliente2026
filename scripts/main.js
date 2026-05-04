const API_URL = 'https://web-api-products.runasp.net/api/Products';
const productsContainer = document.getElementById('products-container');
const categoryContainer = document.getElementById('categorys-container');
const busqForm = document.getElementById('search-form');
const busqInput = document.getElementById('search-input');
let allProducts = [];
let allCategories = [];
let categoriaActivaId = null;
const API_CATEGORIES = "https://web-api-products.runasp.net/api/Categories";
const loader = document.getElementById('loader');
const mainContent = document.getElementById('main-content');

let productosCargados = false;
let categoriasCargadas = false;







const nombresCategoria = {
  Electronics: 'Electrónica',
  Clothing: 'Ropa',
  Sports: 'Deportes',
  'Home & Kitchen': 'Hogar',
  'Home & furniture': 'Muebles'
};

function nombreCategoria(category) {
  return nombresCategoria[category.name] || category.name;
}

document.addEventListener("click", (e) => {
  const card = e.target.closest(".product-card");
  if (card && !e.target.closest(".add-to-cart-btn")) {
    const id = card.dataset.id;
    window.location.href = `./docs/detalle.html?id=${id}`;
  }
});

function renderProducts(products = []) {
  if (!productsContainer) return;
  productsContainer.innerHTML = ' ';

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
      <div class="col-12 col-sm-6 col-lg-4 product-card" data-id="${product.id}">
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


function renderCategory(categories = []) {
  if (!categoryContainer) return;

  const categoriasVisibles = categories.filter((category) => {
    const nombre = category?.name?.trim();
    return nombre && nombre.toLowerCase() !== 'string';
  });

  const claseTodas = categoriaActivaId === null ? 'active' : '';

  categoryContainer.innerHTML = `
    <button class="btn btn-outline-primary ${claseTodas} flex-shrink-0 category-filter-btn" data-category-id="all">
      Todas
    </button>
    ${categoriasVisibles.map((category) => {
      const idCategoria = Number(category.id);
      const claseActiva = categoriaActivaId === idCategoria ? 'active' : '';
      const nombre = nombreCategoria(category);

      return `
        <button 
          class="btn btn-outline-primary ${claseActiva} flex-shrink-0 category-filter-btn" 
          data-category-id="${idCategoria}">
          ${nombre}
        </button>
      `;
    }).join('')}
  `;
}


function aplicarFiltros() {
  const busqueda = busqInput ? busqInput.value.trim().toLowerCase() : '';

  let productosFiltrados = allProducts.filter((product) => {
    const okCategoria = categoriaActivaId === null || Number(product.categoryId) === categoriaActivaId;

    const okBusqueda = !busqueda
      || product.title.toLowerCase().includes(busqueda)
      || product.description.toLowerCase().includes(busqueda);

    return okCategoria && okBusqueda;
  });

  
  if (busqueda) {
    productosFiltrados = productosFiltrados.slice(0, 2);
  }

  renderProducts(productosFiltrados);
}

function filtrarProductos(terminosBusq = '') {
  if (busqInput && busqInput.value !== terminosBusq) {
    busqInput.value = terminosBusq;
  }

  aplicarFiltros();
}


if (categoryContainer) {
  categoryContainer.addEventListener('click', (event) => {
    const btn = event.target.closest('.category-filter-btn');
    if (!btn) return;

    const id = btn.dataset.categoryId;
    categoriaActivaId = id === 'all' ? null : Number(id);    
    renderCategory(allCategories);    
    aplicarFiltros();
  });
}

if (busqForm) {
  busqForm.addEventListener('submit', (event) => {
    event.preventDefault();
    filtrarProductos(busqInput ? busqInput.value : '');
  });
}

if (busqInput) {  
  let timeoutBusqueda;

busqInput.addEventListener('input', () => {
  clearTimeout(timeoutBusqueda);

  timeoutBusqueda = setTimeout(() => {
    aplicarFiltros();
  }, 300);
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
    aplicarFiltros();
  })
  .catch(() => {
    console.error("Error cargando productos");
  })
  .finally(() => {
    console.log("Productos cargados correctamente");
  });



  fetch(API_CATEGORIES)
  .then((response) => response.json())
  .then((data) => {
    allCategories = data;
    renderCategory(allCategories);
  })
  .catch(() => {
    console.error("Error cargando categorías");
  });