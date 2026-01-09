// Versión mejorada con Intersection Observer
document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  // Configuración del Observer
  const observerOptions = {
    root: null,
    rootMargin: "-20% 0px -70% 0px",
    threshold: 0,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");

        // Remover active de todos los enlaces
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }, observerOptions);

  // Observar cada sección
  sections.forEach((section) => {
    observer.observe(section);
  });

  // Navegación suave
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        // Cerrar menú móvil si está abierto
        if (hamburger.classList.contains("active")) {
          hamburger.classList.remove("active");
          navMenu.classList.remove("active");
        }

        // Scroll suave
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        // Actualizar URL
        history.pushState(null, null, targetId);
      }
    });
  });
});
// Header Sticky Effect
window.addEventListener("scroll", function () {
  const header = document.querySelector(".main-header");
  if (window.scrollY > 100) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Hamburger Menu Toggle
const hamburger = document.getElementById("hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", function () {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", function () {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");

    // Update active link
    document
      .querySelectorAll(".nav-link")
      .forEach((l) => l.classList.remove("active"));
    this.classList.add("active");
  });
});

// Carousel 
class Carousel {
  constructor() {
    this.track = document.querySelector(".carousel-track");
    this.slides = document.querySelectorAll(".carousel-slide");
    this.dots = document.querySelectorAll(".dot");
    this.prevBtn = document.querySelector(".carousel-control.prev");
    this.nextBtn = document.querySelector(".carousel-control.next");
    this.currentSlide = 0;
    this.slideCount = this.slides.length;
    this.autoSlideInterval = null;

    this.init();
  }

  init() {
    // Event listeners
    this.prevBtn.addEventListener("click", () => this.prevSlide());
    this.nextBtn.addEventListener("click", () => this.nextSlide());

    // Dot navigation
    this.dots.forEach((dot, index) => {
      dot.addEventListener("click", () => this.goToSlide(index));
    });

    // Auto slide
    this.startAutoSlide();

    // Pause auto slide on hover
    this.track.addEventListener("mouseenter", () => this.stopAutoSlide());
    this.track.addEventListener("mouseleave", () => this.startAutoSlide());

    // Touch/swipe support for mobile
    this.addTouchSupport();
  }

  goToSlide(index) {
    this.currentSlide = index;
    this.updateCarousel();
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slideCount;
    this.updateCarousel();
  }

  prevSlide() {
    this.currentSlide =
      (this.currentSlide - 1 + this.slideCount) % this.slideCount;
    this.updateCarousel();
  }

  updateCarousel() {
    // Update track position
    this.track.style.transform = `translateX(-${this.currentSlide * 100}%)`;

    // Update active slide
    this.slides.forEach((slide) => slide.classList.remove("active"));
    this.slides[this.currentSlide].classList.add("active");

    // Update dots
    this.dots.forEach((dot) => dot.classList.remove("active"));
    this.dots[this.currentSlide].classList.add("active");
  }

  startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, 5000); // Change slide every 5 seconds
  }

  stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
      this.autoSlideInterval = null;
    }
  }

  addTouchSupport() {
    let startX = 0;
    let endX = 0;

    this.track.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    });

    this.track.addEventListener("touchend", (e) => {
      endX = e.changedTouches[0].clientX;
      this.handleSwipe(startX, endX);
    });
  }

  handleSwipe(startX, endX) {
    const swipeThreshold = 50;
    const diff = startX - endX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        this.nextSlide();
      } else {
        this.prevSlide();
      }
    }
  }
}

// Product Cards Interaction
document.querySelectorAll(".producto-card").forEach((card) => {
  card.addEventListener("click", function () {
    const category = this.getAttribute("data-category");
    // redirige a la página de categoría 
    console.log("Categoría seleccionada:", category);
    // window.location.href = `/categorias/${category}`;
  });
});

// Smooth Scroll for CTA Button
document.querySelector(".cta-button").addEventListener("click", function (e) {
  e.preventDefault();
  const target = document.querySelector(this.getAttribute("href"));
  target.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
});

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  new Carousel();

  // Add scroll animation for product cards
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  document.querySelectorAll(".producto-card").forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(card);
  });
});

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

// FOOTER Efecto de aparición al hacer scroll
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

//animaciones de titulo de la pagina de inicio
const headers = document.querySelectorAll(".section-header");

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add(
          "animate__animated",
          "animate__fadeInDown"
        );
        observer.unobserve(entry.target); // se anima solo una vez
      }
    });
  },
  {
    threshold: 0.3 // cuando el 30% del elemento es visible
  }
);

headers.forEach(header => {
  observer.observe(header);
});
