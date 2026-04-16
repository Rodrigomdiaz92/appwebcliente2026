const API_URL = 'https://web-api-products.runasp.net/api/Products';
const productContainer = document.getElementById('product-container');
const params = new URLSearchParams(window.location.search);
const recordId = params.get("id"); 


console.log('ID del producto:', recordId);



function renderProduct(product) {

  if (product) {
    const p = product;
    console.log('Campos del producto:', p);

    productContainer.innerHTML = `
    <a href="../index.html" class="btn btn-link px-0 mb-4">← Volver al catálogo</a>

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
        <span class="badge text-bg-light mb-2">Categoría</span>

        <h2 class="mb-3">${p.title}</h2>

        <div class="mb-3">
          <span class="text-warning fs-5">★★★★☆</span>
          <span class="text-muted ms-2">(${p.rates} reseñas)</span>
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
          <button class="btn btn-primary btn-lg">Comprar ahora</button>
          <button class="btn btn-outline-secondary btn-lg">Agregar al carrito</button>
        </div>
      </div>
    </div>

    <section class="mt-5">
      <h4 class="mb-4">Tiendas disponibles</h4>

      <div class="table-responsive">
        <table class="table table-hover align-middle">
          <thead class="table-light">
            <tr>
              <th>Tienda</th>
              <th>Ubicación</th>
              <th>Precio</th>
              <th>Stock</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>BS Store</td>
              <td>Buenos Aires</td>
              <td class="text-success">$USD ${p.price.toFixed(2)}</td>
              <td><span class="badge bg-success">Disponible</span></td>
              <td><button class="btn btn-sm btn-primary">Ver tienda</button></td>
            </tr>
            <tr>
              <td>Digital Market</td>
              <td>Córdoba</td>
              <td class="text-success">$USD ${p.price.toFixed(2)}</td>
              <td><span class="badge bg-warning text-dark">Poco stock</span></td>
              <td><button class="btn btn-sm btn-primary">Ver tienda</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>  

   `;
  }else {
    productContainer.innerHTML = `<p>Producto no encontrado.</p>`;
  }
  
}

fetch(API_URL)
  .then((response) => response.json())
  .then((data) => {
    const product = data.find(p => p.id === Number(recordId));
    console.log('Producto encontrado:', product);
    renderProduct(product);    
    console.log('Productos cargado:', data);
  })
  .catch((e) => {
    console.error(e);
  });


  /*
  <a href="../index.html" class="btn btn-link px-0 mb-4">← Volver al catálogo</a>

    <div class="row g-4">

      <div class="col-12 col-md-6">
        <div class="card border-0 shadow-sm">
          <img
            src="https://placehold.co/600x500"
            class="img-fluid rounded"
            alt="Producto"
          >
        </div>
      </div>

      <div class="col-12 col-md-6">
        <span class="badge text-bg-light mb-2">Categoría</span>

        <h2 class="mb-3">Nombre del producto</h2>

        <div class="mb-3">
          <span class="text-warning fs-5">★★★★☆</span>
          <span class="text-muted ms-2">(120 reseñas)</span>
        </div>

        <h3 class="text-success mb-3">$249.999</h3>

        <p class="text-muted">
          Aquí se mostrará la descripción del producto seleccionado, sus características y los datos más importantes para el cliente.
        </p>

        <ul class="list-group list-group-flush mb-4">
          <li class="list-group-item">✔ Stock disponible</li>
          <li class="list-group-item">✔ Envío gratis</li>
          <li class="list-group-item">✔ Garantía 12 meses</li>
        </ul>

        <div class="d-grid gap-2 d-md-flex">
          <button class="btn btn-primary btn-lg">Comprar ahora</button>
          <button class="btn btn-outline-secondary btn-lg">Agregar al carrito</button>
        </div>
      </div>
    </div>

    <section class="mt-5">
      <h4 class="mb-4">Tiendas disponibles</h4>

      <div class="table-responsive">
        <table class="table table-hover align-middle">
          <thead class="table-light">
            <tr>
              <th>Tienda</th>
              <th>Ubicación</th>
              <th>Precio</th>
              <th>Stock</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Tech Store</td>
              <td>Buenos Aires</td>
              <td class="text-success">$249.999</td>
              <td><span class="badge bg-success">Disponible</span></td>
              <td><button class="btn btn-sm btn-primary">Ver tienda</button></td>
            </tr>
            <tr>
              <td>Digital Market</td>
              <td>Córdoba</td>
              <td class="text-success">$255.000</td>
              <td><span class="badge bg-warning text-dark">Poco stock</span></td>
              <td><button class="btn btn-sm btn-primary">Ver tienda</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  
  */