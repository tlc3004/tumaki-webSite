document.addEventListener('DOMContentLoaded', () => {
  const slider = document.getElementById('slider-rollitos');

  let desplazamiento = 0;
  const tiempoAnimacion = 100; // en ms
  const intervalo = 2400; // cada 2 segundos

  setInterval(() => {
    const firstChild = slider.firstElementChild;
    const width = firstChild.offsetWidth + 16; // ancho + gap (ajústalo si cambias el CSS)

    // Aplica transición y desplaza el slider
    slider.style.transition = `transform ${tiempoAnimacion}ms ease`;
    slider.style.transform = `translateX(-${width}%)`;

    // Después de la animación, reseteamos y movemos el primer hijo al final
    setTimeout(() => {
      slider.style.transition = 'none';
      slider.appendChild(firstChild);
      slider.style.transform = 'translateX(0)';
    }, tiempoAnimacion);
  }, intervalo);
});
