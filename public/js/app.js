"use strict"

//busca en el documento html algun evento submit
  document.addEventListener('submit', function(e) {
    //verifica si el elemento que originó el evento submit (es decir, e.target) coincide con la clase .addToCartForm
    if (e.target && e.target.matches('.addToCartForm')) {
      e.preventDefault()
      const form = e.target;
      //obtiene el valor del atributo action del formulario. En este caso, asumimos que el atributo action contiene la URL a la cual se debe realizar la solicitud POST para agregar un producto al carrito.
      const url = form.getAttribute('action');
      // con el fetch controlo desde el front el post hacia la url 
      fetch(url,{method: 'POST'})
      .then(response => {
        if (response.ok){
          console.log('Producto agregado al carrito')
          //deshabilito el boton y le doy opacidad para dar esa sensacion y le quito el cursor pointer
          const boton = form.childNodes[1]
          boton.disabled = true
          boton.style.opacity = '0.3'
          boton.style.cursor = 'default'
        }else{
          console.log('La petición falló con un código de estado:', response.status)
        }
      })
      .catch(error =>{
        console.log('Ocurrió un error:', error)
      })
    }
    })

//manejo el click en la cruz para que se me cierre el signup de arriba del navbar
const closeSignUp = document.getElementById('closeSignUp')
const signUp = document.getElementById('signUp')

if (closeSignUp !== null){
  closeSignUp.addEventListener('click', ()=>{
   signUp.classList.add('hidden')
  })
}

/* manejo y funcionalidad del slider */
document.addEventListener("DOMContentLoaded", function() {
  const slider = document.querySelector(".slider");
  const slides = document.querySelectorAll(".slide");
  const slideGuide = document.querySelector(".slide-guide");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  let currentIndex = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.add("active");
      } else {
        slide.classList.remove("active");
      }
    });

    updateSlideGuide(index);
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }

  function updateSlideGuide(index) {
    const dots = slideGuide.querySelectorAll(".slide-guide-dot");
    dots.forEach((dot, i) => {
      if (i === index) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
  }

  prevBtn.addEventListener("click", prevSlide);
  nextBtn.addEventListener("click", nextSlide);

  // Mostrar la primera imagen y guía al cargar la página
  showSlide(currentIndex);
  slides.forEach((_, i) => {
    const dot = document.createElement("div");
    dot.classList.add("slide-guide-dot");
    dot.addEventListener("click", () => {
      showSlide(i);
    });
    slideGuide.appendChild(dot);
  });
});



/* funcion menu hamburguesa */
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');

  menuToggle.addEventListener('click', function() {
    menu.classList.toggle('active');
    
  });

});

/* funcion para abrir la seccion de shop */

document.addEventListener('DOMContentLoaded', function() {
  const dropdowns = document.querySelectorAll('.dropdown');

  dropdowns.forEach(function(dropdown) {
    const trigger = dropdown.querySelector('a');
    const menu = dropdown.querySelector('.dropdown-menu');

    trigger.addEventListener('click', function(e) {
      e.preventDefault();
      dropdowns.forEach(function(dropdown) {
        if (dropdown !== e.currentTarget.parentNode) {
          dropdown.classList.remove('active');
        }
      });
      dropdown.classList.toggle('active');
    });

    document.addEventListener('click', function(e) {
      if (!dropdown.contains(e.target)) {
        dropdowns.forEach(function(dropdown) {
          dropdown.classList.remove('active');
        });
      }
    });
  });
});
/* funcionalidad del menu logueado */

document.addEventListener('DOMContentLoaded', function() {
  const dropdowns = document.querySelectorAll('.dropdown-logueado');

  dropdowns.forEach(function(dropdown) {
    const trigger = dropdown.querySelector('a');
    const menu = dropdown.querySelector('.dropdown-menu-logueado');

    trigger.addEventListener('click', function(e) {
      e.preventDefault();
      if (dropdown.classList.contains('active')) {
        dropdown.classList.remove('active');
      } else {
        dropdowns.forEach(function(dropdown) {
          dropdown.classList.remove('active');
        });
        dropdown.classList.add('active');
      }
    });

    document.addEventListener('click', function(e) {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('active');
      }
    });
  });
});