"use strict"

//manejo de los botones de sumar y restar stock del carrito
const btnSuma = document.querySelectorAll('[id^="btnSuma"]')
const btnResta = document.querySelectorAll('[id^="btnResta"]')
const stockCart = document.querySelectorAll('[id^="stockCart"]')
const priceCart = document.querySelectorAll('[id^="priceCart"]')
const totalCompra = document.getElementById('totalCompra')
let acumCarro = 0

//funcion que actualiza el total de la compra segun los productos y el stock del carrito
const actualizarTotal = () =>{
  acumCarro = 0
  priceCart.forEach(item => {
    acumCarro += Number(item.innerText.split('$').pop())
  })
  totalCompra.innerText= `Total compra: $ ${acumCarro}`
}

//cuando termina de cargarse el DOM de la ruta products/cart entonces me ejecuta el IF y por consiguiente la funcion actualizarTotal
document.addEventListener('DOMContentLoaded', ()=>{
  // Verifica la ruta actual y ejecuta la función del front-end si coincide, tambien chequea que el carrito tenga algun item
  if (window.location.pathname === '/products/cart' && (priceCart.length!==0)){
    actualizarTotal()
  }
})

//manejo del boton de sumar stock en cada producto del carrito
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

//manejo del boton de restar stock en cada producto del carrito
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