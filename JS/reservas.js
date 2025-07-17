document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-reserva');

        // Sonido de entrada
      const audio = document.querySelector('.sfx-chime');
      if (audio) {
        audio.volume = 0.1;
        audio.play().catch(() => {
          console.log("🔕 El navegador bloqueó el autoplay. Espera interacción.");
        });
      };
  
  form.addEventListener('submit', (e) => {
    e.preventDefault(); // Evita que se envíe el formulario

    const reserva = {
      numero_reserva: "TKM-" + Math.floor(Math.random() * 9000 + 1000), // auto genera ID simple
      nombre: form.nombre.value,
      email: form.email.value,
      fecha: form.fecha.value,
      hora: form.hora.value,
      personas: form.personas.value,
      comentario: form.comentarios.value,
      estado: "pendiente"
    };

    // Guardamos en localStorage
    localStorage.setItem("reservaTumaki", JSON.stringify(reserva));

    // Vamos a la boleta con sonido 😎
    const chime = new Audio("SOUNDS/notification-3-125767.mp3");
    chime.play();
    setTimeout(() => {
      window.location.href = "boleta-reserva.html";
    }, 400);
  });
});






  document.getElementById("ver-boleta").addEventListener("click", (e) => {
    e.preventDefault();

    const datosReserva = {
      nombre: document.getElementById("nombre").value,
      email: document.getElementById("email").value,
      fecha: document.getElementById("fecha").value,
      hora: document.getElementById("hora").value,
      personas: document.getElementById("personas").value,
      comentarios: document.getElementById("comentarios").value,
    };

    localStorage.setItem("reservaTumaki", JSON.stringify(datosReserva));

    const chime = new Audio("SOUNDS/notification-3-125767.mp3");
    chime.play();

    setTimeout(() => {
      window.location.href = "boleta-reserva.html";
    }, 300);
  });


  document.addEventListener('DOMContentLoaded', ()=>{
    fetch('JSON/sliderReservas.json')
    .then(res => res.json())
    .then(data => {
      const contenedor = document.getElementById('slider-reservas');
      data.forEach(item => {
        const div = document.createElement('div');
        div.innerHTML = 
      ` <img src="${item.imagen}" alt="${item.descripcion}" title="${item.descripcion}">`;
      contenedor.appendChild(div);
      });
    })

    .catch(err =>{
      console.error("no se cargaron las imagenes correctamente", err)
    });
  });