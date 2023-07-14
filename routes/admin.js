import express from 'express'
const router=express.Router()

import Products from '../models/Products.js'

//funcion que hace de middleware para comprobar si el usuario de la sesion es admin
function isAuthenticatedUser(req, res, next) {
    if(req.user && req.user.esAdmin){
        return next()
    }else{
        req.flash('error_msg', 'Usted no tiene permiso para acceder')
        res.redirect('/')    
    }
}

//router de /admin

//----------- RUTAS GET

router.get('/dashboard', isAuthenticatedUser, (req, res) => {
    try{
        res.render('admin/dashboard')
    }catch(error){
        console.log(error)
        res.status(404).json({mensaje:'error interno del sistema'})
    }
});

router.get('/addproduct', isAuthenticatedUser, async (req,res)=>{
    try{
        res.render('admin/addproduct')
    }catch(error){
        console.log(error)
        res.status(404).json({mensaje:'error interno del sistema'})
    }
})

router.get('/editdelete', isAuthenticatedUser, async (req,res)=>{
    try{
        const productos = await Products.find()
        res.render('admin/editdelete', {productos:productos})
    }catch(error){
        console.log(error)
        res.status(404).json({mensaje:'error interno del sistema'})
    }
})

router.get('/edit/:id', isAuthenticatedUser, async (req,res)=>{
    try{
        const producto = await Products.findById(req.params.id)
        res.render('admin/editproduct', {producto:producto})
    }catch(error){
        console.log(error)
        res.status(404).json({mensaje:'error interno del sistema'})
    }
})

//----------- RUTAS POST

//agrega un producto a la base
router.post('/addproduct', isAuthenticatedUser, async (req,res)=>{
    try{
        const products = new Products(req.body)
        await products.save()
        req.flash('success_msg', 'Producto agregado')
        res.redirect('/admin/addproduct')
    }catch(error){
        console.log(error)
        res.status(404).json({mensaje:'error interno del sistema'})
    }
})

//edita un documento de la base
router.post('/editproduct/:id', isAuthenticatedUser, async (req,res)=>{
    try{
        const product = await Products.findByIdAndUpdate(req.params.id, req.body)
        if(product===null){
            throw new Error('Producto no encontrado')
        }
        req.flash('success_msg', 'Producto modificado')
        res.redirect(`/admin/edit/${req.params.id}`)
    }catch(error){
        console.log(error)
        res.status(404).json({mensaje:'error interno del sistema'})
    }
})

//borra un documento de la base utilizando el parametro id
router.post('/delete/:id', isAuthenticatedUser, async (req,res)=>{
    try{
        const product = await Products.findByIdAndDelete(req.params.id)
        if(product===null){
            throw new Error('Producto no encontrado')
        }
        req.flash('success_msg', 'Producto eliminado')
        res.redirect('/admin/editdelete')
    }catch(error){
        console.log(error)
        res.status(404).json({mensaje:'error interno del sistema'})
    }
})

export default router