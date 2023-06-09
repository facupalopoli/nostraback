"use strict"

//manejo del boton de agregar al carrito
//hago el foreach para cada boton de agregar al carrito usando la clase .addtocartform
document.querySelectorAll('.addToCartForm').forEach(form =>{
    form.addEventListener('submit', function(e){
      e.preventDefault()
      //guardo la ruta en una variable para despues hacer el fetch
      const url = this.action
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
    })
  })

//manejo el click en la cruz para que se me cierre el signup de arriba del navbar
const closeSingUp = document.getElementById('closeSingUp')
const signUp = document.getElementById('signUp')

closeSingUp.addEventListener('click', ()=>{
  signUp.classList.add('hidden')
})