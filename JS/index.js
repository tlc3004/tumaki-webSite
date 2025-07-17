document.addEventListener('DOMContentLoaded',() => {
    const links = document.querySelectorAll('.main button');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.getAttribute('data-section');
            openSection(section);
        });
    });
});

function openSection(section) {

    if (section === 'Carta') {
        fetch('JSON/carta.json')
        .then(res => res.json())
        .then(data => {
            const html = CartaHTML(data);
            mostrarModal('Nuestra Carta', html);
        })
        .catch(err => {
            mostrarModal("Error", `<p>Error al cargar la carta:${ err.message }</p>`);
        });
        return
    }
    
    fetch(`data/${section.toLowerCase()}.html`)
    .then(res => res.text())
    .then(content => {
        mostrarModal(section, content);
    })
    .catch(err => {
        mostrarModal("Error", `${err.message}</p`);
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

// SONIDO DE LMAIN
document.addEventListener("DOMContentLoaded", () => {
  const mainButtons = document.querySelectorAll("nav buttons");
  const gong = document.getElementById("sfx-gong");

  mainButtons.forEach(button => {
    button.addEventListener("click", () => {
      gong.currentTime = 0;
      gong.play();
    });
  });
});



export function configurarAudioDeFondo() {
  const audio = document.querySelector('.bkmusik');
  if (audio) {
    audio.volume = 0.1;
    audio.play().catch(() => console.log("🎵 Esperando interacción"));
  }
}

export function configurarSonidoBotones() {
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
