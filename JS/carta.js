  document.addEventListener('DOMContentLoaded', () => {
      // Cargar productos de la carta
      fetch('JSON/carta.json')
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

      // Sonido de entrada
      const audio = document.querySelector('.sfx-chime');
      if (audio) {
        audio.volume = 0.1;
        audio.play().catch(() => {
          console.log("🔕 El navegador bloqueó el autoplay. Espera interacción.");
        });
      }
    });

    function pintarCarta(productos) {
      const contenedor = document.getElementById('contenedor-productos');

      if (!contenedor) {
        console.warn('No se encontró el contenedor de productos');
        return;
      }

      contenedor.innerHTML = '';

      productos.forEach(producto => {
        const carta = document.createElement('div');
        carta.classList.add('card-pedido');

        carta.innerHTML = `
          <div class="image-container">
            <img class="product-image" src="${producto.imagen}" alt="${producto.nombre}" />
          </div>
          <div class="card-content">
            <h4>${producto.nombre}</h4>
            <p class="descripcion">${producto.descripcion || ''}</p>
          </div>`;

        
        document.querySelectorAll('.overlay-add-button').forEach(boton => {
          boton.addEventListener('click', e => {
      const producto = JSON.parse(boton.dataset.producto);
      guardarPedido(producto);
    });
  });

    contenedor.appendChild(carta);
  });
}