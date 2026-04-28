const Skeleton = {
  renderProductDetail: (container) => {
    if (!container) return;
    container.innerHTML = `
      <a href="../index.html" class="btn btn-link px-0 mb-4">← Volver al catálogo</a>
      <div class="row g-4">
        <div class="col-12 col-md-6">
          <div class="card border-0 shadow-sm">
            <div class="skeleton skeleton-image"></div>
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div class="skeleton skeleton-title"></div>
          <div class="mb-3">
            <div class="skeleton skeleton-text" style="width: 100px;"></div>
          </div>
          <div class="skeleton skeleton-text" style="width: 150px; height: 1.5rem; margin-bottom: 1rem;"></div>
          <div class="skeleton skeleton-text" style="width: 90%;"></div>
          <div class="skeleton skeleton-text" style="width: 80%;"></div>
          <div class="skeleton skeleton-text" style="width: 70%;"></div>
          <div class="skeleton skeleton-text" style="width: 85%;"></div>
          <div class="mt-4 d-grid gap-2 d-md-flex">
            <div class="skeleton skeleton-button"></div>
            <div class="skeleton skeleton-button"></div>
          </div>
        </div>
      </div>
    `;
  },

  renderProductCards: (container, count = 8) => {
    if (!container) return;
    container.innerHTML = Array(count).fill(0).map(() => `
      <div class="col-12 col-sm-6 col-lg-4">
        <div class="card h-100 shadow-sm">
          <div class="skeleton card-img-top"></div>
          <div class="card-body d-flex flex-column">
            <div class="skeleton skeleton-title" style="width: 80%;"></div>
            <div class="skeleton skeleton-text"></div>
            <div class="skeleton skeleton-text" style="width: 60%;"></div>
            <div class="d-flex justify-content-between align-items-center mt-auto">
              <div class="skeleton skeleton-text" style="width: 60px; height: 1.2rem;"></div>
              <div class="skeleton skeleton-button" style="width: 120px; height: 2rem;"></div>
            </div>
          </div>
        </div>
      </div>
    `).join('');
  }
};
