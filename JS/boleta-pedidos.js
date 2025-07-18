document.addEventListener("DOMContentLoaded", () => {
  const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
  const contenedor = document.getElementById("detalle-pedido");


  let total = 0;

  pedidos.forEach((producto, index) => {
    const precio = parseFloat(producto.precio);
    total += precio;

    const item = document.createElement("div");
    item.classList.add("card-pedido", "boleta-item"); // reutiliza tus clases existentes

    item.innerHTML = `
      <div class="card-content">
        <h4>${index + 1}. ${producto.nombre}</h4>
        <p class="precio">S/ ${precio.toFixed(2)}</p>
      </div>
    `;

    contenedor.appendChild(item);
  });

  // Total
  const totalDiv = document.createElement("div");
  totalDiv.classList.add("total-boleta");
  totalDiv.innerHTML = `<p><strong>Total a pagar:</strong> S/ ${total.toFixed(2)}</p>`;
  contenedor.appendChild(totalDiv);

  // Sonido de confirmación
  const chime = document.getElementById("sfx-gong");
  if (chime) chime.play();

  // Vacía el carrito después de generar la boleta
  localStorage.removeItem("pedidos");
});
