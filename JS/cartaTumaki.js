document.addEventListener("DOMContentLoaded", () => {
  const chime = document.getElementById("chime-sound");
  const carta = document.getElementById("carta");

  // 🧙‍♂️ Suena la magia
  chime.play().catch(e => console.log("🎧 Sonido bloqueado por el navegador"));

  // 🌠 Estrellas
  generarEstrellitas();

  // ⏱ Mostrar carta después de 2 segundos
  setTimeout(() => {
    carta.classList.remove("oculto");
  }, 2000);
});

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
