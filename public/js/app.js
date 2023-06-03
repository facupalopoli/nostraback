"use strict"


//manejo del boton de agregar al carrito
//hago el foreach para cada boton de agregar al carrito usando la clase .addtocartform
document.querySelectorAll('.addToCartForm').forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault()
      //le cambio el color a rojo para test
      const boton = form.childNodes[1]
      boton.style.color='red'
      //guardo la ruta en una variable para despues hacer el fetch
      const url = this.action
      fetch(url,{method: 'POST'})
      .then(response => {
        if (response.ok) {
          console.log('La petición fue exitosa')
          // Realizar cualquier acción adicional según corresponda
        } else {
          console.error('La petición falló con un código de estado:', response.status)
          // Realizar acciones para manejar el código de estado de error
        }
      })
      .catch(error => {
        console.log('Ocurrió un error:', error)
      })
    })
  })

//manejo de los botones de sumar y restar stock del carrito
const btnSuma = document.querySelectorAll('[id^="btnSuma"]')
const btnResta = document.querySelectorAll('[id^="btnResta"]')
const stockCart = document.querySelectorAll('[id^="stockCart"]')
const priceCart = document.querySelectorAll('[id^="priceCart"]')
const totalCompra = document.getElementById('totalCompra')
let acumCarro = 0

const actualizarTotal = () =>{
  acumCarro = 0
  priceCart.forEach(item => {
    acumCarro += Number(item.innerText.split('$').pop())
  })
  totalCompra.innerText= `Total compra: $ ${acumCarro}`
}
actualizarTotal()

btnSuma.forEach((btn, index) => {
  const precioInicial = Number(priceCart[index].innerText.split('$').pop())
  btn.addEventListener('click',()=>{
    let precioAcum = Number(priceCart[index].innerText.split('$').pop())
    let cantidad = Number(stockCart[index].innerText)
    cantidad ++
    precioAcum += precioInicial
    stockCart[index].innerText = cantidad
    priceCart[index].innerText = `$ ${precioAcum}`
    cantidad<=1 ? btnResta[index].disabled=true : btnResta[index].disabled=false
    actualizarTotal()
  })
})

btnResta.forEach((btn, index) => {
  const precioInicial = Number(priceCart[index].innerText.split('$').pop())
  btn.addEventListener('click',()=>{
    let precioAcum = Number(priceCart[index].innerText.split('$').pop())
    let cantidad = Number(stockCart[index].innerText)
    cantidad --
    precioAcum -= precioInicial
    stockCart[index].innerText = cantidad
    priceCart[index].innerText = `$ ${precioAcum}`
    cantidad<=1 ? btn.disabled=true : btn.disabled=false
    actualizarTotal()
  })
})





