"use strict"

//manejo del boton de agregar al carrito
//hago el foreach para cada boton de agregar al carrito usando la clase .addtocartform
document.querySelectorAll('.addToCartForm').forEach(form =>{
    form.addEventListener('submit', function(e){
      e.preventDefault()
      //le cambio el color a rojo para test
      const boton = form.childNodes[1]
      boton.style.color='red'
      //guardo la ruta en una variable para despues hacer el fetch
      const url = this.action
      fetch(url,{method: 'POST'})
      .then(response => {
        if (response.ok){
          console.log('La petición fue exitosa')
          // Realizar cualquier acción adicional según corresponda
        }else{
          console.error('La petición falló con un código de estado:', response.status)
          // Realizar acciones para manejar el código de estado de error
        }
      })
      .catch(error =>{
        console.log('Ocurrió un error:', error)
      })
    })
  })

//manejo el click en la cruz para que se me cierre el signup de arriba del navbar
const closeSingUp = document.getElementById('closeSingUp')
const signUp = document.getElementById('signUp')

closeSingUp.addEventListener('click', ()=>{
  signUp.classList.add('hidden')
})