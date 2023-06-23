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

router.get('/dashboard', isAuthenticatedUser, (req, res) => {

    Products.find({})
        .then(products => {
            res.render('admin/dashboard', { products: products });
        });

});

export default router