document.addEventListener('DOMContentLoaded', () => {
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

  const audio = document.querySelector('.sfx-chime');
  if (audio) {
    audio.volume = 0.1;
    audio.play().catch(() => {
      console.log("🔕 El navegador bloqueó el autoplay.");
    });
  }

  // 🎇 Solo si quieres estrellas mágicas en carta
  if (document.getElementById("stars-container")) {
    generarEstrellitas();
  }

  // Mostrar carta después de 2 segundos
  const carta = document.getElementById("carta");
  if (carta) {
    setTimeout(() => carta.classList.remove("oculto"), 2000);
  }
});

function pintarCarta(productos) {
  const contenedor = document.getElementById('contenedor-productos');
  if (!contenedor) return;

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
    
    contenedor.appendChild(carta);
  });
}

function generarEstrellitas() {
  const contenedor = document.getElementById("stars-container");

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

  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes caer {
      to {
        transform: translateY(100vh);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}
