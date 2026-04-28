const API_URL = 'https://web-api-products.runasp.net/api/Products';
const contenedorProducto = document.getElementById('product-container');
const params = new URLSearchParams(window.location.search);
const idProducto = params.get("id"); 


console.log('ID del producto:', idProducto);



function renderProduct(producto) {

  if (producto) {
    const p = producto;
    console.log('Campos del producto:', p);

    contenedorProducto.innerHTML = `
    <a href="../index.html" class="btn back-to-catalog mb-4">Volver al catálogo</a>

    <div class="row g-4">

      <div class="col-12 col-md-6">
        <div class="card border-0 shadow-sm">
          <img
            src=${p.image}
            class="img-fluid rounded"
            alt= ${p.title}
          >
        </div>
      </div>

      <div class="col-12 col-md-6">

        <h2 class="mb-3">${p.title}</h2>

        <div class="mb-3">
          <span class="text-warning fs-5">★★★★☆</span>
        </div>

        <h3 class="text-success mb-3">$USD ${p.price.toFixed(2)}</h3>

        <p class="text-muted">
          ${p.description}
        </p>

        <ul class="list-group list-group-flush mb-4">
          <li class="list-group-item">✔ Stock disponible</li>
          <li class="list-group-item">✔ Envío gratis</li>
          <li class="list-group-item">✔ Garantía 12 meses</li>
        </ul>

          <div class="d-grid gap-2 d-md-flex">
            <button class="btn btn-primary btn-lg" id="buy-now-button">Comprar ahora</button>
            <button class="btn btn-outline-secondary btn-lg" id="add-to-cart-button">Agregar al carrito</button>
          </div>

      </div>
    </div>

  `;

    // Los botones nacen despues del innerHTML, por eso se buscan aca.
    const btnAgrACarrito = document.getElementById('add-to-cart-button');
    const btnComprarYa = document.getElementById('buy-now-button');

    if (btnAgrACarrito) {
      btnAgrACarrito.addEventListener('click', () => {
        window.cartUtils?.addProductToCart(p);

        const elementoOffCanvas = document.getElementById('offcanvasRight');

        if (elementoOffCanvas && typeof bootstrap !== 'undefined') {
          const offcanvas = bootstrap.Offcanvas.getOrCreateInstance(elementoOffCanvas);
          offcanvas.show();
        }
      });
    }

    if (btnComprarYa) {
      btnComprarYa.addEventListener('click', () => {
        window.cartUtils?.addProductToCart(p);
        window.cartUtils?.finalizarCompra();
      });
    }
  }else {
    contenedorProducto.innerHTML = `<p>Producto no encontrado.</p>`;
  }
  
}

Skeleton.renderProductDetail(contenedorProducto);

fetch(API_URL)
  .then((response) => response.json())
  .then((data) => {
    const productoElegido = data.find(p => p.id === Number(idProducto));
    console.log('Producto encontrado:', productoElegido);
    renderProduct(productoElegido);    
    console.log('Productos cargado:', data);
  })
  .catch((e) => {
    console.error(e);
  });
