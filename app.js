document.addEventListener("DOMContentLoaded", function () {
  // Efecto de scroll para el header
  const header = document.querySelector(".header");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Galería de imágenes
  const images = document.querySelectorAll(".gallery-img");
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.querySelector(".gallery-prev");
  const nextBtn = document.querySelector(".gallery-next");
  let currentIndex = 0;

  function showImage(index) {
    images.forEach((img) => img.classList.remove("active"));
    dots.forEach((dot) => dot.classList.remove("active"));

    images[index].classList.add("active");
    dots[index].classList.add("active");
    currentIndex = index;
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => showImage(index));
  });

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
  });

  // Cambio automático de imágenes cada 5 segundos
  setInterval(() => {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
  }, 5000);

  // Scroll suave para los enlaces del menú
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });

        // Cerrar menú móvil si está abierto
        const navLinks = document.getElementById("navLinks");
        if (navLinks.classList.contains("active")) {
          toggleMenu();
        }
      }
    });
  });

  // Observador de intersección para animaciones al hacer scroll
  const observerOptions = {
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
      }
    });
  }, observerOptions);

  document.querySelectorAll("section").forEach((section) => {
    observer.observe(section);
  });
});

// Función para el menú hamburguesa
function toggleMenu() {
  const navLinks = document.getElementById("navLinks");
  navLinks.classList.toggle("active");
}

//PRODUCTOS sección
// Tabs de categorías
const tabBtns = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remover clase active de todos los botones y contenidos
    tabBtns.forEach((btn) => btn.classList.remove("active"));
    tabContents.forEach((content) => content.classList.remove("active"));

    // Agregar clase active al botón clickeado
    btn.classList.add("active");

    // Mostrar el contenido correspondiente
    const category = btn.getAttribute("data-category");
    const activeTab = document.getElementById(category);
    activeTab.classList.add("active");

    // Resetear la galería de imágenes al cambiar de pestaña
    resetGallery(activeTab);
  });
});

// funcion para resetar la galería
function resetGallery(tabElement){
  // encontrar las imágenes dentro de la pestaña activa
  const thumbnails = tabElement.querySelectorAll(".thumbnails img");
  const mainImages = tabElement.querySelectorAll(".main-image img");
  
  // remover la clase active de todas las miniaturas y main images
  thumbnails.forEach((thumb) => thumb.classList.remove("active"));
  mainImages.forEach((img) => img.classList.remove("active"));

  //activar la primera imagen por defecto
  if(thumbnails.length > 0 && mainImages.length > 0){
    thumbnails[0].classList.add("active");
  //buscar la main image que coincida con la primera miniatura
    const firstThumbSrc = thumbnails[0].getAttribute("src");
    mainImages.forEach(img => {
      if(img.getAttribute("src") === firstThumbSrc){
        img.classList.add("active");
      }
    });
  }
}
// Galería de imágenes (manejo dentro de cada pestaña)
document.querySelectorAll(".tab-content").forEach(tab => {
  const thumbnails = tab.querySelectorAll(".thumbnails img");
  const mainImages = tab.querySelectorAll(".main-image img");

  thumbnails.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      // Remover clase active de todas las miniaturas en esta pestaña
      thumbnails.forEach((t) => t.classList.remove("active"));

      // Agregar clase active a la miniatura clickeada
      thumb.classList.add("active");

      // Cambiar la imagen principal en esta pestaña
      const thumbSrc = thumb.getAttribute("src");
      mainImages.forEach((img) => {
        img.classList.remove("active");
        if (img.getAttribute("src") === thumbSrc) {
          img.classList.add("active");
        }
      });
    });
  });
  //inicializar la galería al cargar
  if (tab.classList.contains("active")) {
    resetGallery(tab);
  }
});

// Carrusel de productos
const productCarousel = document.querySelector(".product-carousel");
const prevBtn = document.querySelector(".carousel-btn.prev");
const nextBtn = document.querySelector(".carousel-btn.next");

nextBtn.addEventListener("click", () => {
  productCarousel.scrollBy({ left: 300, behavior: "smooth" });
});

prevBtn.addEventListener("click", () => {
  productCarousel.scrollBy({ left: -300, behavior: "smooth" });
});

// Navegación por categorías desde el carrusel
const productCards = document.querySelectorAll(".product-card");
productCards.forEach((card) => {
  card.addEventListener("click", () => {
    const category = card.getAttribute("data-category");

    // Remover clase active de todos los botones y contenidos
    tabBtns.forEach((btn) => btn.classList.remove("active"));
    tabContents.forEach((content) => content.classList.remove("active"));

    // Activar la categoría correspondiente
    document
      .querySelector(`.tab-btn[data-category="${category}"]`)
      .classList.add("active");
    document.getElementById(category).classList.add("active");

    // Scroll a la sección de tabs
    document
      .querySelector(".categories-tabs")
      .scrollIntoView({ behavior: "smooth" });
  });
});

//sección ENCARGAR
// Mostrar/ocultar tabla de dimensiones
function toggleSizesTable() {
  const sizesTable = document.getElementById("sizesTable");
  sizesTable.classList.toggle("show");

  const btn = document.querySelector(".view-sizes-btn");
  if (sizesTable.classList.contains("show")) {
    btn.textContent = "Ocultar dimensiones";
  } else {
    btn.textContent = "Ver dimensiones disponibles";
  }
}

// FAQ Accordion
const faqQuestions = document.querySelectorAll(".faq-question");
faqQuestions.forEach((question) => {
  question.addEventListener("click", () => {
    question.classList.toggle("active");
    const answer = question.nextElementSibling;

    if (question.classList.contains("active")) {
      answer.style.maxHeight = answer.scrollHeight + "px";
    } else {
      answer.style.maxHeight = "0";
    }
  });
});

// Efecto de aparición al hacer scroll
const stepCards = document.querySelectorAll(".step-card");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }, index * 200);
      }
    });
  },
  { threshold: 0.1 }
);

stepCards.forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(20px)";
  card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  observer.observe(card);
});

//FOOTER
// Validación del formulario de newsletter
const newsletterForm = document.querySelector(".newsletter-form");
if (newsletterForm) {
  newsletterForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const emailInput = this.querySelector('input[type="email"]');
    const email = emailInput.value;

    if (validateEmail(email)) {
      // agregar código para enviar el email
      alert(
        "¡Gracias por suscribirte! Te mantendremos informado sobre nuestras novedades."
      );
      emailInput.value = "";
    } else {
      alert("Por favor ingresa un correo electrónico válido.");
    }
  });
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Efecto de aparición al hacer scroll
const footerCols = document.querySelectorAll(".footer-col");
const observer2 = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }, index * 200);
      }
    });
  },
  { threshold: 0.1 }
);

footerCols.forEach((col) => {
  col.style.opacity = "0";
  col.style.transform = "translateY(20px)";
  col.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  observer2.observe(col);
});