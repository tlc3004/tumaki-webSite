// MUSICA DE FONDO Y BOTONES

// en pedidos.js o reservas.js
document.addEventListener('DOMContentLoaded', () => {
  const audio = document.querySelector('.boleta-pedido, boleta-reserva');
  if (audio) {
    audio.volume = 0.1;
    audio.play().catch(() => {
      // Por si el navegador bloquea autoplay, puedes pedir acción con botón si quieres
      console.log("El usuario debe interactuar primero para reproducir el audio.");
    });
  }
});
