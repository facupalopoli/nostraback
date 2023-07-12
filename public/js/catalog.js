"use strict";

const productos = window.productos;

// Función para actualizar los productos según los checkboxes seleccionados
function actualizarProductos() {
  // Obtener los valores seleccionados de las categorías
  const categoriasSeleccionadas = obtenerValoresSeleccionados("categoria");

  // Obtener los valores seleccionados de las marcas
  const marcasSeleccionadas = obtenerValoresSeleccionados("marca");

  // Obtener los valores seleccionados de los precios
  const preciosSeleccionados = obtenerValoresSeleccionados("precio");

  // Obtener los valores seleccionados de los talles
  const tallesSeleccionados = obtenerValoresSeleccionados("talle");

  // Filtrar los productos según los checkboxes seleccionados
  const productosFiltrados = productos.filter((producto) => {
    const cumpleCategorias =
      categoriasSeleccionadas.length === 0 ||
      categoriasSeleccionadas.includes(producto.categoria.toLowerCase());
    const cumpleMarcas =
      marcasSeleccionadas.length === 0 ||
      marcasSeleccionadas.includes(producto.marca.toLowerCase());
    const cumplePrecios =
      preciosSeleccionados.length === 0 ||
      cumpleRangoPrecio(producto.precio, preciosSeleccionados);
    const cumpleTalles =
      tallesSeleccionados.length === 0 ||
      tallesSeleccionados.includes(producto.talle.toLowerCase());

    return (
      cumpleCategorias && cumpleMarcas && cumplePrecios && cumpleTalles
    );
  });

  // Actualizar la visualización de los productos en la página
  mostrarProductos(productosFiltrados);

  // Actualizar los botones de paginación
  crearBotonesPaginacion(productosFiltrados);
}

// Función para obtener los valores seleccionados de una categoría
function obtenerValoresSeleccionados(categoria) {
  const checkboxes = document.querySelectorAll(`input[id^="${categoria}"]:checked`);
  const valoresSeleccionados = Array.from(checkboxes).map((checkbox) =>
    checkbox.id.replace(`${categoria}-`, "")
  );
  return valoresSeleccionados;
}

function cumpleRangoPrecio(precio, preciosSeleccionados) {
  // Define los rangos y sus límites superiores e inferiores
  const rangos = {
    "0-20000": { min: 0, max: 20000 },
    "20000-30000": { min: 20000, max: 30000 },
    "30000-mas": { min: 30000, max: Infinity }, // Infinity representa un valor infinito
  };

  // Verifica si el precio cumple con al menos uno de los rangos seleccionados
  return preciosSeleccionados.some((rango) => {
    const limites = rangos[rango];
    return precio >= limites.min && precio <= limites.max;
  });
}

// Función para mostrar los productos filtrados en la página
 const productosPorPagina = 9;
let paginaActual = 1;

function mostrarProductos(productos) {
  const productosContainer = document.getElementById("productosContainer");
  productosContainer.innerHTML = "";

  const inicio = (paginaActual - 1) * productosPorPagina;
  const fin = inicio + productosPorPagina;
  const productosPagina = productos.slice(inicio, fin);

  productosPagina.forEach((productos) => {
    productosContainer.innerHTML += `
    <div class="caja_producto">
      <div class="caja_img">
      <a href="/products/${productos._id}">
        <img class="img_producto"src=${productos.url_imagen[0]} alt=""></a>
      </div>
      <div  class="detalle_producto">
        <span>${productos.titulo}</span>
      </div>
      <div class="texto_producto">
      <div>
        <span>$${productos.precio}</span>
        <form class="addToCartForm" action="/products/agregar-carro/${productos._id}" method="POST">
         <button type="submit" class="bi bi-cart-plus"></button>
        </form>
       
      </div>
    </div>
      
    </div>`;
  });
} 

// Event listener para los checkboxes
document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
  checkbox.addEventListener("change", actualizarProductos);
});

/* ------------------------------------------------------------------ */
/* GUILLE JS ----------------------- */
/* ------------------------------------------------------------------ */

// Obtén todos los elementos .opcion
const menuItems = document.querySelectorAll('.opcion');
/* -------------------------------------- */
// Obtén todos los elementos .seleccion
const seleccionItems = document.querySelectorAll('.seleccion');


/* ---------------------------------- */
// Agrega un controlador de eventos a cada elemento .seleccion
seleccionItems.forEach(function (seleccionItem) {
  seleccionItem.addEventListener('click', function (event) {
    const input = this.querySelector('input[type="checkbox"]'); // Obtén el input dentro del elemento .seleccion
    event.stopImmediatePropagation();

  });
});

// Agrega un controlador de eventos a cada elemento .opcion
menuItems.forEach(function (menuItem) {
  
  menuItem.addEventListener('click', function (event) {
    const submenu = this.children[1]; // Obtén el submenu del elemento .opcion
    
    
    // Verifica si el evento proviene del input dentro de .seleccion
    if (event.target.closest('.seleccion input')) {
      event.stopPropagation(); // Evita que el evento se propague al elemento padre
      return;
    }

    // Alternar la clase "activo" en el submenu y el elemento .opcion
    submenu.classList.toggle('activo');
    this.classList.toggle('activo');
    event.stopImmediatePropagation();

    
  });
});



function crearBotonesPaginacion(productosFiltrados) {
  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);

  const paginacion = document.getElementById("paginacion");
  paginacion.innerHTML = "";

  const botonAnterior = document.createElement("button");
  botonAnterior.innerHTML = "Previo";
  botonAnterior.disabled = paginaActual === 1;
  botonAnterior.addEventListener("click", () => {
    if (paginaActual > 1) {
      paginaActual--;
      mostrarProductos(productosFiltrados);
      crearBotonesPaginacion(productosFiltrados);
    }
  });
  paginacion.appendChild(botonAnterior);
  for (let i = 1; i <= totalPaginas; i++) {
    const boton = document.createElement("button");
    boton.textContent = i;
    boton.classList.add("pagina-btn");
    if (i === paginaActual) {
      boton.classList.add("active");
    }
    boton.addEventListener("click", () => {
      paginaActual = i;
      mostrarProductos(productosFiltrados);
      crearBotonesPaginacion(productosFiltrados);
    });
    paginacion.appendChild(boton);
  }

  const botonSiguiente = document.createElement("button");
  botonSiguiente.innerHTML = "Siguiente";
  botonSiguiente.disabled = paginaActual === totalPaginas;
  botonSiguiente.addEventListener("click", () => {
    if (paginaActual < totalPaginas) {
      paginaActual++;
      mostrarProductos(productosFiltrados);
      crearBotonesPaginacion(productosFiltrados);
    }
  });
  paginacion.appendChild(botonSiguiente);
}

// Llamada inicial para mostrar todos los productos al cargar la página
mostrarProductos(productos);

// Llamada inicial para crear los botones de paginación con los productos completos
crearBotonesPaginacion(productos);
