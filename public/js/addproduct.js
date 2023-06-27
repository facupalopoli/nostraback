"use strict"

let urlCounter = 1

function agregarUrlImagen(){
    const urlInput = document.getElementById('urlInput')
    const url = urlInput.value
    const imageUrlList = document.getElementById('imageUrlList')
    if (url){
        const listItemHtml = `<li>
                                  <a href="${url}">Imagen ${urlCounter}</a>
                                  <input type="hidden" name="url_imagen[]" value="${url}">
                                  <i class="bi bi-trash3 eliminarIcono" style="cursor:pointer"></i>
                              </li>`
        imageUrlList.innerHTML += listItemHtml
        urlInput.value = ''
        urlCounter++
    }
}

document.getElementById('agregarUrlBtn').addEventListener('click', agregarUrlImagen)

function eliminarUrlImagen(event){
    const listItem = event.target.parentNode
    listItem.remove()
}

imageUrlList.addEventListener('click', function(event){
    if (event.target.classList.contains('eliminarIcono')){
        eliminarUrlImagen(event)
    }
})