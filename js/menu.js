// Menu Hamburguesa - Versión Mejorada
class MenuHamburguesa {
    constructor() {
        this.hamburger = document.getElementById('hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.init();
    }

    init() {
        if (!this.hamburger || !this.navMenu) {
            console.warn('Elementos del menú no encontrados');
            return;
        }

        this.hamburger.addEventListener('click', () => this.toggleMenu());
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleLinkClick(e, link));
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                this.closeMenu();
            }
        });

        this.updateActiveLink();
    }

    toggleMenu() {
        this.hamburger.classList.toggle('active');
        this.navMenu.classList.toggle('active');
        
        if (this.navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }

    closeMenu() {
        this.hamburger.classList.remove('active');
        this.navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    handleLinkClick(e, link) {
        e.preventDefault();
        const targetUrl = link.getAttribute('href');
        
        this.closeMenu();
        
        // Pequeño delay para que se cierre el menú antes de navegar
        setTimeout(() => {
            if (targetUrl.includes('#')) {
                // Es un anchor link
                if (targetUrl.startsWith('#')) {
                    // Anchor en la misma página
                    const targetSection = document.querySelector(targetUrl);
                    if (targetSection) {
                        targetSection.scrollIntoView({ behavior: 'smooth' });
                    }
                } else {
                    // Anchor en otra página
                    window.location.href = targetUrl;
                }
            } else {
                // Enlace normal
                window.location.href = targetUrl;
            }
        }, 300);
    }

    updateActiveLink() {
        const currentPage = window.location.pathname;
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            const linkUrl = link.getAttribute('href');
            
            if (currentPage.includes('productos/') && linkUrl.includes('#productos')) {
                link.classList.add('active');
            } else if (currentPage.endsWith('index.html') || currentPage === '/') {
                // Lógica para página principal
                if (linkUrl.startsWith('#')) {
                    link.classList.add('active');
                }
            }
        });
    }
}

// Inicializar
document.addEventListener('DOMContentLoaded', function() {
    new MenuHamburguesa();
    
    // Header sticky
    const header = document.querySelector('.main-header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
});