import express from 'express'
const router=express.Router()

import Products from '../models/Products.js'

//router de /products

//---------------------GET

//trae todos los documentos de la base hacia el catalogo
router.get('/catalog', async (req,res)=>{
    try{
        const productos = await Products.find()
        res.render('pages/catalog', {productos:productos})
    }catch(error){
        console.log(error)
        res.status(404).json({mensaje:'error interno del sistema'})
    }
})

//trae los documentos de la base categoria hombres hacia el catalogo
router.get('/catalog/hombres', async (req,res)=>{
    try{
        const productos = await Products.find({ categoria: { $regex: 'hombre', $options: 'i' } })
        if (productos.length !==0){
            res.render('pages/hombres', {productos:productos})    
        }else{
            //me llevo 9 documentos de la base de datos para mostrar productos destacados por si no encontro nada 
            const productosDestacados = await Products.aggregate([{ $sample: { size: 9 } }])
            res.render('pages/catalog', {productos:productos, productosDestacados:productosDestacados})
        }
    }catch(error){
        console.log(error)
        res.status(404).json({mensaje:'error interno del sistema'})
    }
})

//trae los documentos de la base categoria mujeres hacia el catalogo
router.get('/catalog/mujeres', async (req,res)=>{
    try{
        const productos = await Products.find({ categoria: { $regex: 'mujer', $options: 'i' } })
        if (productos.length !==0){
            res.render('pages/mujeres', {productos:productos})    
        }else{
            //me llevo 9 documentos de la base de datos para mostrar productos destacados por si no encontro nada 
            const productosDestacados = await Products.aggregate([{ $sample: { size: 9 } }])
            res.render('pages/catalog', {productos:productos, productosDestacados:productosDestacados})
        }
    }catch(error){
        console.log(error)
        res.status(404).json({mensaje:'error interno del sistema'})
    }
})

//trae los documentos de la base categoria niños hacia el catalogo
router.get('/catalog/ninos', async (req,res)=>{
    try{
        const productos = await Products.find({ categoria: { $regex: 'kids', $options: 'i' } })
        if (productos.length !==0){
            res.render('pages/ninos', {productos:productos})    
        }else{
            //me llevo 9 documentos de la base de datos para mostrar productos destacados por si no encontro nada 
            const productosDestacados = await Products.aggregate([{ $sample: { size: 9 } }])
            res.render('pages/catalog', {productos:productos, productosDestacados:productosDestacados})
        }
    }catch(error){
        console.log(error)
        res.status(404).json({mensaje:'error interno del sistema'})
    }
})

//trae todos los documentos de la base que tengan rating mayor a 4
router.get('/catalog/wanted', async (req,res)=>{
    try{
        const productos = await Products.find({ rating: { $gte: 4 } })
        if (productos.length !==0){
            res.render('pages/catalog', {productos:productos})    
        }else{
            //me llevo 9 documentos de la base de datos para mostrar productos destacados por si no encontro nada 
            const productosDestacados = await Products.aggregate([{ $sample: { size: 9 } }])
            res.render('pages/catalog', {productos:productos, productosDestacados:productosDestacados})
        }
    }catch(error){
        console.log(error)
        res.status(404).json({mensaje:'error interno del sistema'})
    }
})

//me muestra los productos que coincidan con la busqueda por propiedad 'titulo'
router.get('/search', async (req,res)=>{
    try{
        //guardo el valor del input search en la variable y busco en la base de datos sin discriminar mayusculas o minusculas
        let productBusqueda = req.query.buscar
        const productos = await Products.find({ titulo: { $regex: productBusqueda, $options: 'i' } })
        if (productos.length !==0){
            res.render('pages/catalog', {productos:productos, productBusqueda:productBusqueda})    
        }else{
            //me llevo 9 documentos de la base de datos para mostrar productos destacados por si no encontro nada 
            const productosDestacados = await Products.aggregate([{ $sample: { size: 9 } }])
            res.render('pages/catalog', {productos:productos, productosDestacados:productosDestacados})
        }
    }catch(error){
        console.log(error)
        res.status(404).json({mensaje:'error interno del sistema'})
    }
})

//trae los documentos guardados en mi carro
router.get('/cart', async (req,res)=>{
    try{
        //me llevo 9 documentos de la base de datos para mostrar productos destacados por si no encontro nada 
        const productosDestacados = await Products.aggregate([{ $sample: { size: 9 } }])
        res.render('pages/cart', {cart:req.session.cart, productosDestacados:productosDestacados})
    }catch(error){
        console.log(error)
        res.status(404).json({mensaje:'error interno del sistema'})
    }
})

//trae el producto por ID
router.get('/:id', async (req,res)=>{
    try{
        const producto = await Products.findById(req.params.id)
        //me busca tambien productos relacionados (solo 8 productos de la base) utilizando la propiedad categoria y me excluye el id del producto en cuestion
        const productosRelacionados = await Products.find({categoria: producto.categoria, _id: {$ne: producto._id}}).limit(8)
        res.render('pages/product', {producto:producto, productosRelacionados:productosRelacionados})
    }catch(error){
        console.log(error)
        res.status(404).json({mensaje:'error interno del sistema'})
    }
})

//pagina de compra realizada
router.get('/cart/comprar', async (req,res)=>{
    try{
        if (req.isAuthenticated()){
            req.session.cart = []
            res.render('partials/success')
        }else{
            req.flash('error_msg', 'Primero debe inicar sesion para comprar.')
            res.redirect('/users/login')       
        }             
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
router.post('/agregar-carro/:id', async (req,res)=>{
    try{
        let idProduct = req.params.id
        const producto = await Products.findById(idProduct)
        //se chequea primero si el producto existe en la base
        if (!producto){
            return res.status(404).json({mensaje: 'Producto no encontrado'});
        }
        //se chequea si el producto existe en el carro
        const exists = req.session.cart.some(item => item.id === producto.id)
        if(exists){
            console.log('El producto ya está en el carrito')
        }else{
            req.session.cart.push(producto)
        }
        //le manda el estado al cliente y luego lo tomo desde el front
        res.sendStatus(200)
    }catch(error){
        console.log(error)
        res.status(404).json({mensaje:'error interno del sistema'})
    }
})

//borra un producto del carro
router.post('/eliminar-carro/:id', (req,res)=>{
    try{
        let idProduct = req.params.id
        console.log(req.session.cart)
        req.session.cart = req.session.cart.filter(producto=>producto._id !== idProduct)
        res.redirect('/products/cart')
    }catch(error){
        console.log(error)
        res.status(404).json({mensaje:'error interno del sistema'})
    }
})

export default router
