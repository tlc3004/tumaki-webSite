document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-reserva');
  const verBoletaBtn = document.getElementById("ver-boleta");
  const sliderContainer = document.getElementById('slider-reservas');

  // 🎵 Sonido de entrada
  const audio = document.querySelector('.sfx-chime');
  if (audio) {
    audio.volume = 0.1;
    audio.play().catch(() => {
      console.log("🔕 El navegador bloqueó el autoplay. Espera interacción.");
    });
  }

  // 📋 Formulario de reserva
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const reserva = {
        numero_reserva: "TKM-" + Math.floor(Math.random() * 9000 + 1000),
        nombre: form.nombre.value,
        email: form.email.value,
        fecha: form.fecha.value,
        hora: form.hora.value,
        personas: form.personas.value,
        comentario: form.comentarios.value,
        estado: "pendiente"
      };

      localStorage.setItem("reservaTumaki", JSON.stringify(reserva));

      const chime = new Audio("SOUNDS/notification-3-125767.mp3");
      chime.play();

      setTimeout(() => {
        window.location.href = "boleta-reserva.html";
      }, 400);
    });
  }

  // 👀 Botón "ver boleta"
  if (verBoletaBtn) {
    verBoletaBtn.addEventListener("click", (e) => {
      e.preventDefault();

      const datosReserva = {
        nombre: document.getElementById("nombre")?.value || "",
        email: document.getElementById("email")?.value || "",
        fecha: document.getElementById("fecha")?.value || "",
        hora: document.getElementById("hora")?.value || "",
        personas: document.getElementById("personas")?.value || "",
        comentarios: document.getElementById("comentarios")?.value || "",
      };

      localStorage.setItem("reservaTumaki", JSON.stringify(datosReserva));

      const chime = new Audio("SOUNDS/notification-3-125767.mp3");
      chime.play();

      setTimeout(() => {
        window.location.href = "boleta-reserva.html";
      }, 300);
    });
  }

  // 🌠 Slider de imágenes desde JSON
  if (sliderContainer) {
    fetch('JSON/sliderReservas.json')
      .then(res => res.json())
      .then(data => {
        data.forEach(item => {
          const div = document.createElement('div');
          div.innerHTML = `<img src="${item.imagen}" alt="${item.descripcion}" title="${item.descripcion}">`;
          sliderContainer.appendChild(div);
        });
      })
      .catch(err => {
        console.error("No se cargaron las imágenes correctamente:", err);
      });
  }
});
