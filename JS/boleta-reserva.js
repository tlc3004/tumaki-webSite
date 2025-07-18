document.addEventListener("DOMContentLoaded", () => {
  // Simulando que estos datos vienen de localStorage (reserva hecha)
  const reserva = JSON.parse(localStorage.getItem("reservaTumaki")) || null;

  
  document.getElementById("nombre").value = reserva.nombre || "";
  document.getElementById("fecha").value = reserva.fecha || "";
  document.getElementById("hora").value = reserva.hora || "";
  document.getElementById("personas").value = reserva.personas || "";
  document.getElementById("comentarios").value = reserva.comentarios || "";
  
  if (!reserva) {
    alert("⚠️ No hay datos de reserva encontrados.");
    return;
  }
  // Opcional: puedes mostrar el número de reserva con fecha

  // Reproduce sonido
  
});
