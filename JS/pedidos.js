document.addEventListener('DOMContentLoaded', () => {
  fetch('JSON/pedidos.json')
    .then(response => {
      if (!response.ok) throw new Error('Error cargando los pedidos');
      return response.json();
    })
    .then(data => {
      pintarPedido(data); // 👈 nombre correcto
    })
    .catch(error => {
      console.error('Error al cargar los pedidos:', error);
    });

  const audio = document.querySelector('.sfx-chime');
  if (audio) {
    audio.volume = 0.1;
    audio.play().catch(() => {
      console.log("🔕 El navegador bloqueó el autoplay.");
    });
  }

  if (document.getElementById("stars-container")) {
    generarEstrellitas();
  }

  const pedido = document.getElementById("pedido"); // 👈 aquí usamos el ID real
  if (pedido) {
    setTimeout(() => pedido.classList.remove("oculto"), 2000);
  }
});

function pintarPedido(pedidos) {
  const contenedor = document.getElementById('contenedor-pedidos');
  if (!contenedor) return;

  pedidos.forEach(pedido => {
    const item = document.createElement('div');
    item.classList.add('card-pedido');

    item.innerHTML = `
      <div class="pedido-info">
        <h4>Cliente: ${pedido.cliente}</h4>
        <p><strong>Producto:</strong> ${pedido.producto}</p>
        <p><strong>Cantidad:</strong> ${pedido.cantidad}</p>
        <p><strong>Total:</strong> S/. ${pedido.total}</p>
      </div>`;
    
    contenedor.appendChild(item);
  });
}
