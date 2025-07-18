document.addEventListener('DOMContentLoaded', () => {
  // 🔗 Botones del menú principal
  const links = document.querySelectorAll('.main button');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const section = link.getAttribute('data-section');
      openSection(section);
    });
  });

  // 🎵 Sonido de gong en botones del nav
  const mainButtons = document.querySelectorAll("nav button"); // ✅ corregido
  const gong = document.getElementById("sfx-chime");

  mainButtons.forEach(button => {
    button.addEventListener("click", () => {
      gong.currentTime = 0;
      gong.play();
    });
  });

  // 🛎️ Sonido chime en botones del main y nav
  configurarSonidoBotones();

  // 🎧 Audio de fondo automático
  configurarAudioDeFondo();

  // 🍣 Botón de reserva directo (si existe)
  const btn = document.getElementById("btn-reserva");
  if (btn) {
    btn.addEventListener("click", () => {
      console.log("Reservado 🍣");
    });
  }
});

// 📦 Carga secciones
function openSection(section) {
  if (section === 'Carta') {
    fetch('JSON/carta.json')
      .then(res => res.json())
      .then(data => {
        const html = CartaHTML(data); // Asegúrate que esta func esté definida
        mostrarModal('Nuestra Carta', html);
      })
      .catch(err => {
        mostrarModal("Error", `<p>Error al cargar la carta: ${err.message}</p>`);
      });
    return;
  }

  fetch(`data/${section.toLowerCase()}.html`)
    .then(res => res.text())
    .then(content => {
      mostrarModal(section, content);
    })
    .catch(err => {
      mostrarModal("Error", `<p>${err.message}</p>`);
    });

  let content = "";
  switch (section) {
    case 'Carta':
      content = getCarta();
      break;
    case 'Pedidos':
      content = getPedidos();
      break;
    case 'Reservas':
      content = getReservas();
      break;
    case 'Contacto':
      content = getContacto();
      break;
    case 'Información':
      content = getInfo();
      break;
    default:
      content = "<p>Sección no encontrada.</p>";
  }

  mostrarModal(section, content);
}

// 🎶 Configurar audio de fondo
function configurarAudioDeFondo() {
  const audio = document.querySelector('.bkmusik');
  if (audio) {
    audio.volume = 0.1;
    audio.play().catch(() => console.log("🎵 Esperando interacción"));
  }
}

// 🔔 Configurar sonido en botones
function configurarSonidoBotones() {
  const botones = document.querySelectorAll("main button, .nav-buttons button");
  const chime = document.getElementById("sfx-chime");
  if (!chime) return;

  botones.forEach(btn => {
    btn.addEventListener("click", () => {
      chime.currentTime = 0;
      chime.play();
    });
  });
}

// ⬇️ Hacer accesibles globalmente si quieres usarlas desde otros archivos
window.configurarAudioDeFondo = configurarAudioDeFondo;
window.configurarSonidoBotones = configurarSonidoBotones;
