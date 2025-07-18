document.addEventListener('DOMContentLoaded', () => {
  const btnCarrito = document.getElementById('btn-carrito');
  const sidebar = document.getElementById('sidebar-carrito');
  const cerrarCarrito = document.getElementById('cerrar-carrito');
  const contenidoCarrito = document.getElementById('contenido-carrito');
  const totalPrecio = document.getElementById('total-precio');
  const btnFinalizar = document.querySelector('.finalize-order-button');
  const badge = document.getElementById('cart-count');
  const contenedor = document.getElementById('contenedor-productos');

  // Recuperamos el carrito de localStorage (si existe)
  let carrito = JSON.parse(localStorage.getItem('pedidos')) || [];

  // Carga productos desde JSON
  fetch('JSON/pedidos.json')
    .then(response => {
      if (!response.ok) throw new Error('Error cargando la carta');
      return response.json();
    })
    .then(data => {
      pintarCarta(data);
    })
    .catch(error => {
      console.error('Error al cargar la carta:', error);
    });

  // Mostrar productos en el HTML
  function pintarCarta(productos) {
    if (!contenedor) return;

    productos.forEach(producto => {
      const carta = document.createElement('div');
      carta.classList.add('card-pedido');

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
        </div>`;

      const boton = carta.querySelector('.overlay-add-button');
      boton.addEventListener('click', () => agregarAlCarrito(producto));

      contenedor.appendChild(carta);
    });
  }

  // Agregar al carrito
  function agregarAlCarrito(producto) {
    carrito.push(producto);
    localStorage.setItem('pedidos', JSON.stringify(carrito));
    actualizarCarritoUI();
  }

  // Actualizar contenido del carrito
  function actualizarCarritoUI() {
    contenidoCarrito.innerHTML = '';
    let total = 0;

    if (carrito.length === 0) {
      contenidoCarrito.innerHTML = `<p class="carrito-empty">Tu carrito está vacío.</p>`;
      badge.textContent = "0";
      totalPrecio.textContent = "S/ 0.00";
      btnFinalizar.disabled = true;
      return;
    }

    carrito.forEach((producto, index) => {
      const item = document.createElement('div');
      item.classList.add('carrito-item');

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

  // Eventos
  btnCarrito.addEventListener('click', () => {
    sidebar.classList.toggle('activo');
  });

  cerrarCarrito.addEventListener('click', () => {
    sidebar.classList.remove('activo');
  });

  // Inicializamos la vista del carrito
  actualizarCarritoUI();

  // Exponemos la función al `window` (por si la usas desde HTML)
  window.agregarAlCarrito = agregarAlCarrito;
});
