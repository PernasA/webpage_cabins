// --- Mostrar la pestaña por defecto ---
showTab('info', ' ');

// --- Manejo de botones de navegación ---
document.querySelectorAll('nav button').forEach(button => {
  button.addEventListener('click', (e) => {
    const id = e.target.getAttribute('onclick')?.match(/'(.+?)'/)?.[1];
    if (id) showTab(id, button);
  });
});

// --- Carruseles simples automáticos ---
document.querySelectorAll('[data-carousel]').forEach(carousel => {
  const images = carousel.querySelectorAll('img');
  let index = 0;

  if (images.length > 0) {
    images[0].classList.add('active');
  }

  setInterval(() => {
    images[index].classList.remove('active');
    index = (index + 1) % images.length;
    images[index].classList.add('active');
  }, 3000);
});

// --- Navegación manual de Glider con botones ---
document.querySelectorAll('.glider-prev').forEach(btn =>
  btn.addEventListener('click', () => {
    const gliderEl = btn.parentNode.querySelector('.glider');
    if (gliderEl._glider) {
      gliderEl._glider.scrollItem(gliderEl._glider.page - 1);
    }
  })
);

document.querySelectorAll('.glider-next').forEach(btn =>
  btn.addEventListener('click', () => {
    const gliderEl = btn.parentNode.querySelector('.glider');
    if (gliderEl._glider) {
      gliderEl._glider.scrollItem(gliderEl._glider.page + 1);
    }
  })
);

// --- Función para mostrar pestañas ---
function showTab(id, button) {
  // Oculta todas las secciones
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.classList.add('hidden');
  });

  // Muestra la sección seleccionada
  const target = document.getElementById(id);
  if (target) {
    target.classList.remove('hidden');
  }

  // Actualiza el título
  const titleElement = document.getElementById('selected-title');
  if (button) {
    titleElement.textContent = button.textContent;

    if(button.textContent == "Información General"){
      titleElement.textContent = ""
    }
    // Opcional animación suave
    titleElement.classList.remove('visible');
    void titleElement.offsetWidth; // forza reflow
    titleElement.classList.add('visible');
  }

  // Quita la clase 'selected' de todos los botones
  document.querySelectorAll('nav button').forEach(btn => {
    btn.classList.remove('selected');
  });

  // Agrega 'selected' solo al botón actual
  if (button) {
    button.classList.add('selected');
  }

  setTimeout(() => {
    target.querySelectorAll('.glider').forEach(gliderEl => {
      const isComentarios = gliderEl.id === 'glider-comentarios';

      if (!gliderEl.classList.contains('glider-initialized')) {
        const gliderInstance = new Glider(gliderEl, {
          slidesToShow: isComentarios ? 3 : 1.6,
          slidesToScroll: 1,
          draggable: true,
          rewind: true,
          scrollLock: true,
          arrows: {
            prev: gliderEl.parentElement.querySelector('.glider-prev'),
            next: gliderEl.parentElement.querySelector('.glider-next')
          },
          // opcional: más configuración para comentarios
          duration: isComentarios ? 0.4 : 0.25,
          dots: isComentarios ? true : false,
        });

        gliderEl._glider = gliderInstance;
        gliderEl.classList.add('glider-initialized');
      } else {
        gliderEl._glider.refresh(true);
      }
      if (isComentarios) {
        setInterval(() => {
          if (gliderEl._glider) {
            gliderEl._glider.scrollItem(gliderEl._glider.page + 1);
          }
        }, 4000);
      }

    });
  }, 100);
}
