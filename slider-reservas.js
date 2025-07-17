document.addEventListener("DOMContentLoaded", () => {
  fetch("JSON/sliderReserva.json")
    .then(res => res.json())
    .then(imagenes => iniciarSlider(imagenes))
    .catch(err => console.error("Error cargando el slider:", err));
});

function iniciarSlider(imagenes) {
  const img = document.getElementById("slider-imagen");
  let i = 0; //  Declarar la variable 

  img.src = imagenes[i].url;
  aplicarAnimacion(img); //  primera imagen con animación

  setInterval(() => {
    i = (i + 1) % imagenes.length;
    img.src = imagenes[i].url;
    aplicarAnimacion(img); //  animación en cada cambio
  }, 3500);
}

function aplicarAnimacion(img) {
  img.classList.remove("animando-slider");
  void img.offsetWidth; 
  img.classList.add("animando-slider");
}
