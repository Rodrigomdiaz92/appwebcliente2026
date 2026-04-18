// Esta es la clave con la que guardamos el carrito en el navegador.
const CART_STORAGE_KEY = 'cart-products';



function getCarrito() { // buscamos si ya había prod guardados
  const storedCarrito = localStorage.getItem(CART_STORAGE_KEY);

  // Si no hay nada, arrancamos con un carrito vacío.
  if (!storedCarrito) {
    return [];
  }

  try {
    // se convierte el texto guardado a un array 
    const carrito = JSON.parse(storedCarrito);
    return Array.isArray(carrito) ? carrito : [];
  } catch (error) {
    // Si falla la lectura, devolvemos vacio para que no se rompa
    console.error('No se pudo leer el carrito:', error);
    return [];
  }
}

// Aca guardamos el carrito actualizado
function guardarCarrito(carrito) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(carrito));
}

// fun q agrega un prod al carrito
function agregarProdACarrito(product) {
  const carrito = getCarrito();
  const productoExistente = carrito.find((item) => item.id === product.id);




  // Si ya estaba, sumamos 1
  if (productoExistente) {
    productoExistente.quantity += 1;
  } else {

    // Si no estaba, de agreg
    carrito.push({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  }

  guardarCarrito(carrito);
  // Desp de guardar, volvemos a monstrar el carrito en pantalla
  renderCarrito();
}

// Esta parte muestra el contenido del carrito
function renderCarrito() {
  const carritoBody = document.getElementById('cart-items');


  if (!carritoBody) {
    return;
  }

  const carrito = getCarrito();

  
  if (!carrito.length) {
    carritoBody.innerHTML = 'Tu carrito está vacío 🛒';// Si no hay productos, mostramos el mensaje de carrito vacio
    return;
  }

  

  const total = carrito.reduce((accumulator, product) => {
    return accumulator + (product.price * product.quantity);
  }, 0); // sacamos el total 

  // Aarmamos lo que se va a ver dentro del carrito.

  carritoBody.innerHTML = `
    <div class="d-flex flex-column gap-3">
      ${carrito.map((product) => `
        <div class="card border-0 shadow-sm">
          <div class="card-body d-flex gap-3 align-items-center">
            <img
              src="${product.image}"
              alt="${product.title}"
              class="rounded"
              style="width: 72px; height: 72px; object-fit: cover;"
            >
            <div class="flex-grow-1">
              <h6 class="mb-1">${product.title}</h6>
              <p class="mb-1 text-muted">Cantidad: ${product.quantity}</p>
              <p class="mb-0 fw-semibold">$USD ${(product.price * product.quantity).toFixed(2)}</p>
            </div>
          </div>
        </div>
      `).join('')}
      <div class="border-top pt-3">
        <p class="mb-0 fw-bold">Total: $USD ${total.toFixed(2)}</p>
      </div>
    </div>
  `;
}

// Dejamos estas funciones listas para usarlas desde otros archivos.
window.cartUtils = {
  addProductToCart: agregarProdACarrito,
  agregarProdACarrito,
  renderCarrito
};

//ni bien abre la pag muestra el carrito
renderCarrito();
