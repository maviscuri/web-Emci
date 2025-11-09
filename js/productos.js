// Funcionalidades para páginas de producto
document.addEventListener('DOMContentLoaded', function() {
    inicializarGaleria();
    inicializarSelectorTamano();
});

// Galería de imágenes
function inicializarGaleria() {
    const miniaturas = document.querySelectorAll('.miniatura');
    const imagenPrincipal = document.getElementById('imagenPrincipal');
    
    miniaturas.forEach(miniatura => {
        miniatura.addEventListener('click', function() {
            const imagenSrc = this.getAttribute('data-imagen');
            
            // Actualizar imagen principal
            imagenPrincipal.src = imagenSrc;
            
            // Actualizar miniaturas activas
            miniaturas.forEach(m => m.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Sistema completo de gestión de productos
class SistemaProductos {
    constructor() {
        this.productoActual = '';
        this.tamanoSeleccionado = '';
        this.precioSeleccionado = '';
    }
    
    inicializar() {
        this.inicializarSelectoresTamano();
        this.obtenerProductoActual();
    }
    
    obtenerProductoActual() {
        this.productoActual = document.querySelector('.producto-titulo')?.textContent || 'Producto Personalizado';
    }
    
    inicializarSelectoresTamano() {
        document.querySelectorAll('.tamano-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.seleccionarTamano(btn);
            });
        });
        
        // Seleccionar automáticamente el primer tamaño
        const primerBtn = document.querySelector('.tamano-btn.active') || 
                         document.querySelector('.tamano-btn');
        if (primerBtn) {
            this.seleccionarTamano(primerBtn);
        }
    }
    
    seleccionarTamano(boton) {
        // Remover activo de todos los botones
        document.querySelectorAll('.tamano-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Activar botón clickeado
        boton.classList.add('active');
        
        // Guardar selección
        this.tamanoSeleccionado = boton.getAttribute('data-tamano');
        this.precioSeleccionado = boton.getAttribute('data-precio');
        
        // Actualizar display de precio
        const precioDisplay = document.getElementById('precioActual');
        if (precioDisplay) {
            precioDisplay.textContent = this.precioSeleccionado;
        }
        
        console.log('Producto:', this.productoActual);
        console.log('Tamaño seleccionado:', this.tamanoSeleccionado);
        console.log('Precio seleccionado:', this.precioSeleccionado);
    }
    
    encargarPorWhatsApp() {
        if (!this.tamanoSeleccionado) {
            alert('Por favor selecciona un tamaño antes de encargar.');
            return;
        }
        
        const mensaje = this.generarMensajeWhatsApp();
        const telefono = '51961671940';
        const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
        
        window.open(url, '_blank');
    }
    
    generarMensajeWhatsApp() {
        return `¡Hola EMCI Arte!\n\n` +
               `Estoy interesad@ en encargar el siguiente producto:\n\n` +
               `* ${this.productoActual}\n` +
               `*TAMAÑO:* ${this.tamanoSeleccionado}\n` +
               `*PRECIO REFERENCIAL:* ${this.precioSeleccionado}\n\n` +
               `Me gustaría saber:`;
    }
}

// Inicializar el sistema
document.addEventListener('DOMContentLoaded', function() {
    window.sistemaProductos = new SistemaProductos();
    window.sistemaProductos.inicializar();
});

// Función global para usar en los botones
function encargarPorWhatsApp() {
    if (window.sistemaProductos) {
        window.sistemaProductos.encargarPorWhatsApp();
    }
}