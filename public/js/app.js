"use strict"

//manejo del boton de agregar al carrito
//hago el foreach para cada boton de agregar al carrito usando la clase .addtocartform

/* document.querySelectorAll('.addToCartForm').forEach(form =>{
    form.addEventListener('submit', function(e){
      console.log('hiciste click')
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
  }) */

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