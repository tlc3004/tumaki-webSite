document.addEventListener("DOMContentLoaded", () => {
  const chime = document.querySelector(".sfx-chime");
  const contenedorCarta = document.getElementById("pedido");
  const contenedorEstrellas = document.getElementById("stars-container");
  const contenedorProductos = document.getElementById("contenedor-productos");
  const btnCarrito = document.getElementById("btn-carrito");
  const sidebar = document.getElementById("sidebar-carrito");
  const cerrarCarrito = document.getElementById("cerrar-carrito");
  const contenidoCarrito = document.getElementById("contenido-carrito");
  const totalPrecio = document.getElementById("total-precio");
  const btnFinalizar = document.querySelector(".finalize-order-button");
  const badge = document.getElementById("cart-count");

  let carrito = JSON.parse(localStorage.getItem("pedidos")) || [];

  // 🔊 Sonido mágico al cargar (ya tiene autoplay, pero aseguramos)
  chime?.play().catch(() => console.log("🎧 Sonido bloqueado por el navegador"));

  // 🌠 Estrellitas
  if (contenedorEstrellas) generarEstrellitas(contenedorEstrellas);

  // 🕒 Mostrar contenedor luego de 2 segundos
  setTimeout(() => {
    contenedorCarta?.classList.remove("oculto");
  }, 2000);

  // 🛍️ Cargar productos
  if (contenedorProductos) {
    fetch("JSON/pedidos.json")
      .then(res => res.ok ? res.json() : Promise.reject("Error al cargar carta"))
      .then(data => pintarCarta(data))
      .catch(err => console.error("💥 Error:", err));
  }

  function pintarCarta(productos) {
    productos.forEach(producto => {
      const carta = document.createElement("div");
      carta.classList.add("card-pedido");
      carta.innerHTML = `
        <div class="image-container">
          <img class="product-image" src="${producto.imagen}" alt="${producto.nombre}" />
          <div class="image-overlay">
            <button class="overlay-add-button" title="Agregar al carrito">+</button>
          </div>
        </div>
        <div class="card-content">
          <h4>${producto.nombre}</h4>
          <p class="precio">S/ ${parseFloat(producto.precio).toFixed(2)}</p>
        </div>
      `;
      carta.querySelector(".overlay-add-button")
        .addEventListener("click", () => agregarAlCarrito(producto));
      contenedorProductos.appendChild(carta);
    });
  }

  function agregarAlCarrito(producto) {
    carrito.push(producto);
    localStorage.setItem("pedidos", JSON.stringify(carrito));
    actualizarCarritoUI();
  }

  function actualizarCarritoUI() {
    contenidoCarrito.innerHTML = "";
    let total = 0;

    if (carrito.length === 0) {
      contenidoCarrito.innerHTML = `<p class="carrito-empty">Tu carrito está vacío.</p>`;
      badge.textContent = "0";
      totalPrecio.textContent = "S/ 0.00";
      btnFinalizar.disabled = true;
      return;
    }

    carrito.forEach(producto => {
      const item = document.createElement("div");
      item.classList.add("carrito-item");
      item.innerHTML = `
        <img src="${producto.imagen}" class="carrito-item-image" alt="${producto.nombre}" />
        <div class="carrito-item-info">
          <h5>${producto.nombre}</h5>
          <p class="carrito-item-price">S/ ${parseFloat(producto.precio).toFixed(2)}</p>
        </div>
      `;
      contenidoCarrito.appendChild(item);
      total += parseFloat(producto.precio);
    });

    badge.textContent = carrito.length;
    totalPrecio.textContent = `S/ ${total.toFixed(2)}`;
    btnFinalizar.disabled = false;
  }

  // 🎛️ Eventos del carrito
  btnCarrito?.addEventListener("click", () => sidebar?.classList.toggle("activo"));
  cerrarCarrito?.addEventListener("click", () => sidebar?.classList.remove("activo"));

  actualizarCarritoUI();
  window.agregarAlCarrito = agregarAlCarrito;
});

// 🌌 Estrellitas flotantes
function generarEstrellitas(contenedor) {
  for (let i = 0; i < 100; i++) {
    const estrella = document.createElement("div");
    estrella.style.position = "absolute";
    estrella.style.top = `-${Math.random() * 100}px`;
    estrella.style.left = `${Math.random() * 100}%`;
    estrella.style.width = "3px";
    estrella.style.height = "3px";
    estrella.style.background = "yellow";
    estrella.style.borderRadius = "50%";
    estrella.style.opacity = Math.random();
    estrella.style.animation = `caer ${2 + Math.random() * 3}s linear forwards`;
    estrella.style.zIndex = "998";
    contenedor.appendChild(estrella);
  }
}

// 💫 Animación de caída
const style = document.createElement("style");
style.innerHTML = `
@keyframes caer {
  to {
    transform: translateY(100vh);
    opacity: 0;
  }
}`;
document.head.appendChild(style);
