document.addEventListener('DOMContentLoaded', () => {
  cargarProductos();
  inicializarCarrito();
  configurarSidebarCarrito();
});

      // Sonido de entrada
      const audio = document.querySelector('.sfx-chime');
      if (audio) {
        audio.volume = 0.1;
        audio.play().catch(() => {
          console.log("🔕 El navegador bloqueó el autoplay. Espera interacción.");
        });
      };


// Cargar productos desde pedidos.json y pintarlos
function cargarProductos() {
  fetch('JSON/pedidos.json') // Ajusta ruta si cambia
    .then(res => res.json())
    .then(productos => pintarProductos(productos))
    .catch(err => console.error("❌ Error cargando productos:", err));
}

function pintarProductos(productos) {
  const contenedor = document.getElementById('contenedor-productos');
  if (!contenedor) return;

  productos.forEach(producto => {
    const carta = document.createElement('div');
    carta.classList.add('card-pedido');
    carta.innerHTML = `
      <div class="image-container">
        <img src="${producto.imagen}" alt="${producto.nombre}" class="product-image" />
        <div class="image-overlay">
          <button class="overlay-add-button" data-producto='${JSON.stringify(producto)}'>+</button>
        </div>
      </div>
      <div class="card-content">
        <h4>${producto.nombre}</h4>
        <p class="precio">S/ ${producto.precio}</p>
        <button class="add-to-cart-button" data-producto='${JSON.stringify(producto)}'>Agregar</button>
      </div>
    `;
    contenedor.appendChild(carta);
  });

  // Eventos para botones
  document.querySelectorAll('.overlay-add-button, .add-to-cart-button').forEach(boton => {
    boton.addEventListener('click', () => {
      const producto = JSON.parse(boton.dataset.producto);
      agregarAlCarrito(producto);
    });
  });
}

// Agregar al carrito
function agregarAlCarrito(producto) {
  let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
  pedidos.push(producto);
  localStorage.setItem("pedidos", JSON.stringify(pedidos));
  renderizarCarritoSidebar(pedidos);

  // const chime = new Audio("SOUNDS/notification-3-125767.mp3");
  // chime.play();
}

// Mostrar los productos en el sidebar del carrito
function renderizarCarritoSidebar(pedidos) {
  const contenido = document.getElementById("contenido-carrito");
  const totalPrecio = document.getElementById("total-precio");
  const badge = document.getElementById("cart-count");
  const btnFinalizar = document.querySelector(".finalize-order-button");

  if (!contenido || !totalPrecio || !badge || !btnFinalizar) return;

  contenido.innerHTML = '';
  if (pedidos.length === 0) {
    contenido.innerHTML = `<p class="carrito-empty">Tu carrito está vacío.</p>`;
    totalPrecio.textContent = "S/ 0.00";
    badge.textContent = "0";
    btnFinalizar.disabled = true;
    return;
  }

  let total = 0;
  pedidos.forEach(prod => {
    total += parseFloat(prod.precio.toString().replace(",", ".").trim());
    const item = document.createElement("div");
    item.classList.add("item-carrito");
    item.innerHTML = `<p><strong>${prod.nombre}</strong> - S/ ${prod.precio}</p>`;
    contenido.appendChild(item);
  });

  totalPrecio.textContent = `S/ ${total.toFixed(2)}`;
  badge.textContent = pedidos.length;
  btnFinalizar.disabled = false;
}

// Cargar el carrito al iniciar la página
function inicializarCarrito() {
  const pedidosGuardados = JSON.parse(localStorage.getItem("pedidos")) || [];
  renderizarCarritoSidebar(pedidosGuardados);
}

// Mostrar/ocultar sidebar
function configurarSidebarCarrito() {
  const btnCarrito = document.getElementById("btn-carrito");
  const sidebar = document.getElementById("sidebar-carrito");
  const cerrar = document.getElementById("cerrar-carrito");

  if (btnCarrito && sidebar && cerrar) {
    btnCarrito.addEventListener("click", () => {
      sidebar.style.right = "0";
    });
    cerrar.addEventListener("click", () => {
      sidebar.style.right = "-100%";
    });
  }
}
