import express from 'express'
const router=express.Router()

import Users from '../models/Users.js'
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

//----------- RUTAS GET

router.get('/dashboard', isAuthenticatedUser, (req, res) => {

    Products.find({})
        .then(products => {
            res.render('admin/dashboard', { products: products });
        });

});

router.get('/addproduct', async (req,res)=>{
    try{
        res.render('admin/addproduct')
    }catch(error){
        console.log(error)
        res.status(404).json({mensaje:'error interno del sistema'})
    }
})

router.get('/editdelete', async (req,res)=>{
    try{
        const productos = await Products.find()
        res.render('admin/editdelete', {productos:productos})
    }catch(error){
        console.log(error)
        res.status(404).json({mensaje:'error interno del sistema'})
    }
})

router.get('/edit/:id', async (req,res)=>{
    try{
        const producto = await Products.findById(req.params.id)
        res.render('admin/editproduct', {producto:producto})
    }catch(error){
        console.log(error)
        res.status(404).json({mensaje:'error interno del sistema'})
    }
})

//----------- RUTAS POST

router.post('/addproduct', async (req,res)=>{
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

router.post('/editproduct/:id', async (req,res)=>{
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

export default router