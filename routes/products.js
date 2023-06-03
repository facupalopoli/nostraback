import express from 'express'
const router=express.Router()

import Products from '../models/Products.js'

//---------------------GET

//router de /productos
router.get('/',(req,res)=>{
    res.send('hola desde el router de productos')
}) 

//trae todos los documentos de la base
router.get('/catalog', async (req,res)=>{
    try{
        const productos = await Products.find()
        res.status(200).json(productos)
    }catch(error){
        console.log(error)
        res.status(404).json({mensaje:'error interno del sistema'})
    }
})

//trae los documentos guardados en mi carro
router.get('/cart', async (req,res)=>{
    try{
        //res.status(200).json(cart)
        res.render('pages/cart', {cart:cart})
    }catch(error){
        console.log(error)
        res.status(404).json({mensaje:'error interno del sistema'})
    }
})

//busca por ID
router.get('/:id', async (req,res)=>{
    try{
        const producto = await Products.findById(req.params.id)
        res.status(200).json(producto)
    }catch(error){
        console.log(error)
        res.status(404).json({mensaje:'error interno del sistema'})
    }
})

//pagina de compra realizada
router.get('/cart/comprar', async (req,res)=>{
    try{
        cart = []
        res.render('partials/success')
    }catch(error){
        console.log(error)
        res.status(404).json({mensaje:'error interno del sistema'})
    }
})

//---------------------POST

//agrega un documento a la base
router.post('/agregar-producto', async (req,res)=>{
    try{
        const productos = new Products(req.body)
        await productos.save()
        res.status(200).json({mensaje:'producto agregado'})    
    }catch(error){
        console.log(error)
        res.status(404).json({mensaje:'error interno del sistema'})
    }
})

//agrega producto al carro

let cart = []

router.post('/agregar-carro/:id', async (req,res)=>{
    try{
        let idProduct = req.params.id
        const producto = await Products.findById(idProduct)
        //se chequea primero si el producto existe en la base
        if (!producto){
            return res.status(404).json({mensaje: 'Producto no encontrado'});
        }
        //se chequea si el producto existe en el carro
        const exists = cart.some(item => item.id === producto.id)
        if(exists){
            console.log('El producto ya está en el carrito')
        }else{
            cart.push(producto)
        }
        res.sendStatus(200)
    }catch(error){
        console.log(error)
        res.status(404).json({mensaje:'error interno del sistema'})
    }
    console.log(cart)
})

//borra un producto del carro
router.post('/eliminar-carro/:id', async (req,res)=>{
    try{
        let idProduct = req.params.id
        cart = cart.filter(producto=>producto.id !== idProduct)
        /* res.sendStatus(200) */
        res.render('pages/cart', {cart:cart})
    }catch(error){
        console.log(error)
        res.status(404).json({mensaje:'error interno del sistema'})
    }
})

//---------------------PUT

//---------------------DELETE

export default router
