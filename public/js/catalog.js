"use strict"

const productos = window.productos
console.log(productos)
const filtro = productos.filter((producto) => {
  return producto.categoria.toLowerCase() === 'mujer'.toLowerCase();
});

console.log(filtro);

// Función para actualizar los productos según los checkboxes seleccionados
function actualizarProductos() {
  // Obtener los valores seleccionados de las categorías
  const categoriasSeleccionadas = obtenerValoresSeleccionados('categoria');
  
  // Obtener los valores seleccionados de las marcas
  const marcasSeleccionadas = obtenerValoresSeleccionados('marca');
  
  // Obtener los valores seleccionados de los precios
  const preciosSeleccionados = obtenerValoresSeleccionados('precio');
  
  // Obtener los valores seleccionados de los talles
  const tallesSeleccionados = obtenerValoresSeleccionados('talle');
  
  // Filtrar los productos según los checkboxes seleccionados
  console.log(categoriasSeleccionadas)
  const productosFiltrados = productos.filter(producto => {
    const cumpleCategorias = categoriasSeleccionadas.length === 0 || categoriasSeleccionadas.includes(producto.categoria.toLowerCase());
    const cumpleMarcas = marcasSeleccionadas.length === 0 || marcasSeleccionadas.includes(producto.marca.toLowerCase());
    const cumplePrecios = preciosSeleccionados.length === 0 || cumpleRangoPrecio(producto.precio, preciosSeleccionados);
    const cumpleTalles = tallesSeleccionados.length === 0 || tallesSeleccionados.includes(producto.talle.toLowerCase());

    return cumpleCategorias && cumpleMarcas && cumplePrecios && cumpleTalles;
  });
  console.log(productosFiltrados)
  
  // Actualizar la visualización de los productos en la página
  mostrarProductos(productosFiltrados);
}

// Función para obtener los valores seleccionados de una categoría
function obtenerValoresSeleccionados(categoria) {
  const checkboxes = document.querySelectorAll(`input[id^="${categoria}"]:checked`);
  const valoresSeleccionados = Array.from(checkboxes).map(checkbox => checkbox.id.replace(`${categoria}-`, ''));
  return valoresSeleccionados;
}

function cumpleRangoPrecio(precio, preciosSeleccionados) {
 
  // Define los rangos y sus límites superiores e inferiores
  const rangos = {
    '0-500': { min: 0, max: 500 },
    '500-1000': { min: 500, max: 1000 },
    '1000-5000': { min: 1000, max: 5000 },
    '5000-10000': { min: 5000, max: 10000 },
    '10000-mas': { min: 10000, max: Infinity }, // Infinity representa un valor infinito
  };

  // Verifica si el precio cumple con al menos uno de los rangos seleccionados
  return preciosSeleccionados.some((rango) => {
    const limites = rangos[rango];
    return precio >= limites.min && precio <= limites.max;
  });
}

// Función para mostrar los productos filtrados en la página
function mostrarProductos(productos) {
  const divProducts = document.querySelector('.divProducts');
  divProducts.innerHTML = '';
  
  productos.forEach(producto => {
    divProducts.innerHTML += `
      <div class="cardProduct">
        <a href="/products/${producto._id}"><img src="${producto.url_imagen[0]}" alt="imagen del producto"></a>
        <div class="cardFooter">
          <div>
            <h3>${producto.titulo}</h3>
            <h3 class="price">$ ${producto.precio}</h3>
          </div>
          <form class="addToCartForm" action="/products/agregar-carro/${producto._id}" method="POST">
            <button type="submit" class="bi bi-cart-plus"></button>
          </form>
        </div>
      </div>
    `;
  });
}

// Event listener para los checkboxes
document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
  checkbox.addEventListener('change', actualizarProductos);
});