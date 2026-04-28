const CART_STORAGE_KEY = 'cart-products';

function getCarrito() {
  const storedCarrito = localStorage.getItem(CART_STORAGE_KEY);
  if (!storedCarrito) return [];
  try {
    const carrito = JSON.parse(storedCarrito);
    return Array.isArray(carrito) ? carrito : [];
  } catch (error) {
    console.error('No se pudo leer el carrito:', error);
    return [];
  }
}

function guardarCarrito(carrito) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(carrito));
}

function agregarProdACarrito(product) {
  const carrito = getCarrito();
  const productoExistente = carrito.find((item) => item.id === product.id);

  if (productoExistente) {
    productoExistente.quantity += 1;
  } else {
    carrito.push({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  }

  guardarCarrito(carrito);
  renderCarrito();
}

function removeProductFromCart(id) {
  const carrito = getCarrito().filter(item => item.id !== id);
  guardarCarrito(carrito);
  renderCarrito();
}

function increaseProductQuantity(id) {
  const carrito = getCarrito();
  const product = carrito.find(item => item.id === id);
  if (product) {
    product.quantity += 1;
    guardarCarrito(carrito);
    renderCarrito();
  }
}

function decreaseProductQuantity(id) {
  const carrito = getCarrito();
  const product = carrito.find(item => item.id === id);
  if (product) {
    product.quantity -= 1;
    if (product.quantity <= 0) {
      removeProductFromCart(id);
    } else {
      guardarCarrito(carrito);
      renderCarrito();
    }
  }
}

function clearCart() {
  guardarCarrito([]);
  renderCarrito();
}

function finalizarCompra() {
  const carrito = getCarrito();
  if (carrito.length === 0) {
    alert('El carrito está vacío.');
    return;
  }

  const modalElem = document.getElementById('modalConstruccion');
  if (modalElem && typeof bootstrap !== 'undefined') {
    const modal = bootstrap.Modal.getOrCreateInstance(modalElem);
    modal.show();
  } else {
    alert('Funcionalidad en construcción, ¡Muy pronto podrás realizar tus compras!');
  }

  const elementoOffCanvas = document.getElementById('offcanvasRight');
  if (elementoOffCanvas && typeof bootstrap !== 'undefined') {
    const offcanvas = bootstrap.Offcanvas.getOrCreateInstance(elementoOffCanvas);
    offcanvas.hide();
  }
}

function renderCarrito() {
  const carritoBody = document.getElementById('cart-items');
  if (!carritoBody) return;

  const carrito = getCarrito();

  if (!carrito.length) {
    carritoBody.innerHTML = `
      <div class="text-center py-5">
        <p class="text-muted">Tu carrito está vacío 🛒</p>
      </div>
    `;
    return;
  }

  const total = carrito.reduce((acc, product) => acc + (product.price * product.quantity), 0);

  carritoBody.innerHTML = `
    <div class="d-flex flex-column gap-3">
      <div class="d-flex flex-column gap-3">
        ${carrito.map((product) => `
          <div class="card border-0 shadow-sm">
            <div class="card-body d-flex gap-3 align-items-center">
              <img
                src="${product.image}"
                alt="${product.title}"
                class="rounded"
                style="width: 60px; height: 60px; object-fit: cover;"
              >
              <div class="flex-grow-1">
                <h6 class="mb-1 text-truncate" style="max-width: 150px;">${product.title}</h6>
                <p class="mb-1 fw-semibold">$USD ${(product.price * product.quantity).toFixed(2)}</p>
                <div class="d-flex align-items-center gap-2">
                  <button class="btn btn-sm btn-outline-secondary py-0 px-2" onclick="window.cartUtils.decreaseProductQuantity(${product.id})">-</button>
                  <span class="small">${product.quantity}</span>
                  <button class="btn btn-sm btn-outline-secondary py-0 px-2" onclick="window.cartUtils.increaseProductQuantity(${product.id})">+</button>
                  <button class="btn btn-sm btn-link text-danger p-0 ms-auto" onclick="window.cartUtils.removeProductFromCart(${product.id})" style="text-decoration: none; font-size: 0.8rem;">Eliminar</button>
                </div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
      
      <div class="border-top pt-3 mt-3">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <span class="fw-bold fs-5">Total:</span>
          <span class="fw-bold fs-5">$USD ${total.toFixed(2)}</span>
        </div>
        <div class="d-grid gap-2">
          <button class="btn btn-success btn-lg" onclick="window.cartUtils.finalizarCompra()">Finalizar compra</button>
          <button class="btn btn-outline-danger btn-sm" onclick="window.cartUtils.clearCart()">Vaciar carrito</button>
        </div>
      </div>
    </div>
  `;
}

window.cartUtils = {
  addProductToCart: agregarProdACarrito,
  removeProductFromCart: removeProductFromCart,
  increaseProductQuantity: increaseProductQuantity,
  decreaseProductQuantity: decreaseProductQuantity,
  clearCart: clearCart,
  finalizarCompra: finalizarCompra,
  renderCarrito
};

renderCarrito();
